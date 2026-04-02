# Data Schema — Flutter Material 3 UI/UX Expert

## Breakpoint Schema

```typescript
interface Breakpoints {
  compact:  { min: 0,   max: 599  };  // Mobile
  medium:   { min: 600, max: 839  };  // Tablet / Fold
  expanded: { min: 840, max: 1399 };  // Desktop / Web
  // Content max-width on Expanded: 900–1200dp depending on layout
}
```

Declare in `lib/config/constants/environment.dart`:

```dart
class AppBreakpoints {
  AppBreakpoints._();
  static const double compact  = 600.0;
  static const double medium   = 840.0;
  static const double maxWidth = 900.0;  // Content clamp on expanded
}
```

---

## Design Token Schema

```typescript
interface DesignTokens {
  // ── Spacing ──────────────────────────────────────
  spacing: {
    xxxs?: 2, xxs: 4,  xs: 4 | 6, sm: 8, md: 16,
    lg:  24, xl: 32,  xxl: 48, xxxl: 64
  };

  // ── Border Radius ──────────────────────────────────
  radius: {
    xs: 8 | 4, sm: 12 | 8, md: 16 | 12, lg: 28 | 16,
    xl: 32 | 24, xxl: 48 | 32, full: 9999
  };

  // ── Duration ──────────────────────────────────────
  duration: {
    fast:   150,  // ms — micro-interactions
    normal: 250,  // ms — standard transitions
    slow:   400   // ms — complex animations
  };

  // ── Icon Sizes ────────────────────────────────────
  iconSize: {
    xxxs?: 12, xxs: 14 | 16, xs: 16 | 18, sm: 20, md: 24,
    lg: 28 | 32,  xl: 40 | 48, xxl: 48 | 64
  };
}
```

---

## Color Token Schema (Material 3 Semantic)

Material 3 generates these automatically via `ColorScheme.fromSeed`. Query them via `Theme.of(context).colorScheme.*`:

```typescript
interface M3ColorScheme {
  // Primary brand
  primary: Color;          onPrimary: Color;
  primaryContainer: Color; onPrimaryContainer: Color;

  // Secondary / Tonal
  secondary: Color;        onSecondary: Color;
  secondaryContainer: Color; onSecondaryContainer: Color;

  // Tertiary accent
  tertiary: Color;         onTertiary: Color;
  tertiaryContainer: Color; onTertiaryContainer: Color;

  // Error states
  error: Color;            onError: Color;
  errorContainer: Color;   onErrorContainer: Color;

  // Surfaces (prefer over hardcoded background)
  surface: Color;          onSurface: Color;
  surfaceDim: Color;       surfaceBright: Color;
  surfaceContainerLowest: Color;
  surfaceContainerLow: Color;
  surfaceContainer: Color;
  surfaceContainerHigh: Color;
  surfaceContainerHighest: Color;

  // Utility
  outline: Color;
  outlineVariant: Color;
  shadow: Color;
  scrim: Color;
  inverseSurface: Color;   onInverseSurface: Color;
  inversePrimary: Color;
}
```

**Rule**: Always prefer M3 semantic tokens. Use `AppColors.*` only for states not covered by M3 (success, warning, info).

---

## Typography Token Schema

```typescript
interface M3Typography {
  displayLarge:   TextStyle;  // Largest display text
  displayMedium:  TextStyle;
  displaySmall:   TextStyle;
  headlineLarge:  TextStyle;  // Section titles
  headlineMedium: TextStyle;
  headlineSmall:  TextStyle;
  titleLarge:     TextStyle;  // Card / dialog titles
  titleMedium:    TextStyle;
  titleSmall:     TextStyle;
  bodyLarge:      TextStyle;  // Primary body content
  bodyMedium:     TextStyle;
  bodySmall:      TextStyle;
  labelLarge:     TextStyle;  // Button labels
  labelMedium:    TextStyle;
  labelSmall:     TextStyle;  // Captions, chips
}
// Access via: Theme.of(context).textTheme.*
```

---

## Component Flutter Availability Matrix

> ⚠️ Not all Material 3 Expressive components are available in Flutter stable.

