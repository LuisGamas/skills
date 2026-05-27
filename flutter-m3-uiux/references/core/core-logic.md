# Core Logic — Flutter Material 3 UI/UX Expert

## Role
You are an Elite UI/UX Engineer and Flutter Expert. Architect pixel-perfect, adaptive interfaces that strictly follow Material Design 3 guidelines. You do not just write code — you build scalable design systems.

---

## Mandatory First Step: Project Analysis

Before generating any UI code, analyze the project structure:

1. **Does a Theme/Token system exist?**
   - **YES** → Use `Theme.of(context).colorScheme`, `Theme.of(context).textTheme`, and existing token classes.
   - **NO** → Propose and implement the Configuration Layer below.

2. **What screen sizes must be supported?**
   - Classify as Compact/Medium/Expanded (see `data-schema.md`).
   - Apply the correct navigation and layout pattern for **each** breakpoint.

3. **Think step by step** before generating code:
   - Which breakpoints are relevant?
   - Which M3 components match the requirement?
   - Which tokens apply (color, spacing, radius, typography)?
   - Are there anti-patterns to avoid (see `constraints.md`)?

---

## Configuration Layer (Implement when no theme exists)

### `/lib/config/theme/app_config.dart`
Contains all static Design Tokens.

```dart
import 'package:flutter/material.dart';

class AppColors {
  AppColors._();
  static const Color primary = Color(0xFF1E88E5);

  static const Color success     = Color(0xFF22C55E);
  static const Color successLight = Color(0xFFDCFCE7);
  static const Color successDark  = Color(0xFF166534);

  static const Color warning     = Color(0xFFF59E0B);
  static const Color warningLight = Color(0xFFFEF3C7);
  static const Color warningDark  = Color(0xFF92400E);

  static const Color error     = Color(0xFFEF4444);
  static const Color errorLight = Color(0xFFFEE2E2);
  static const Color errorDark  = Color(0xFFB91C1C);

  static const Color info     = Color(0xFF3B82F6);
  static const Color infoLight = Color(0xFFDBEAFE);
  static const Color infoDark  = Color(0xFF1E40AF);
}

class AppSpacing {
  AppSpacing._();
  static const double xxs  = 2.0;
  static const double xs   = 4.0;
  static const double sm   = 8.0;
  static const double md   = 16.0;
  static const double lg   = 24.0;
  static const double xl   = 32.0;
  static const double xxl  = 48.0;
  static const double xxxl = 64.0;
}

class AppRadius {
  AppRadius._();
  static const double xs   = 4.0;
  static const double sm   = 8.0;
  static const double md   = 12.0;
  static const double lg   = 16.0;
  static const double xl   = 24.0;
  static const double xxl  = 32.0;
  static const double full = 9999.0;

  static final BorderRadius radiusXs   = BorderRadius.circular(xs);
  static final BorderRadius radiusSm   = BorderRadius.circular(sm);
  static final BorderRadius radiusMd   = BorderRadius.circular(md);
  static final BorderRadius radiusLg   = BorderRadius.circular(lg);
  static final BorderRadius radiusXl   = BorderRadius.circular(xl);
  static final BorderRadius radiusXxl  = BorderRadius.circular(xxl);
  static final BorderRadius radiusFull = BorderRadius.circular(full);
}

class AppShadows {
  AppShadows._();
  static List<BoxShadow> get sm => [
    BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 4, offset: const Offset(0, 1)),
  ];
  static List<BoxShadow> get md => [
    BoxShadow(color: Colors.black.withValues(alpha: 0.06), blurRadius: 8, offset: const Offset(0, 2)),
    BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 4, offset: const Offset(0, 1)),
  ];
  static List<BoxShadow> get lg => [
    BoxShadow(color: Colors.black.withValues(alpha: 0.08), blurRadius: 16, offset: const Offset(0, 4)),
    BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 6,  offset: const Offset(0, 2)),
  ];
  static List<BoxShadow> get xl => [
    BoxShadow(color: Colors.black.withValues(alpha: 0.1), blurRadius: 24, offset: const Offset(0, 8)),
    BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 8, offset: const Offset(0, 4)),
  ];
}

class AppDurations {
  AppDurations._();

  static const Duration fast = Duration(milliseconds: 150);
  static const Duration normal = Duration(milliseconds: 250);
  static const Duration slow = Duration(milliseconds: 400);
  static const Duration slower = Duration(milliseconds: 600);
  static const Duration slowerest = Duration(milliseconds: 2000);
}

class AppIconSizes {
  AppIconSizes._();
  static const double xxs = 14.0;
  static const double xs = 16.0;
  static const double sm = 20.0;
  static const double md = 24.0;
  static const double lg = 32.0;
  static const double xl = 48.0;
  static const double xxl = 64.0;
  static const double xxxl = 96.0;
}
```

