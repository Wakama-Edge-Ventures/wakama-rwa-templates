# Credentials and sensitive data handling guide (developers and AI assistants)

## Never commit
Passwords, DB/Redis/Mongo connection strings with credentials, API keys, JWT/refresh secrets,
SMTP credentials, SSH or wallet/Solana private keys, provider tokens (GitHub, Cloudflare, Coolify),
production IPs, SSH ports/users, admin URLs, real personal data of farmers or staff.

## Do instead
- Read secrets from environment variables; document them in `.env.example` with **placeholders only**
  (`<DB_PASSWORD>`, `change-me`).
- Keep `.env*` (except `.env.example`) in `.gitignore` and `.dockerignore`.
- Never put a server secret in a `NEXT_PUBLIC_*` variable or any client bundle.
- In docs, context files, handoffs and AI session files (`WAKAMA_CONTEXT.md`, `CLAUDE.md`,
  `.claude/settings.json`, etc.) write `<PROD_HOST>`, `<SSH_PORT>`, `<DB_PASSWORD>` — never real values.
  Do not whitelist shell commands that embed credentials in AI tool settings.
- Use fixtures with obviously fake values (`test-only-not-a-secret`).

## Guards in this repo
- `.github/workflows/gitleaks.yml`: Gitleaks on every PR/push (new commits only, redacted output).
- `.gitleaks.toml`: default rules + minimal justified allowlist.
- `.pre-commit-config.yaml`: optional local pre-commit hook.
- Enable GitHub Secret Scanning + Push Protection in repo/org settings where the plan allows it.

## If a secret leaks
Treat it as compromised: rotate it first (see the SEC-01 rotation plan), then clean history, and
never paste the value in tickets, PRs, logs or chat.
