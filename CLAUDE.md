# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
bun dev             # Start development server on http://localhost:3000
bun run build       # Build for Cloudflare Workers
bun start           # Preview the built app locally
bun run lint        # Run ESLint
bun run typecheck   # Check types
bun test            # Run unit and component tests
bun run test:routes # Smoke-test a running app on port 3000
```

## Architecture

This portfolio uses TanStack Start, Vite, and strict TypeScript on Cloudflare Workers.

- **Routing:** `src/routes/` holds file-based routes and server handlers. Vite generates `src/routeTree.gen.ts`; do not edit it by hand.
- **UI:** Page components are in `src/pages/` and reusable components are in `src/components/`. Styling uses Tailwind CSS, shadcn/ui, and `next-themes` for theme selection.
- **Integrations:** The GitHub Contributions API is implemented in `src/features/github-contributions/` and uses a Cloudflare KV binding for caching. Cloudflare injects Web Analytics automatically.
- **Deployment:** The `release` branch auto-deploys to production. See `README.md` for the release workflow.

### Code Conventions
- ESLint configured with TypeScript and import sorting rules
- Boolean variables must start with: is, has, should, no
- Consistent type imports enforced
- Component files use index.tsx pattern for cleaner imports

## Universal Optimization Guidelines

When asked to optimize any codebase, systematically analyze and improve the following areas:

### 1. Performance Optimization
- **Bundle Size**: Analyze and reduce JavaScript bundle size using code splitting, lazy loading, and tree shaking
- **Rendering**: Optimize React rendering with memo, useMemo, useCallback, and proper component splitting
- **Images**: Implement lazy loading, proper sizing, and modern formats (WebP, AVIF)
- **Network**: Minimize requests, implement caching strategies, and use CDNs effectively
- **Core Web Vitals**: Focus on LCP, FID, and CLS improvements

### 2. Code Quality
- **Duplication**: Identify and extract repeated code into reusable functions/components
- **Complexity**: Break down complex functions and components into smaller, testable units
- **Type Safety**: Strengthen TypeScript usage, eliminate 'any' types, and improve type definitions
- **Dead Code**: Remove unused imports, variables, and functions
- **Naming**: Ensure consistent and descriptive naming conventions

### 3. Architecture
- **Dependencies**: Audit and update dependencies, remove unused packages
- **Structure**: Organize code by feature/domain rather than file type
- **Patterns**: Implement appropriate design patterns (composition over inheritance, etc.)
- **Separation of Concerns**: Separate business logic from UI logic
- **Scalability**: Design for future growth and maintainability

### 4. Developer Experience
- **Documentation**: Add JSDoc comments for complex functions and components
- **Error Handling**: Implement comprehensive error boundaries and logging
- **Testing**: Suggest test improvements and coverage gaps
- **Build Time**: Optimize build and development server performance
- **Tooling**: Recommend better linting rules and development tools

### 5. Security & Best Practices
- **Vulnerability Scan**: Check for known security issues in dependencies
- **Environment Variables**: Ensure proper handling of sensitive data
- **Input Validation**: Implement proper validation and sanitization
- **HTTPS & Headers**: Verify security headers and HTTPS usage
- **Authentication**: Review auth implementation for security best practices

### Optimization Process
1. First, run build and analyze bundle size
2. Use profiling tools to identify performance bottlenecks
3. Review code for obvious improvements (duplications, complexity)
4. Test changes to ensure no regressions
5. Document significant changes and their impact

## Bug Documentation

When encountering and fixing bugs, document them for future reference:

### Bug Tracking Process
1. **Create Bug Documentation**: When a bug is identified and fixed, create a documentation file in `.claude/bugs/` directory
2. **File Naming**: Use date followed by bug summary: `YYYY-MM-DD-<bug-summary>.md`
   - Example: `2024-01-15-contact-form-validation-error.md`
   - Example: `2024-02-20-github-api-rate-limit.md`
3. **Documentation Format**:
   ```markdown
   # Bug: [Brief Description]
   
   ## Date
   [YYYY-MM-DD]
   
   ## Description
   [Detailed description of the bug]
   
   ## Root Cause
   [What was causing the bug]
   
   ## Solution
   [How the bug was fixed]
   
   ## Prevention
   [How to prevent similar bugs in the future]
   
   ## Related Files
   [List of files that were affected/modified]
   ```

### Directory Structure
```
.claude/
└── bugs/
    ├── 2024-01-15-contact-form-validation-error.md
    ├── 2024-02-20-github-api-rate-limit.md
    ├── 2024-03-10-dark-mode-toggle-not-persisting.md
    └── ...
```

This helps maintain a knowledge base of resolved issues and their solutions.
