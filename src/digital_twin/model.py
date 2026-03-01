from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List


def _tokenize(text: str) -> set[str]:
    return {t for t in re.findall(r"[a-zA-Z0-9']+", text.lower()) if t}


@dataclass(frozen=True)
class PersonaProfile:
    name: str
    tone: str
    signature: str
    values: List[str]
    disclaimers: List[str]

    @staticmethod
    def from_json(path: str | Path) -> "PersonaProfile":
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
        return PersonaProfile(
            name=payload["name"],
            tone=payload.get("tone", "clear, concise, empathetic"),
            signature=payload.get("signature", "Best,"),
            values=list(payload.get("values", [])),
            disclaimers=list(payload.get("disclaimers", [])),
        )


class MemoryStore:
    def __init__(self, memories: Iterable[str]):
        self._memories = [m.strip() for m in memories if m and m.strip()]

    @staticmethod
    def from_jsonl(path: str | Path) -> "MemoryStore":
        memories: list[str] = []
        p = Path(path)
        with p.open("r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue
                row = json.loads(line)
                memories.append(row["text"])
        return MemoryStore(memories)

    def search(self, query: str, top_k: int = 3) -> list[str]:
        query_tokens = _tokenize(query)
        if not query_tokens:
            return self._memories[:top_k]

        scored: list[tuple[int, str]] = []
        for memory in self._memories:
            score = len(query_tokens & _tokenize(memory))
            scored.append((score, memory))

        scored.sort(key=lambda item: item[0], reverse=True)
        selected = [m for s, m in scored if s > 0][:top_k]
        if len(selected) < top_k:
            for _, memory in scored:
                if memory not in selected:
                    selected.append(memory)
                if len(selected) >= top_k:
                    break
        return selected


class DigitalTwin:
    HIGH_RISK_TERMS = {"medical", "medication", "doctor", "legal", "lawsuit", "investment", "financial", "diagnose", "prescribe", "treatment"}

    def __init__(self, profile: PersonaProfile, memory_store: MemoryStore):
        self.profile = profile
        self.memory_store = memory_store

    def reply(self, user_message: str) -> str:
        lowered = user_message.lower()
        if any(term in lowered for term in self.HIGH_RISK_TERMS):
            return self._high_risk_reply(user_message)

        memories = self.memory_store.search(user_message, top_k=2)
        guidance = " ".join(f"- {memory}" for memory in memories)
        values = ", ".join(self.profile.values[:3]) if self.profile.values else "clarity"

        return (
            f"{self.profile.name} twin ({self.profile.tone})\n\n"
            f"I hear you. Based on relevant memories: {guidance}\n"
            f"My usual decision anchors are: {values}.\n"
            f"Suggested next step: break the problem into 1-2 concrete actions and iterate quickly.\n\n"
            f"{self.profile.signature}"
        )

    def _high_risk_reply(self, user_message: str) -> str:
        disclaimers = " ".join(self.profile.disclaimers) if self.profile.disclaimers else (
            "I can share general guidance, but I am not a licensed professional."
        )
        return (
            f"{self.profile.name} twin\n\n"
            f"Thanks for the question: \"{user_message}\". "
            f"This appears to be a high-risk domain, so I cannot provide personalized professional advice. "
            f"{disclaimers}"
        )