| M3 Component       | Flutter Widget               | Status         |
|--------------------|------------------------------|----------------|
| Navigation bar     | `NavigationBar`              | ✅ Stable      |
| Navigation rail    | `NavigationRail`             | ✅ Stable      |
| Navigation drawer  | `NavigationDrawer`           | ✅ Stable      |
| Top app bar        | `AppBar` / `SliverAppBar`    | ✅ Stable      |
| Filled button      | `FilledButton`               | ✅ Stable      |
| Tonal button       | `FilledButton.tonal`         | ✅ Stable      |
| Outlined button    | `OutlinedButton`             | ✅ Stable      |
| Text button        | `TextButton`                 | ✅ Stable      |
| FAB (standard / small / large) | `FloatingActionButton` / `FloatingActionButton.small` / `FloatingActionButton.large` | ✅ Stable |
| FAB extended       | `FloatingActionButton.extended` | ✅ Stable — includes icon + label, M3 squircle shape |
| Icon button        | `IconButton.filled/outlined` | ✅ Stable      |
| Segmented button   | `SegmentedButton<T>`         | ✅ Stable      |
| Chips (all types)  | `ActionChip / FilterChip / ChoiceChip / InputChip` | ✅ Stable |
| Switch             | `Switch`                     | ✅ Stable      |
| Checkbox           | `Checkbox`                   | ✅ Stable      |
| Radio              | `Radio<T>`                   | ✅ Stable      |
| Slider             | `Slider`                     | ✅ Stable      |
| Text field         | `TextField`                  | ✅ Stable      |
| Search             | `SearchBar` + `SearchAnchor` | ✅ Stable      |
| Dropdown menu      | `DropdownMenu<T>`            | ✅ Stable      |
| Card variants      | `Card` / `Card.filled` / `Card.elevated` / `Card.outlined` | ✅ Stable |
| List tile          | `ListTile`                   | ✅ Stable      |
| Tabs               | `TabBar` / `TabBar.secondary` | ✅ Stable     |
| Dialog             | `AlertDialog` / `Dialog.fullscreen` | ✅ Stable |
| Date/Time picker   | `showDatePicker` / `showTimePicker` | ✅ Stable |
| Snackbar           | `SnackBar`                   | ✅ Stable      |
| Tooltip            | `Tooltip`                    | ✅ Stable      |
| Progress           | `CircularProgressIndicator` / `LinearProgressIndicator` | ✅ Stable |
| Menu               | `MenuAnchor`                 | ✅ Stable      |
| Bottom sheet       | `showModalBottomSheet`       | ✅ Stable      |
| Carousel           | `CarouselView`               | ✅ Stable (Flutter 3.28+) — native M3 carousel with `shrinkExtent` control |
| Divider            | `Divider` / `VerticalDivider` | ✅ Stable — M3 compliant, uses `colors.outlineVariant` automatically |
| Expressive variants | Various (Spring animations) | ⚠️ Partial — verify at api.flutter.dev before use |

---

## Responsive Layout Pattern Schema

```typescript
interface ResponsiveLayout {
  compact: {
    navigation: "NavigationBar";   // bottom
    grid:       "1 column (list) or 2";
    dialog:     "Dialog.fullscreen";
    fab:        "standard | extended";
  };
  medium: {
    navigation: "NavigationRail"; // side
    grid:       "2–4 columns";
    dialog:     "AlertDialog (modal)";
    fab:        "standard | extended (top of rail)";
  };
  expanded: {
    navigation: "NavigationDrawer"; // permanent side
    grid:       "4–12 columns";
    dialog:     "AlertDialog (modal)";
    fab:        "none or extended in drawer";
    maxWidth:   "≤ 900dp content area";
  };
}
```

## Expressive Surface Pattern

Some screens in the reference projects intentionally combine:

- translucent surfaces
- blur filters
- borders with `outlineVariant`
- tokenized shadows
- centered constrained cards

Use this style when the screen is a focused entry point such as login, onboarding, or an emphasized detail surface.

---

## Animation Token Schema

```typescript
interface M3Animations {
  curves: {
    standard:           "Curves.easeInOut";
    emphasized:         "Curves.easeInOutCubicEmphasized"; // M3 emphasized
    emphasizedDecel:    "Curves.easeOutCubic";
    emphasizedAccel:    "Curves.easeInCubic";
  };
  durations: {
    short1: 50,   short2: 100,  short3: 150,  short4: 200,
    medium1: 250, medium2: 300, medium3: 350, medium4: 400,
    long1: 450,   long2: 500,
  };
}
// Map to AppDurations.fast(150) / normal(250) / slow(400)
```
