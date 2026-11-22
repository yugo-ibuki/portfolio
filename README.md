## Portfolio

## up

```bash
bun dev
```

## local server

```bash
localhost:3000
```

## production server

```bash
https://y-ibuki91.app
```

## Local verification

Copy `.dev.vars.example` to `.dev.vars` and set the GitHub credentials to exercise the contributions API locally. Run `bun run cf-typegen` to regenerate the Worker binding types using the example file, without reading local secrets.

With `bun dev` or `bun start` running, use `bun run test:routes` to check legacy redirects, 404 navigation, and the background detail layout. Pass a different base URL as the first argument to check another environment.

## Cloudflare Workers

The `release` branch is deployed automatically with Cloudflare Workers Builds.
Set the production branch to `release` in the Worker's **Settings > Build > Branch control**.
Merge the changes you want to publish from `main` into `release`, then push `release`.
Pushing to `main` does not deploy to production.
Non-production branch builds upload preview versions with `npx wrangler versions upload`.

```bash
bun run preview
bun run deploy
```

Cloudflare Web Analytics is enabled for `y-ibuki91.app` through Cloudflare's
automatic setup. Do not add the manual beacon to the application because
Cloudflare already injects one analytics snippet into each production page.
