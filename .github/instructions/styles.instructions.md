---
applyTo: "foodDeliveryFE/src/components/** foodDeliveryFE/src/screens/**"
---

# Style File Organization — No Inline Styles

All styles in `components/` and `screens/` **MUST** be defined in a separate `styles.ts` file. Never write inline styles in component files.

---

## 1. The Pattern: Co-located Style Files

For every UI component or screen, create a corresponding `styles.ts` file in the same directory:

```
components/atoms/
├── Button.tsx
├── styles.ts               ← All styles for Button
└── index.ts

screens/login/
├── LoginScreen.tsx
├── styles.ts               ← All styles for LoginScreen
└── hooks/
    └── useLogin.ts
```

### Rules
- **File naming:** `styles.ts`
- **Location:** Same folder as the component `.tsx` file
- **Content:** Only `StyleSheet.create()` and style helper functions — no JSX, no logic
- **Import in component:** `import { styles } from './styles';`

---

## 2. StyleSheet Structure

Every `.styles.ts` file must:
1. Import theme tokens from `@/theme`
2. Export a single `styles` object via `StyleSheet.create()`
3. Optionally export helper functions for dynamic styles

### Example: styles.ts (Button)

```typescript
// ✅ components/atoms/styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },
  disabledContainer: {
    opacity: 0.5,
  },
});

// Helper for dynamic styles (if needed)
export const getButtonStyles = (variant: 'primary' | 'secondary' | 'outline') => {
  return [styles.container, styles[variant]];
};
```

### Example: Button.tsx (Component Using Styles)

```typescript
// ✅ components/atoms/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[variant],
        disabled && styles.disabledContainer,
        style, // Allow style overrides
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

---

## 3. Theme Token Usage (MANDATORY)

Never hardcode colors, spacing, or typography values. Always use theme tokens:

### ❌ NEVER DO THIS (Inline + Hardcoded)

```typescript
// ❌ BAD — inline styles + hardcoded values
const LoginScreen: React.FC = () => {
  return (
    <View style={{ padding: 16, backgroundColor: '#1E1E1E' }}>
      <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>
        Welcome
      </Text>
    </View>
  );
};
```

### ✅ ALWAYS DO THIS (Separate File + Theme Tokens)

```typescript
// ✅ GOOD — screens/login/styles.ts
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    ...TYPOGRAPHY.headlineSmall,
    color: COLORS.text,
  },
});

// ✅ GOOD — LoginScreen.tsx
const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
    </View>
  );
};
```

---

## 4. Dynamic Styles & Conditional Styling

For dynamic styles (variant-based or responsive), use **style arrays** or **helper functions**:

### Variant-Based (Style Array)

```typescript
// ✅ BadgeStyles.tsx
export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    alignItems: 'center',
  },
  success: {
    backgroundColor: COLORS.success,
  },
  warning: {
    backgroundColor: COLORS.warning,
  },
  error: {
    backgroundColor: COLORS.error,
  },
  text: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
  },
});

// ✅ Badge.tsx — Conditional styling with array
interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'success' }) => {
  return (
    <View style={[styles.container, styles[variant]]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};
```

### Responsive Styles (Dimensions)

```typescript
// ✅ For responsive/dimension-based styles (rare)
import { useWindowDimensions } from 'react-native';

const MyComponent: React.FC = () => {
  const { width, height } = useWindowDimensions();
  
  const dynamicStyle = {
    width: width * 0.8, // Responsive based on screen width
    height: height * 0.5,
  };

  return <View style={[styles.container, dynamicStyle]} />;
};
```

---

## 5. Organism & Screen Styles (Complex Components)

For complex organisms or screens, organize styles into logical sections within the same file:

```typescript
// ✅ screens/login/styles.ts
export const styles = StyleSheet.create({
  // Container
  container: { ... },
  scrollContent: { ... },

  // Header Section
  header: { ... },
  headerTitle: { ... },

  // Form Section
  form: { ... },
  formField: { ... },
  formError: { ... },

  // Button Section
  buttonContainer: { ... },
  button: { ... },
  linkButton: { ... },

  // Footer Section
  footer: { ... },
  footerText: { ... },
});
```

---

## 6. Reusable Style Utilities (Optional)

If multiple components share the same styles, create a **reusable styles utility**:

```typescript
// ✅ theme/commonStyles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from './index';

export const commonStyles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  shadowBox: {
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

// ✅ Used in components
import { commonStyles } from '@/theme/commonStyles';

export const styles = StyleSheet.create({
  container: {
    ...commonStyles.centerContent,
    ...commonStyles.safeContainer,
  },
});
```

---

## 7. Platform-Specific Styles

Use `Platform.select()` for platform-specific styling:

```typescript
// ✅ styles.ts
import { Platform, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
```

---

## 8. Checklist Before Submitting Code

- [ ] No `style={{ ... }}` inline styles in `.tsx` files
- [ ] Every component has a `styles.ts` file in the same folder
- [ ] Styles imported as `import { styles } from './styles';`
- [ ] All color, spacing, and typography values use `@/theme` tokens
- [ ] `styles.ts` files have ZERO JSX, ZERO logic, ZERO imports except theme/StyleSheet
- [ ] Component files have ZERO `StyleSheet.create()` calls
- [ ] Dynamic styles use style arrays or conditional utilities, not inline creation

---

## Benefits

✅ **Cleaner component code** — Easier to read and maintain  
✅ **Consistent styling** — All styles in one predictable place  
✅ **Easy theme changes** — Update theme tokens; all components update  
✅ **Performance** — Styles are pre-created, not computed on render  
✅ **Reusability** — Shared styles in `theme/commonStyles.ts`  
✅ **Scalability** — Large screens remain organized with named sections  
