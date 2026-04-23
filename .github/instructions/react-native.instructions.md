---
applyTo: "foodDeliveryFE/**"
---

# React Native Code Standards — Food Delivery App

These rules apply to ALL code generated or modified inside `foodDeliveryFE/`. Follow every rule without exception.

---

## 1. SOLID Principles

### Single Responsibility
- One file = one purpose. A hook manages logic. A component renders UI. A store holds state. Never mix.
- If a file grows beyond ~150 lines, it likely violates SRP — split it.

### Open/Closed
- Extend via composition and props. Never modify existing components to add features.
- Use wrapper components, new hooks, or prop variants instead.

### Liskov Substitution
- Components sharing the same Props interface must be interchangeable (e.g., `Button` and `OutlineButton` both accept `ButtonProps`).

### Interface Segregation
- Keep prop interfaces small and focused. Don't force components to accept props they don't use.
- Split large interfaces: `LoginFormProps` vs `LoginHeaderProps`, not one giant `LoginProps`.

### Dependency Inversion
- Depend on abstractions (interfaces/types), not concretions.
- API client exposes a typed interface; hooks depend on the interface, not the raw fetch call.
- Zustand stores are accessed via hooks — never import a store directly into a component.

---

## 2. Container-Presentation Pattern (via Hooks)

Every screen follows the **Hook-Screen** pattern:

```
screens/<pageName>/
├── <PageName>Screen.tsx       ← ALL UI rendering (presentation)
└── hooks/
    └── use<PageName>.ts       ← ALL business logic (container)
```

### Rules
- **Screen files (`*Screen.tsx`)** contain ZERO business logic — no `fetch`, no `if/else` for validation, no direct store calls except through the hook return.
- **Screen hooks (`use<Page>.ts`)** contain ZERO JSX — no rendering, no `StyleSheet`, no `View`.
- The hook returns a **single typed object** (e.g., `UseLoginReturn`) containing all state and handlers the screen needs.
- The screen calls the hook, destructures the return value, and passes data/handlers as props to child components.

### Example

```typescript
// ✅ screens/login/hooks/useLogin.ts — ALL business logic
const useLogin = (): UseLoginReturn => {
  const { login, isLoading, error } = useAuthStore();
  const { values, errors, validate } = useFormValidation(loginRules);
  // ... handlers, side effects
  return { email, password, isLoading, errors, onLogin, onEmailChange, ... };
};

// ✅ screens/login/LoginScreen.tsx — ALL UI
const LoginScreen: React.FC = () => {
  const { email, password, isLoading, errors, onLogin, onEmailChange } = useLogin();
  return (
    <ScreenTemplate>
      <LoginForm email={email} password={password} ... />
      <Button title="LOG IN" onPress={onLogin} loading={isLoading} />
    </ScreenTemplate>
  );
};
```

---

## 3. Custom Hook Design Pattern

### Screen-specific hooks
- Located in `screens/<page>/hooks/`
- Named `use<PageName>` (e.g., `useLogin`, `useCart`, `useDashboard`)
- Contain ALL business logic for that screen: API calls, validation, navigation, error handling

### Common reusable hooks
- Located in top-level `hooks/`
- Named `use<Domain><Action>` (e.g., `useFormValidation`, `useDebounce`, `useApi`)
- Used by multiple screen hooks — never duplicated

### Return type convention
- Always define an explicit return interface: `Use<PageName>Return`
- Return a single object with state + `on*`-prefixed handlers

```typescript
interface UseLoginReturn {
  // State
  email: string;
  password: string;
  isLoading: boolean;
  errors: FormErrors;
  loginError: string | null;
  // Handlers
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
}
```

---

## 4. Atomic Design Pattern

| Level | Location | Business Logic | Examples |
|-------|----------|---------------|----------|
| Atoms | `components/atoms/` | ❌ None | `Button`, `TextInput`, `Text`, `Icon`, `Checkbox` |
| Molecules | `components/molecules/` | ❌ None | `FormField`, `PasswordInput`, `SearchBar` |
| Organisms | `components/organisms/` | ❌ None | `LoginForm`, `Header`, `RestaurantCard` |
| Templates | `components/templates/` | ❌ None | `ScreenTemplate` (SafeArea + keyboard + scroll) |
| Screens | `screens/<page>/` | Via hook only | `LoginScreen` calls `useLogin()` |