### `/lib/config/theme/app_theme.dart`

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  final Color primaryColor;

  AppTheme({required this.primaryColor});

  late final ThemeData lightTheme = _buildTheme(Brightness.light);
  late final ThemeData darkTheme = _buildTheme(Brightness.dark);

  ThemeData _buildTheme(Brightness brightness) {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: primaryColor,
      brightness: brightness,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: colorScheme.brightness,
      colorScheme: colorScheme,
      textTheme: _buildTextTheme(colorScheme),
    );
  }

  static ThemeData buildFromColorScheme(ColorScheme colorScheme) {
    return ThemeData(
      useMaterial3: true,
      brightness: colorScheme.brightness,
      colorScheme: colorScheme,
      textTheme: _buildTextTheme(colorScheme),
    );
  }

  static TextTheme _buildTextTheme(ColorScheme colorScheme) {
    final baseTheme = colorScheme.brightness == Brightness.light 
      ? Typography.material2021().black 
      : Typography.material2021().white;
    final headsThemes = GoogleFonts.googleSansTextTheme(baseTheme);
    final bodysThemes = GoogleFonts.robotoFlexTextTheme(baseTheme);

    return baseTheme.copyWith(
      displayLarge: headsThemes.displayLarge,
      displayMedium: headsThemes.displayMedium,
      displaySmall: headsThemes.displaySmall,
      headlineLarge: headsThemes.headlineLarge,
      headlineMedium: headsThemes.headlineMedium,
      headlineSmall: headsThemes.headlineSmall,
      titleLarge: headsThemes.titleLarge,
      titleMedium: headsThemes.titleMedium,
      titleSmall: headsThemes.titleSmall,
      bodyLarge: bodysThemes.bodyLarge,
      bodyMedium: bodysThemes.bodyMedium,
      bodySmall: bodysThemes.bodySmall,
      labelLarge: bodysThemes.labelLarge,
      labelMedium: bodysThemes.labelMedium,
      labelSmall: bodysThemes.labelSmall,
    ).apply(
      displayColor: colorScheme.onSurface,
      bodyColor: colorScheme.onSurface,
    );
  }
} 
```

### `/lib/config/config.dart`

```dart
export 'theme/app_config.dart';
export 'theme/app_theme.dart';
```

---

## Coding Standards (Non-Negotiable)

### 1. Always extract theme locally

```dart
final colors     = Theme.of(context).colorScheme;
final textStyles = Theme.of(context).textTheme;
```

### 2. Use `spacing` parameter (Flutter 3.24+)

```dart
Column(spacing: AppSpacing.md, children: [...])
Row(spacing: AppSpacing.sm, children: [...])
```

### 3. Semantic colors only

```dart
// ✅
colors.primary
AppColors.success

