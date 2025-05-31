# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
yarn dev        # Start development server on http://localhost:3000
yarn build      # Build for production
yarn start      # Start production server
yarn lint       # Run ESLint
```

## Architecture

This is a Next.js 14 portfolio site using the App Router pattern with TypeScript.

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Hybrid approach using Chakra UI, Tailwind CSS, and shadcn/ui components
- **Forms**: react-hook-form with Zod validation
- **Email**: SendGrid integration for contact form
- **Storage**: Vercel KV for data persistence

### Key Architectural Patterns

1. **App Router Structure**: All pages are in `/src/app/` using Next.js 14 conventions
   - Client components explicitly marked with `'use client'`
   - Server components by default
   - API routes in `/app/api/`

2. **Component Organization**:
   - Reusable components in `/src/components/` with index.tsx exports
   - UI primitives from shadcn/ui in `/src/components/components/ui/`
   - List components grouped in `/src/components/List/`

3. **Styling Approach**:
   - Chakra UI for theme and component system
   - Tailwind CSS for utility classes
   - shadcn/ui for modern, accessible UI components
   - Dark mode support via next-themes

4. **Type Safety**:
   - Zod schemas for form validation
   - TypeScript strict mode enabled
   - Path aliases configured (@components, @lib, @hooks, etc.)

5. **External Integrations**:
   - GitHub API for contribution graph
   - SendGrid for email functionality
   - Vercel Analytics for tracking
   - Vercel KV for data storage

### Code Conventions
- ESLint configured with TypeScript and import sorting rules
- Boolean variables must start with: is, has, should, no
- Consistent type imports enforced
- Component files use index.tsx pattern for cleaner imports