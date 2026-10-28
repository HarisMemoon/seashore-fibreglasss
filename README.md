# Seashore Fiberglass

Monorepo for the Seashore Fiberglass website.

## Structure

- `apps/web` - Next.js 14 App Router + TypeScript + Tailwind
- `packages/content` - Website copy as TS constants
- `packages/types` - Shared TypeScript types
- `packages/ui` - Shared UI components (Navbar, Footer)

## Design System

- **Colors**: Navy `#1B3A5C`, Turquoise `#2A7DA6`, Orange `#E87C2B`
- **Fonts**: Montserrat (headings), Inter (body)

## Commands

```bash
# Install dependencies
pnpm install

# Run web app
pnpm dev:web

# Build all
pnpm build
```
