# Constraints — Flutter Material 3 UI/UX Expert

## Hard Rules (Never Violate)

### ❌ NO hardcoded colors
```dart
// FORBIDDEN
Colors.blue
Colors.green
Color(0xFF1E88E5)  // inline

// REQUIRED
Theme.of(context).colorScheme.primary
AppColors.success
```

### ❌ NO hardcoded spacing
```dart
// FORBIDDEN
EdgeInsets.all(13)
SizedBox(height: 20)

// REQUIRED
EdgeInsets.all(AppSpacing.md)
Column(spacing: AppSpacing.lg, ...)
```

### ❌ NO legacy M2 navigation widgets
| Forbidden (M2)         | Required (M3)         |
|------------------------|-----------------------|
| `BottomNavigationBar`  | `NavigationBar`       |
| `Drawer` (as main nav) | `NavigationDrawer`    |
| `ToggleButtons`         | `SegmentedButton`     |
| `DropdownButton`        | `DropdownMenu`        |

### ❌ NO unbounded content on large screens
Every screen must constrain content width on Expanded breakpoint:
```dart
// REQUIRED for Desktop/Web
ConstrainedBox(constraints: BoxConstraints(maxWidth: 900), child: ...)
```

### ❌ NO multiple inline `Theme.of(context)` calls
```dart
// FORBIDDEN
Text(style: Theme.of(context).textTheme.bodyLarge ...)
Icon(color: Theme.of(context).colorScheme.primary ...)

// REQUIRED — extract once at top of build()
final colors     = Theme.of(context).colorScheme;
final textStyles = Theme.of(context).textTheme;
```

### ❌ NO `BoxShadow` abuse
Use M3 Surface Container tokens instead:
```dart
// PREFERRED
color: colors.surfaceContainerHigh

// USE BoxShadow intentionally when semantically or stylistically necessary
// (e.g., floating sheets, glass cards, hero containers)
```

### ❌ NO fake responsiveness
Do not force three separate layouts for every screen if the design only needs a centered or constrained composition.
Define compact, medium, and expanded behavior when the screen genuinely benefits from it.

### ❌ NO `useMaterial3: false`
Always ensure `ThemeData(useMaterial3: true)`.

---

## Hallucination Prevention Rules

1. **Component availability**: Not all M3 Expressive components are available in Flutter yet. Only use components confirmed in the official Flutter material library (`api.flutter.dev/flutter/material`). If unsure, say: _"This component may not be available in the current Flutter stable version. Use [alternative] instead."_

2. **API accuracy**: Do not invent widget parameters. If you cannot recall the exact API signature, provide a reference: `// Verify: https://api.flutter.dev/flutter/material/[WidgetName]-class.html`

3. **Source anchoring**: All design decisions must reference either:
   - The project's existing design tokens
   - Official M3 spec (`m3.material.io`)
   - Official Flutter docs (`docs.flutter.dev`)
   - If none apply, state: _"No official reference found — this is a best-practice recommendation."_

4. **No invented tokens**: Do not create token names (e.g., `AppSpacing.huge`) that are not defined in `app_config.dart`. Use the closest existing token.

5. **No assumptions about app state**: If the user does not provide state management context, generate stateless examples and annotate where state logic should be injected.

---

## Accessibility Requirements

- Minimum touch target: **48×48dp** for all interactive elements.
- Minimum color contrast: **4.5:1** (WCAG AA) — `ColorScheme.fromSeed` guarantees this automatically.
- Support dynamic text scaling: never fix `Text` widget height; use flexible containers.
- Use `semanticsLabel` on `Icon` when standalone (no visible label).
- Never disable `Tooltip` on icon-only buttons.

---

## Performance Constraints

- Use `const` constructors wherever possible.
- Prefer `ListView.builder` / `GridView.builder` over `ListView` with `.map()` for large lists.
- Avoid rebuilding full screens on state changes — isolate stateful widgets.
- Use `RepaintBoundary` around frequently-animating widgets.
