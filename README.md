# Digital Twin of a Human (AI Personality Clone)

This repository now contains a **working Python prototype** for a consent-first digital twin assistant.

## What is implemented

- Persona profile loading from JSON
- Memory loading from JSONL
- Lightweight retrieval (token overlap ranking)
- Runtime safety behavior for high-risk domains (medical/legal/financial)
- CLI interface to generate a twin response
- Unit tests for core behavior

## Project structure

```text
.
├── data/
│   ├── memories.jsonl
│   └── profile.json
├── src/digital_twin/
│   ├── __init__.py
│   ├── cli.py
│   └── model.py
├── tests/
│   └── test_model.py
└── pyproject.toml
```

## Quick start

### 1) Run tests

```bash
PYTHONPATH=src python -m unittest discover -s tests -v
```

### 2) Run the twin

```bash
PYTHONPATH=src python -m digital_twin.cli "Help me prepare a weekly project update"
```

Example high-risk refusal behavior:

```bash
PYTHONPATH=src python -m digital_twin.cli "Should I change my medication?"
```

## Data format

### `data/profile.json`

```json
{
  "name": "Alex",
  "tone": "curious, direct, and practical",
  "signature": "— Alex Twin",
  "values": ["clarity over complexity", "ship small and iterate"],
  "disclaimers": ["I can offer general educational information only."]
}
```

### `data/memories.jsonl`

Each line is a JSON object:

```json
{"text":"Alex prefers concise updates with clear next steps and owners."}
```

## Safety note

This prototype intentionally refuses personalized professional advice in high-risk domains and includes explicit disclosure language.

## Next steps

- Replace token-overlap retrieval with embeddings + vector DB
- Add API service (FastAPI)
- Add evaluation harness for style similarity and factual grounding
- Add consent/audit trail support for production readiness