### Rules
- Atoms and molecules NEVER import from `store/`, `api/`, or `navigation/`.
- Organisms receive ALL data via props — they do not call hooks themselves.
- Every component exports a `<ComponentName>Props` interface.
- Every folder with 2+ exports has an `index.ts` barrel export.

---

## 5. TypeScript Best Practices

### Strict typing
- `strict: true` is enabled — never weaken it.
- **NEVER** use `any`. Use `unknown` if the type is truly unknown, then narrow it.
- **NEVER** use `as` type assertions unless absolutely required for 3rd-party lib interop.
- **NEVER** use `@ts-ignore` or `@ts-expect-error`.

### Type vs Interface
- `interface` for object shapes: props, API responses, store state.
- `type` for unions, intersections, and computed types.

### Props
- Every component has a `<ComponentName>Props` interface exported above the component.
- Use `React.FC<Props>` or explicit function with typed return.

### Generics
- Use generics for reusable types: `ApiResponse<T>`, `FormField<T>`.

```typescript
// ✅ DO
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

// ❌ NEVER
const data: any = fetchSomething();
const user = response as User;
```

---

## 6. Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Component files | PascalCase `.tsx` | `LoginScreen.tsx`, `Button.tsx` |
| Hook files | camelCase `.ts` | `useLogin.ts`, `useFormValidation.ts` |
| Utility files | camelCase `.ts` | `validation.ts`, `storage.ts` |
| Type files | camelCase `.types.ts` | `auth.types.ts`, `api.types.ts` |
| Constant files | camelCase `.ts` | `apiConfig.ts`, `appConstants.ts` |
| Components | PascalCase | `LoginScreen`, `FormField` |
| Hooks | `use` + PascalCase | `useLogin`, `useAuthStore` |
| Props interfaces | PascalCase + `Props` | `ButtonProps`, `FormFieldProps` |
| Return interfaces | `Use<Name>Return` | `UseLoginReturn` |
| Types/Unions | PascalCase | `AuthStatus`, `FormErrors` |
| Constants | UPPER_SNAKE_CASE | `BASE_URL`, `USE_MOCK` |
| Zustand stores | `use<Domain>Store` | `useAuthStore`, `useCartStore` |
| Event handlers (in hooks) | `handle*` internally | `handleLogin` returned as `onLogin` |
| Event handler props | `on*` prefix | `onPress`, `onEmailChange` |

---

## 7. React Native Best Practices

### Styles
- Always use `StyleSheet.create()` at the bottom of the file. **No inline styles.**
- Reference theme tokens (`COLORS`, `SPACING`, `TYPOGRAPHY`) — never hardcode colors or spacing values.

### Performance
- `React.memo()` for components that receive stable props from parents.
- `useCallback` for every handler function passed as a prop.
- `useMemo` for expensive computations or derived data.
- `FlatList` with `keyExtractor` for any dynamic list. Never `.map()` inside `ScrollView`.

### Platform
- `Platform.select()` or `Platform.OS` for platform-specific values.
- `.ios.tsx` / `.android.tsx` file extensions only when the entire component differs by platform.

### Accessibility
- Every interactive element MUST have `accessibilityLabel` and `accessibilityRole`.
- Use `accessibilityState` for disabled/loading/checked states.

### Keyboard & Safe Area
- Form screens wrapped in `KeyboardAvoidingView` (use `ScreenTemplate`).
- Use `react-native-safe-area-context` — never hardcode status bar heights.

### Imports
- Use `@/` path alias for all imports from `src/`. No relative `../../` paths beyond one level.
- Group imports: React → RN → 3rd party → `@/` internal → relative (within same feature).

---

## 8. Folder Structure Reference

All source code lives under `foodDeliveryFE/src/`:

```
src/
├── api/            # Typed API client + mock layer
├── components/     # Shared atomic components
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── hooks/          # Common reusable hooks ONLY
├── navigation/     # React Navigation setup + typed param lists
├── screens/        # Feature screens (co-located UI + hooks)
│   └── <page>/
│       ├── <Page>Screen.tsx
│       └── hooks/
│           └── use<Page>.ts
├── store/          # Zustand stores
├── types/          # Shared TypeScript types
├── utils/          # Pure utility functions
├── constants/      # App-wide constants
└── theme/          # Colors, spacing, typography tokens
```

Never place source files outside `src/`. Never create a `containers/` folder — the hook IS the container.
