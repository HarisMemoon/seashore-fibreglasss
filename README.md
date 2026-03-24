# Seashore Fiberglass

Monorepo for the Seashore Fiberglass website and API.

## Structure

- `apps/web` - Next.js 14 App Router + TypeScript + Tailwind
- `apps/api` - Nest.js API
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

# Run API
pnpm dev:api

# Build all
pnpm build
```
