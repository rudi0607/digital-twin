import tempfile
import unittest
from pathlib import Path

from digital_twin.model import DigitalTwin, MemoryStore, PersonaProfile


class DigitalTwinTests(unittest.TestCase):
    def setUp(self) -> None:
        self.profile = PersonaProfile(
            name="Alex",
            tone="practical",
            signature="-Alex",
            values=["clarity", "speed"],
            disclaimers=["Not professional advice."],
        )
        self.store = MemoryStore(
            [
                "Alex uses weekly milestones.",
                "Alex asks for experiments when uncertain.",
                "Alex prefers concise updates.",
            ]
        )
        self.twin = DigitalTwin(self.profile, self.store)

    def test_memory_search_returns_relevant_first(self):
        results = self.store.search("I am uncertain about milestones", top_k=2)
        self.assertIn("Alex uses weekly milestones.", results)
        self.assertEqual(2, len(results))

    def test_high_risk_message_uses_disclaimer(self):
        response = self.twin.reply("Can you give medical advice?")
        self.assertIn("high-risk domain", response)
        self.assertIn("Not professional advice.", response)

    def test_normal_reply_contains_signature(self):
        response = self.twin.reply("How should I plan this week?")
        self.assertIn("-Alex", response)
        self.assertIn("Suggested next step", response)

    def test_profile_from_json_and_store_from_jsonl(self):
        with tempfile.TemporaryDirectory() as tmp:
            profile_path = Path(tmp) / "profile.json"
            mem_path = Path(tmp) / "memories.jsonl"
            profile_path.write_text(
                '{"name":"Jamie","tone":"warm","signature":"-J","values":["care"]}',
                encoding="utf-8",
            )
            mem_path.write_text('{"text":"Jamie likes practical examples."}\n', encoding="utf-8")

            profile = PersonaProfile.from_json(profile_path)
            store = MemoryStore.from_jsonl(mem_path)

            self.assertEqual("Jamie", profile.name)
            self.assertEqual(["Jamie likes practical examples."], store.search("examples", top_k=1))


if __name__ == "__main__":
    unittest.main()
