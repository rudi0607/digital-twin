from __future__ import annotations

import argparse
from pathlib import Path

from .model import DigitalTwin, MemoryStore, PersonaProfile


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run a local digital twin prototype")
    parser.add_argument("message", help="User message to send to the twin")
    parser.add_argument(
        "--profile",
        default="data/profile.json",
        help="Path to persona profile JSON",
    )
    parser.add_argument(
        "--memories",
        default="data/memories.jsonl",
        help="Path to memory JSONL",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    profile = PersonaProfile.from_json(Path(args.profile))
    memory_store = MemoryStore.from_jsonl(Path(args.memories))
    twin = DigitalTwin(profile, memory_store)

    print(twin.reply(args.message))


if __name__ == "__main__":
    main()
