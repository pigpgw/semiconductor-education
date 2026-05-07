# Git Workflow

## Branch Model

This repository uses a simple GitFlow-style model.

| Branch | Purpose | Rule |
| --- | --- | --- |
| `main` | Production-ready stable code | Merge only from `dev` through PR |
| `dev` | Integration branch for the next release | Merge only from task branches through PR |
| `feature/*` | New product or content features | Branch from `dev` |
| `fix/*` | Bug fixes | Branch from `dev` |
| `refactor/*` | Internal cleanup without behavior changes | Branch from `dev` |
| `docs/*` | Documentation changes | Branch from `dev` |
| `style/*` | Visual or CSS-only changes | Branch from `dev` |
| `chore/*` | Tooling, CI, package, setup work | Branch from `dev` |
| `test/*` | Test or validation changes | Branch from `dev` |

## Branch Naming

Use English kebab-case.

```txt
type/task-name
```

Examples:

```txt
feature/mvp-foundation
docs/source-policy
refactor/content-model
chore/github-actions
```

## Commit Convention

Use Conventional Commits.

```txt
type(scope): summary
```

Allowed common types:

- `feat`: user-facing feature
- `fix`: bug fix
- `refactor`: code cleanup without behavior change
- `docs`: documentation or content
- `style`: visual/CSS change
- `test`: validation or test change
- `ci`: GitHub Actions or deployment workflow
- `chore`: package, config, repository setup

Examples:

```txt
feat(site): add level-based learning pages
docs(content): add DRAM HBM EUV MVP lessons
ci(github): add validation and Vercel deploy workflows
refactor(content): tighten lesson frontmatter parsing
```

## PR Flow

1. Create a task branch from `dev`.
2. Commit in small work units.
3. Open a PR from task branch to `dev`.
4. Wait for CI, branch-name, and commit convention checks.
5. Merge into `dev`.
6. Open a release PR from `dev` to `main`.
7. Deploy production only from `main`.

## Protected Branches

`main` and `dev` should block direct pushes and require CI before merge.

Required checks:

- `Branch name`
- `Commit convention`
- `Validate app`

For `main`, use `dev` as the only merge source unless an emergency fix is explicitly approved.
