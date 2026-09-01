# Gumlet CallPilot

Gumlet CallPilot is an internal live-call companion for Gumlet sales reps. V1 is a frontend prototype that guides a first sales/demo call through a deterministic, locally mocked conversation flow.

It is not a chatbot, CRM, sales agent, AI integration, or call-listening tool.

## Run Locally

```bash
npm install
npm run dev
```

The app opens on the pre-call setup screen. Select `E-commerce` and a job title to start the mocked V1 call flow.

## What V1 Includes

- Pre-call setup for industry, job title, company size, company name, and prospect name.
- Live-call layout with a large "what to say next" card and compact sidebar.
- Typed local conversation data for a branching e-commerce flow.
- Rule-based conversation engine separated from presentation components.
- Response types for acknowledgement, single select, scale, multi-select, and Other.
- Local call state for answers, stages, completed nodes, pains, discussed areas, and demo recommendations.
- Call summary with confirmed pains, areas discussed, recommended demo features, step count, and local history.

## Intentionally Mocked

- Only the e-commerce playbook has conversation data.
- EdTech and B2C / Consumer Apps are placeholders.
- Customer proof points are approved-style placeholders without invented metrics.
- Other responses are stored locally and routed through predefined fallback paths.
- No data persists after a refresh.

## Not Built Yet

- OpenAI or any AI API integration.
- Speech-to-text or automatic call listening.
- Zoom, Google Meet, HubSpot, CRM, auth, analytics, database, RAG, embeddings, or lead enrichment.
