# Repository Guidelines

## Project Structure & Module Organization

This repository is a TanStack Start + TypeScript portfolio app deployed to Cloudflare Workers. File-based routes live in `src/routes`, including `src/routes/index.tsx` and the API route `src/routes/api.github-contributions.ts`. Page components live in `src/pages`, reusable UI in `src/components`, shared hooks in `src/hooks`, and feature-specific code in `src/features`. Static assets live in `public/`, with images under `public/assets/`. Global styles and Tailwind entry CSS are in `src/style/global.css`.

## Build, Test, and Development Commands

- `bun dev` — start the local dev server at `http://localhost:3000`.
- `bun run build` — create the production build.
- `bun start` — preview the built app locally.
- `bun run lint` — run ESLint on the TypeScript codebase.
- `bun run typecheck` — check TypeScript types.
- `bun test` — run the unit and component tests.

`package.json` declares `bun` as the package manager, so prefer `bun` over `npm` or `yarn` for local work.

## Coding Style & Naming Conventions

Use TypeScript with 2-space indentation, single quotes, and no semicolons; these rules are enforced by `eslint.config.js` and `.prettierrc`. Keep components and page files in PascalCase when they represent React components (for example, `ProfileSidebar.tsx`), and use camelCase for utilities such as `formatDate.ts`. Boolean variables should read clearly with prefixes like `is`, `has`, or `should`.

Use path aliases from `tsconfig.json` where helpful, such as `@/`, `@lib/*`, and `@hooks/*`.

## Testing Guidelines

Before opening a PR, run `bun run lint`, `bun run typecheck`, and `bun test`. Verify affected pages and API routes locally. With a local server running, `bun run test:routes` checks legacy redirects, 404 navigation, and the detail page. Place new unit and component tests near the feature.

## Commit & Pull Request Guidelines

Recent history mixes short imperative commits (`switch to unitmux`) with Conventional Commit prefixes (`feat: add huge-mouse to works section`). Prefer concise, imperative subjects; use prefixes like `feat:`, `fix:`, or `refactor:` when they add clarity.

Pull requests should include a short summary, linked issue when applicable, and screenshots or recordings for UI changes. Call out any environment variables, API behavior changes, or manual verification steps.
