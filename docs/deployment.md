# Deployment Pipeline

## Goal

Deployment should follow branch flow instead of pushing directly to `main`.

```txt
feature/* -> PR -> dev -> PR -> main -> production deploy
```

## CI

The `CI` workflow runs on pull requests to `dev` and `main`, and on pushes to task branches.

Checks:

- branch name convention
- commit message convention
- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- viewport smoke test against the built app

## Vercel Deployment

The `Vercel Deploy` workflow is prepared but disabled by default. This prevents failing deployments before Vercel secrets are configured.

To enable:

1. Create a Vercel project linked to this repository.
2. Add GitHub repository secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Add GitHub repository variable:
   - `ENABLE_VERCEL_DEPLOY=true`

Deployment behavior:

| Branch | Environment | Behavior |
| --- | --- | --- |
| `dev` | preview | Builds and deploys a Vercel preview |
| `main` | production | Builds and deploys production with `--prod` |

Feature branches do not deploy automatically. They should be reviewed through PR checks first.

## Source

This workflow follows Vercel's GitHub Actions pattern: pull Vercel environment, run `vercel build`, then deploy the prebuilt output with `vercel deploy --prebuilt`.

Reference: https://vercel.com/docs/deployments/git/vercel-for-github
