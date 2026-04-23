---
applyTo: "foodDeliveryFE/**"
---

# Type Conventions — Food Delivery App

These rules apply to all TypeScript types, interfaces, and type aliases inside `foodDeliveryFE/`.

---

## Folder Structure

Types are organized by domain under `src/types/`:

```
src/types/
├── api/
│   └── index.ts        — ApiResponse<T>, ApiError, RequestConfig
├── auth/
│   └── index.ts        — User, LoginRequest, LoginResponse, SignUpRequest, SignUpResponse, AuthState, AuthStatus
├── common/
│   └── index.ts        — FormErrors (and other generic UI/utility types)
├── index.ts            — barrel re-export (single public API for all types)
└── svg.d.ts            — SVG module declaration
```

Add a new domain folder (e.g., `restaurant/`, `order/`, `cart/`) whenever a new feature domain requires shared types.

---

## Import Rules

### Default — always import from the barrel

```typescript
import type { FormErrors, User, ApiResponse } from '@/types';
```

### Domain-specific — allowed when you need only types from one domain

```typescript
import type { SignUpRequest, SignUpResponse } from '@/types/auth';
import type { ApiError } from '@/types/api';
import type { FormErrors } from '@/types/common';
```

**Never** import directly from a sub-file inside a domain folder:

```typescript
// ❌ wrong
import type { FormErrors } from '@/types/common/index';

// ✅ correct
import type { FormErrors } from '@/types/common';
```

---

## Where Types Live

| Category | Location |
|----------|----------|
| API request/response shapes | `src/types/api/` |
| Auth domain (user, tokens, state) | `src/types/auth/` |
| Generic UI / utility types (FormErrors, etc.) | `src/types/common/` |
| Navigation param lists | `src/navigation/types.ts` |
| Component prop interfaces | Co-located in the component file (not in `src/types/`) |
| Hook return interfaces | Co-located in the hook file (not in `src/types/`) |
| Store state interfaces | Co-located in the store file (not in `src/types/`) |

---

## Rules

1. **Only shared types go in `src/types/`** — if a type is used in exactly one file, define it there.
2. **Use `interface` for object shapes** — prefer `interface` over `type` for object definitions.
3. **Use `type` for unions, aliases, and mapped types** — e.g., `type AuthStatus = 'idle' | 'loading'`.
4. **Always `import type`** — use `import type { ... }` for type-only imports; never bare `import`.
5. **No inline type widening** — don't use `as` assertions or `any`; define proper types instead.
6. **Barrel is the public API** — `src/types/index.ts` must re-export everything from domain folders. New types added to a domain folder must also be re-exported from the barrel.

---

## Adding a New Domain

When a new PRD feature requires shared types:

1. Create `src/types/<domain>/index.ts` with the type definitions.
2. Add re-exports in `src/types/index.ts`.
3. Name files and folders in **kebab-case** (e.g., `restaurant/`, `order-tracking/`).

Example — adding restaurant types:

```typescript
// src/types/restaurant/index.ts
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTimeMinutes: number;
  imageUrl: string | null;
}

export interface RestaurantListResponse {
  restaurants: Restaurant[];
  total: number;
}
```

```typescript
// src/types/index.ts  (add to barrel)
export type { Restaurant, RestaurantListResponse } from './restaurant';
```
