# wingman

wingman is an internal live-call companion for Gumlet sales reps. This version follows the latest feedback-driven workflow: choose an industry, tick the prospect problems that come up, read the matching solution, then move into benefits and demo features.

It is not a chatbot, CRM, sales agent, AI integration, or call-listening tool.

## Vercel Version

The `vercel/` folder contains the current wingman workflow adapted to standard
Next.js with Google login and a server-side Gumlet email allowlist. See
[Vercel setup instructions](vercel/README.md) for GitHub publishing, OAuth setup
and environment settings. This is separate from the older repository named
`Sales_AI_Assistant_Vercel`. In Vercel, use Root Directory `vercel` when importing
this parent repository.

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

## Google Sheet Content Source

wingman can read playbook content from a protected Google Apps Script web app
without using Google Cloud billing. Set these server-side environment variables
when deploying:

```bash
CALLPILOT_SHEET_TOKEN=your-secret-token
CALLPILOT_SHEET_API_URL=https://script.google.com/macros/s/AKfycbz6kYdAnPN15_Kt74eSWhEPWKGZ2XaNWPU8yZY7trXVZMATLey900NEa8ZJjIc0OE1E9w/exec
```

If `CALLPILOT_SHEET_TOKEN` is missing, or if the sheet endpoint fails, the app
uses the local TypeScript playbook data as a fallback.

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

- Problem, solution, benefit, and feature content has a local TypeScript fallback.
- Google Sheet content loading is server-side and requires a protected Apps Script token.
- No data persists after refresh.

## Not Built Yet

- Notion sync.
- OpenAI or any AI API integration.
- Speech-to-text or automatic call listening.
- Zoom, Google Meet, HubSpot, CRM, auth, analytics, database, RAG, embeddings, or lead enrichment.
