# DocPropel v6 deployment

## Runtime architecture

DocPropel v6 is a single **Vite + React + Express** web service backed by a separate **Railway PostgreSQL** service. The production request path uses REST only; MySQL and tRPC are not runtime dependencies.

## Railway configuration

Create or select the v6 web service and attach a PostgreSQL service. Do not repoint the current production domain until v6 QA and approvals are complete.

| Variable         |            Required | Notes                                                                                                                                |
| ---------------- | ------------------: | ------------------------------------------------------------------------------------------------------------------------------------ |
| `NODE_ENV`       |                 Yes | Set to `production`.                                                                                                                 |
| `PORT`           | Supplied by Railway | Express binds to `0.0.0.0:$PORT`.                                                                                                    |
| `TRUST_PROXY`    |                 Yes | Set to `1` behind Railway's proxy so rate limiting receives the client IP.                                                           |
| `DATABASE_URL`   |                 Yes | Railway PostgreSQL connection string.                                                                                                |
| `DATABASE_SSL`   |                 Yes | Set to `false` for the Railway private PostgreSQL network. Set it to `true` only when the selected PostgreSQL endpoint requires TLS. |
| `SESSION_SECRET` |                 Yes | Random secret of at least 32 characters. Startup fails securely when missing in production.                                          |
| `ADMIN_EMAIL`    |                 Yes | Approved administrator email.                                                                                                        |
| `ADMIN_PASSWORD` |                 Yes | Long, unique administrator password.                                                                                                 |
| `SITE_URL`       |                 Yes | Public origin, for example `https://docpropel.com`; no trailing slash.                                                               |
| `SEED_DEFAULTS`  |            Optional | Defaults to enabled. Inserts missing default rows with conflict-ignore and never overwrites editor changes.                          |

## Commands

```bash
pnpm install --frozen-lockfile
pnpm migrate
pnpm build
pnpm start
```

Configure `/api/health` as the health-check path. The build outputs the Vite client to `dist/public` and the bundled Express server to `dist/index.js`.

## First release

1. Provision an empty PostgreSQL database and set all variables above.
2. Run `pnpm migrate` as a controlled pre-deploy/release command.
3. Start the web service. Default content, sections, and metadata are inserted only when keys do not already exist.
4. Verify `/api/health`, public routes, login, editor changes, lead submission, and CSV export in the production-equivalent environment.
5. Obtain content, legal, privacy, structured-data, accessibility, and release approval before changing DNS or the production root service.

## Rollback

Keep the prior production service and its database unchanged. If v6 fails a release gate, restore routing to that service; do not run destructive SQL. The v6 migration only creates new tables. Take a Railway PostgreSQL backup before any later migration that changes or removes columns. Editor updates are not overwritten by application startup.
