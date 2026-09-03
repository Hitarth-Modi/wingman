# Gumlet CallPilot

Gumlet CallPilot is an internal live-call companion for Gumlet sales reps. This version follows the latest feedback-driven workflow: choose an industry, tick the prospect problems that come up, read the matching solution, then move into benefits and demo features.

It is not a chatbot, CRM, sales agent, AI integration, or call-listening tool.

## Run Locally

```bash
npm install
npm run dev
```

The app opens with a single industry selection step. Choose `E-commerce`, `EdTech`, or `B2C / Consumer Apps` to view the related problem questions.

## Current Flow

1. Select only the prospect industry.
2. Review problem questions for that industry.
3. Tick every question the prospect responds to.
4. Each ticked question expands to show the solution line.
5. Click Next to review benefits.
6. Continue to the Features to Demo screen.

## What V1 Includes

- Industry-only setup.
- Multi-select problem questions.
- Inline solution reveal for selected questions.
- Benefits screen built from selected problems.
- Deduplicated features-to-demo screen.
- Back and forward arrows across the flow.
- Layout tuned for a half-screen sales-call companion view.
- Local structured playbook data populated from the shared Notion/PDF export.

## Intentionally Mocked

- Problem, solution, benefit, and feature content is stored locally in TypeScript.
- Notion is not connected as a live data source yet.
- No data persists after refresh.

## Not Built Yet

- Notion sync.
- OpenAI or any AI API integration.
- Speech-to-text or automatic call listening.
- Zoom, Google Meet, HubSpot, CRM, auth, analytics, database, RAG, embeddings, or lead enrichment.
