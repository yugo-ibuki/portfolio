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

The `main` branch is deployed automatically with Cloudflare Workers Builds.

```bash
bun run preview
bun run deploy
```

Cloudflare Web Analytics is enabled for `y-ibuki91.app` through Cloudflare's
automatic setup. Do not add the manual beacon to the application because
Cloudflare already injects one analytics snippet into each production page.
