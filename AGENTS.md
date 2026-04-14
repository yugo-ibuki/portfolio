# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js 16 + TypeScript portfolio app. Route files live under `src/app`, including page routes such as `src/app/page.tsx` and API handlers like `src/app/api/github-contributions/route.ts`. Reusable UI components live in `src/components`, shared hooks in `src/hooks`, and utility or mail helpers in `src/lib`. Static assets are served from `public/`, with images under `public/assets/`. Global styles and Tailwind entry CSS are in `src/style/global.css`.

## Build, Test, and Development Commands

- `bun dev` — start the local dev server at `http://localhost:3000`.
- `bun run build` — create the production build.
- `bun start` — run the built app locally.
- `bun run lint` — run ESLint on the TypeScript codebase.

`package.json` declares `bun` as the package manager, so prefer `bun` over `npm` or `yarn` for local work.

## Coding Style & Naming Conventions

Use TypeScript with 2-space indentation, single quotes, and no semicolons; these rules are enforced by `eslint.config.js` and `.prettierrc`. Keep components and page files in PascalCase when they represent React components (for example, `ProfileSidebar.tsx`), and use camelCase for utilities such as `formatDate.ts`. Boolean variables should read clearly with prefixes like `is`, `has`, or `should`.

Use path aliases from `tsconfig.json` where helpful, such as `@/`, `@lib/*`, and `@hooks/*`.

## Testing Guidelines

There is currently no dedicated automated test suite in this repository. Before opening a PR, run `bun run lint` and manually verify the affected pages and API routes in `bun dev`. If you add tests later, place them near the feature or in a `tests/` directory and use clear names like `component-name.test.ts`.

## Commit & Pull Request Guidelines

Recent history mixes short imperative commits (`switch to unitmux`) with Conventional Commit prefixes (`feat: add huge-mouse to works section`). Prefer concise, imperative subjects; use prefixes like `feat:`, `fix:`, or `refactor:` when they add clarity.

Pull requests should include a short summary, linked issue when applicable, and screenshots or recordings for UI changes. Call out any environment variables, API behavior changes, or manual verification steps.
