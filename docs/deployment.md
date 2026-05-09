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
- `npm run validate`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run check:lessons`
  - `npm run check:glossary`
  - `npm run check:practice`
  - `npm run build`
- viewport smoke test against the built app

External official-link checks are kept as an explicit local audit command instead of a required CI gate:

```bash
npm run check:links
```

This avoids blocking PRs when an official company site temporarily rejects automated requests.

## Vercel Deployment

The fastest free launch path is Vercel Hobby. It matches the current Next.js App Router setup and requires the least repository change for the first public release.

Vercel's official Hobby documentation says the plan is free for personal projects and small-scale applications, with non-commercial personal-use restrictions. This project should stay non-commercial while using Hobby. If the site becomes a commercial service, paid course funnel, ad-supported product, or team-operated service, revisit the plan before promotion.

The `Vercel Deploy` workflow is prepared but disabled by default. This prevents failing deployments before Vercel secrets are configured.

To enable:

1. Create a Vercel project linked to this repository.
   - Set the project name to `semiconductor-education` if the default URL should be `https://semiconductor-education.vercel.app`.
   - Set production branch to `main`.
   - Keep PR preview deployments enabled.
2. Add Vercel environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://semiconductor-education.vercel.app`
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

## Free Alternatives

Cloudflare Pages is the best second option if the project later moves toward a static-export-first documentation site. Official Cloudflare Pages limits list 500 builds per month on the Free plan and support Git-connected deployments.

GitHub Pages is useful for public project documentation, but the current Next.js App Router and MDX RSC setup would need a static export strategy first. It is not the fastest first launch target for this repository.

## Launch Checklist

Before announcing v0.1.0:

```bash
npm run validate
npm run check:links
npm run check:viewport
```

Then verify:

- Production URL loads `/`, `/learn`, `/roadmap`, `/sources`, `/industry`.
- `/robots.txt` returns the production host and sitemap.
- `/sitemap.xml` includes static pages, lessons, and industry notes.
- README and GitHub About point to the production URL.
- `v0.1.0` release notes match `docs/release-notes-v0.1.0.md`.

## Source

This workflow follows Vercel's GitHub Actions pattern: pull Vercel environment, run `vercel build`, then deploy the prebuilt output with `vercel deploy --prebuilt`.

References:

- https://vercel.com/docs/plans/hobby
- https://vercel.com/docs/deployments/git/vercel-for-github
- https://developers.cloudflare.com/pages/platform/limits/
