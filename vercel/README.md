# wingman on Vercel

This folder contains the current wingman workflow adapted to standard Next.js,
with Google Workspace login. It is independent of the older repository named
`Sales_AI_Assistant_Vercel`.

Only Google-verified accounts belonging to the Gumlet Workspace can enter.
Knowing or typing a Gumlet email address is not enough: Google must authenticate
the account and confirm the `gumlet.com` Workspace domain. The server checks
access before loading or sending the playbook. Google OAuth handles passwords;
this app never asks for or stores them. Sessions expire after eight hours.

## 1. Put this version on GitHub

Create a NEW private repository named `wingman`. Do not select or overwrite
`Sales_AI_Assistant_Vercel`.

Using GitHub Desktop (recommended):

1. Choose File > Add Local Repository and select the parent `Sales_AI_Assistant`
   folder. It is already a Git repository containing this new version.
2. Select Publish repository, set the GitHub repository name to `wingman`, and
   keep it private. If the parent already has a GitHub remote, use the command-line
   method below to publish to a NEW repository instead.
3. In Vercel, import this new `wingman` repository and set Root Directory to
   `vercel`.

Alternatively, create an empty private GitHub repository called `wingman` with
no README, license or .gitignore. Run these commands in the PARENT
Sales_AI_Assistant folder (replace YOUR_USERNAME):

```bash
git remote add github https://github.com/YOUR_USERNAME/wingman.git
git push github main
```

`.env.local`, dependencies and build files are ignored. The above methods publish
the parent repository, so Vercel Root Directory must be `vercel`. The existing
`sites` remote remains configured for the current chatgpt.site application.

For a standalone source package, the ZIP in the parent `outputs` folder contains
only this version. Extract it outside the parent repository, then create/publish
a new private repository from its extracted folder using GitHub Desktop. For
that standalone package only, the Vercel Root Directory is `.`.

## 2. Create the Vercel project

In Vercel > Add New > Project, import the NEW `wingman` repository. If it is
missing, use Configure GitHub App to give Vercel access to that repository.

- Framework Preset: Next.js
- Root Directory: `vercel` (or `.` if using the extracted standalone ZIP)
- Build Command: `npm run build`
- Install Command: `npm ci`
- Output Directory: leave at the Next.js default
- Node.js Version: 22.x or 24.x

Deploy once to obtain your production URL. Until login is configured, the login
screen stays disabled and the playbook stays inaccessible. Copy the actual URL
Vercel gives you; do not assume the name `wingman.vercel.app` is available.

Use a company Vercel Pro/Enterprise team for this business tool. Vercel's Hobby
plan is restricted to personal, non-commercial use:
https://vercel.com/docs/plans/hobby

## 3. Create Google login credentials

Open https://console.cloud.google.com/ with your Gumlet Google account. Use a
Gumlet-owned Cloud project or create one. Google OAuth setup does not require
starting the Google Cloud free trial or adding a payment method.

1. Open Google Auth Platform. Complete Branding with the app name `wingman`,
   your support email, and developer contact email.
2. In Audience, choose Internal for the Gumlet Workspace. If Internal is not
   available, ask your Gumlet Workspace administrator to create the project.
3. In Clients, choose Create client > Web application.
4. Add an Authorized JavaScript origin equal to your production URL, for example
   `https://YOUR-ACTUAL-PROJECT.vercel.app` (no trailing slash).
5. Add an Authorized redirect URI equal to that URL plus
   `/api/auth/callback/google`.
6. Copy the Client ID and Client secret into Vercel's environment settings.

Only basic `openid`, `email` and `profile` scopes are requested. No Drive/Sheets
permissions are requested through Google login. Your existing Apps Script
endpoint continues to supply the sheet content independently.

Google provider documentation:
https://next-auth.js.org/providers/google

## 4. Add production environment variables

Open Vercel > wingman > Settings > Environment Variables. Add these to Production:

| Name | Value |
| --- | --- |
| NEXTAUTH_URL | Your exact production HTTPS URL, with no trailing slash |
| NEXTAUTH_SECRET | The generated value in the local `.env.local` file |
| GOOGLE_CLIENT_ID | Your Google OAuth Client ID |
| GOOGLE_CLIENT_SECRET | Your Google OAuth Client secret |
| CALLPILOT_SHEET_API_URL | The endpoint already provided in `.env.example` |
| CALLPILOT_SHEET_TOKEN | The existing `TOKEN` value in your Apps Script `Code.gs` |

Mark secrets as sensitive where available. Never use a `NEXT_PUBLIC_` prefix for
these values and never commit `.env.local`. This source includes no actual OAuth
credentials or sheet token.

Missing sheet credentials use the existing local playbook as a fallback. For
sheet editing to update the site, supply the sheet token. Successful sheet reads
are cached for up to 10 seconds per server instance. Refresh/reopen the tool after
editing the sheet; an already-open call does not change in the background.

After saving variables, use Deployments > latest deployment > Redeploy. Changes
to environment variables need a new deployment to take effect.

## 5. Check access

1. Open the production URL in an incognito window: only the login screen should
   appear.
2. Sign in with a Gumlet Google account and complete the four-step flow.
3. Sign out, then try a personal Gmail account. It should not be able to enter.
4. Make a small sheet change, wait at least 10 seconds, refresh the signed-in tool,
   and check that the change appears.

Keep using the existing chatgpt.site version until these checks succeed. This
folder does not disable or redirect the current live site.

## Future updates

Edit this Vercel version, commit, then push to its GitHub repository. Vercel
automatically rebuilds and deploys the connected production branch. Access is
granted to all Google-verified accounts in the `gumlet.com` Workspace.

For a custom domain such as `wingman.gumlet.com`, add it in Vercel > Settings >
Domains and apply Vercel's displayed DNS record through your Gumlet DNS admin.
Change `NEXTAUTH_URL` and register the new Google origin and callback URI before
redeploying. Use the same auth secret across deployments.

## Local preview

```bash
npm ci
npm run dev
```

The default preview is http://localhost:3000. For working local Google login,
fill `.env.local` and register both `http://localhost:3000` as an origin and
`http://localhost:3000/api/auth/callback/google` as a Google redirect URI.
Without those credentials the preview intentionally shows a disabled login.

```bash
npm test
npm run build
npm run test:integration
```

OAuth login itself must be tested with the real Google credentials after setup.