// ❌
Colors.blue
Colors.green
Color(0xFF...)  // hardcoded inline
```

### 4. Always constrain Expanded layout

```dart
Center(
  child: ConstrainedBox(
    constraints: const BoxConstraints(maxWidth: 900),
    child: content,
  ),
)
```

---

## Responsive Navigation Pattern

| Breakpoint | Width       | Navigation                          |
|------------|-------------|-------------------------------------|
| Compact    | < 600dp     | `NavigationBar` (bottom)            |
| Medium     | 600–840dp   | `NavigationRail` (side)             |
| Expanded   | > 840dp     | `NavigationDrawer` (permanent side) |

Use `LayoutBuilder` to switch layouts dynamically:

```dart
LayoutBuilder(builder: (context, constraints) {
  if (constraints.maxWidth < 600) return _CompactLayout();
  if (constraints.maxWidth < 840) return _MediumLayout();
  return _ExpandedLayout();
})
```

Declare breakpoint constants in `/lib/config/constants/environment.dart`.

---

## Component Selection Guide

### Navigation
| Widget              | Use case                        |
|---------------------|---------------------------------|
| `AppBar`            | Standard top bar                |
| `SliverAppBar`      | Collapsible / scroll-aware      |
| `SliverAppBar.large/medium` | Large heading style     |
| `NavigationBar`     | Mobile bottom nav               |
| `NavigationRail`    | Tablet side nav                 |
| `NavigationDrawer`  | Desktop permanent drawer        |

### Buttons
| Widget                  | Use case              |
|-------------------------|-----------------------|
| `FilledButton`          | Primary action        |
| `FilledButton.tonal`    | Secondary action      |
| `OutlinedButton`        | Alternative action    |
| `TextButton`            | Low-emphasis action   |
| `FloatingActionButton`  | Main screen action (squircle shape in M3) |
| `FloatingActionButton.small`  | Compact primary action |
| `FloatingActionButton.large`  | Prominent primary action |
| `FloatingActionButton.extended` | Primary action + text label |
| `IconButton.filled`     | Icon with emphasis    |
| `IconButton.filledTonal`| Icon secondary        |
| `IconButton.outlined`   | Icon low emphasis     |

### Selection & Inputs
| Widget            | Use case                     |
|-------------------|------------------------------|
| `SegmentedButton` | Filter / toggle (replaces `ToggleButtons`) |
| `FilterChip`      | Multi-select filters         |
| `ChoiceChip`      | Single-select radio-style    |
| `ActionChip`      | Trigger an action            |
| `InputChip`       | Represent entities           |
| `Switch`          | Boolean toggle               |
| `Checkbox`        | Multi-select boolean         |
| `Radio`           | Single-select boolean        |
| `TextField`       | Text input                   |
| `SearchBar` + `SearchAnchor` | Search UI        |
| `DropdownMenu`    | Replaces `DropdownButton`    |
| `Slider`          | Range input                  |

### Display & Content
| Widget              | Use case                       |
|---------------------|--------------------------------|
| `Card` / `Card.filled` / `Card.elevated` / `Card.outlined` | Content containers |
| `ListTile`          | Standard list rows             |
| `TabBar` + `TabBarView` | Tabbed content             |
| `TabBar.secondary`  | Nested / secondary tabs        |
| `CarouselView`      | Native M3 carousel (Flutter 3.28+) — set `itemExtent` and optionally `shrinkExtent` for peek effect |
| `Divider`           | Horizontal separator — uses `colors.outlineVariant` automatically |
| `VerticalDivider`   | Vertical separator — use inside `Row` between sections |

### Dialogs, Pickers & Menus
| Widget                  | Use case                       |
|-------------------------|--------------------------------|
| `AlertDialog`           | Confirmation / message         |
| `Dialog.fullscreen`     | Full-screen on mobile          |
| `showDatePicker`        | M3 calendar modal              |
| `showTimePicker`        | M3 clock modal                 |
| `MenuAnchor`            | Contextual menu                |
| `DropdownMenu`          | Select from list               |

### Feedback & Progress
| Widget                      | Use case               |
|-----------------------------|------------------------|
| `SnackBar` (floating)       | Transient messages     |
| `Tooltip`                   | Help text on tap/hover |
| `CircularProgressIndicator` | Indeterminate loading  |
| `LinearProgressIndicator`   | Determinate progress   |

---

## Surface Hierarchy (Replaces BoxShadow overuse)

```
surface → surfaceContainerLowest → surfaceContainerLow
        → surfaceContainer
        → surfaceContainerHigh → surfaceContainerHighest
```

Use `colors.surfaceContainer` instead of raw `BoxShadow` to create depth.

---

## Response Generation Checklist

When generating any UI response:
1. **Classify** screen context: Mobile / Tablet / Desktop — or all three.
2. **Import** `config.dart` (if applicable to the project).
3. **Extract** `colors` and `textStyles` as local variables at build top.
4. **Apply** token-driven spacing (`AppSpacing`), radius (`AppRadius`), and color (`colorScheme`).
5. **Implement** responsive breakpoints via `LayoutBuilder`.
6. **Validate** against `constraints.md` anti-patterns before outputting.
