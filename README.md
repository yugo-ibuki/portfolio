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
