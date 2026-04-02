---
name: flutter-init-project
description: Initialize or reset a Flutter project into a production-ready baseline aligned with this repository's real Flutter projects: manual Riverpod setup, GoRouter routing, Material 3 configuration, shared services, shared widgets, design tokens, and either modular `lib/modules/` scaffolding or a simpler root-level `domain/infrastructure/presentation` structure when the app does not need feature modules. Use when bootstrapping a new project, replacing the default counter app, or standardizing an app foundation before feature development.
---

# Flutter Init Project

Turn a raw Flutter app into a repeatable project foundation that is aligned with your architectural preferences.

## Skill Profile

- Architecture target: Clean Architecture foundation
- State management target: manual Riverpod without code generation
- Navigation target: GoRouter
- UI target: Material 3 with centralized tokens
- Main entry philosophy: minimal `main.dart`
- Project style options:
  - modular apps with `lib/modules/`
  - simpler apps with root `lib/domain`, `lib/infrastructure`, `lib/presentation`
- Dependency policy preserved from previous iteration: `flutter_riverpod`, `go_router`, `google_fonts`
- Skill version preserved from previous iteration: `2.1.0`

## Required Resource Map

Read these reference files before editing project files:

1. [`references/core/workflow.md`](references/core/workflow.md)
   Use for the ordered initialization procedure.
2. [`references/core/rules.md`](references/core/rules.md)
   Use for architectural constraints, dependency limits, and cleanup rules.
3. [`references/core/specs.md`](references/core/specs.md)
   Use for the target directory tree and design-token schema.

Use these template assets as the canonical bootstrap base:

- [`assets/bootstrap-template/pubspec.yaml`](assets/bootstrap-template/pubspec.yaml)
- [`assets/bootstrap-template/lib/config/theme/app_config.dart`](assets/bootstrap-template/lib/config/theme/app_config.dart)
- [`assets/bootstrap-template/lib/config/theme/app_theme.dart`](assets/bootstrap-template/lib/config/theme/app_theme.dart)
- [`assets/bootstrap-template/lib/config/router/app_router.dart`](assets/bootstrap-template/lib/config/router/app_router.dart)
- [`assets/bootstrap-template/lib/config/config.dart`](assets/bootstrap-template/lib/config/config.dart)
- [`assets/bootstrap-template/lib/main.dart`](assets/bootstrap-template/lib/main.dart)

## Operating Procedure

1. Verify project context.
   Confirm the workspace is the root of a Flutter application and inspect the current `pubspec.yaml`.
2. Normalize dependencies.
   Apply the baseline dependency set from [`assets/bootstrap-template/pubspec.yaml`](assets/bootstrap-template/pubspec.yaml).
3. Remove starter boilerplate.
   Replace the default counter app and remove or rewrite the default widget test as appropriate.
4. Scaffold the project structure.
   Create the folders and foundational files from [`references/core/specs.md`](references/core/specs.md).
5. Generate configuration.
   Create design tokens, theme setup, router setup, and the `lib/config/config.dart` barrel.
6. Rebuild the app entry point.
   Keep `main.dart` focused on framework bootstrap, `ProviderScope`, and `MaterialApp.router`.
7. Validate the baseline.
   Run project validation such as `flutter analyze` when the environment permits.

## Non-Negotiable Rules

- Do not introduce Riverpod code generation packages for this bootstrap skill.
- Keep routing logic out of `main.dart`.
- Keep theming logic out of `main.dart`.
- Use tokenized spacing, radius, colors, shadows, durations, and icon sizes instead of magic numbers.
- Create the `lib/config/config.dart` barrel and ensure it exports theme and router modules.
- Use `ThemeData(useMaterial3: true)`.
- Do not force `lib/modules/` into small projects that are clearer with a flatter root architecture.

## Output Expectations

When using this skill, deliver a foundation that is ready for later feature modules:

- `lib/config/` exists and is coherent.
- Either `lib/modules/` exists for modular apps or a flat root architecture exists for small apps.
- `lib/shared/` exists for reusable cross-feature code.
- The entry point is minimal and maintainable.
- The project no longer contains the default Flutter starter structure.
