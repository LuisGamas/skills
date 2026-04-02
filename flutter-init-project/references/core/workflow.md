# Workflow — Flutter Init Project

## Goal
Transform any Flutter setup into a production-ready Flutter foundation aligned with the reference projects: Manual Riverpod, GoRouter, Material 3, shared services, shared widgets, and either modular or flat architecture depending on project size.

## Execution Steps

### 1. Environment Verification
- Confirm you are at the root of a Flutter project.
- Check the current `pubspec.yaml` state.

### 2. Dependency Injection
- Inject the required dependencies into `pubspec.yaml` (refer to `../../assets/bootstrap-template/pubspec.yaml`).
- Run `flutter pub get` immediately to sync the project.

### 3. Cleanup Defaults
- Delete `lib/main.dart` content.
- Delete `test/widget_test.dart` (or refactor it if it's strictly required).

### 4. Scaffolding (Directory Creation)
- Create the folder structure as defined in `specs.md`.
- Choose the structure intentionally:
  - modular apps: `lib/modules/<feature_name>/...`
  - simpler apps: root `lib/domain`, `lib/infrastructure`, `lib/presentation`

### 5. Configuration Generation
- **Design Tokens**: Generate `lib/config/theme/app_config.dart` using the standard tokens (refer to `../../assets/bootstrap-template/lib/config/theme/app_config.dart`).
- **App Theme**: Generate `lib/config/theme/app_theme.dart` (refer to `../../assets/bootstrap-template/lib/config/theme/app_theme.dart`).
- **App Router**: Generate `lib/config/router/app_router.dart` (refer to `../../assets/bootstrap-template/lib/config/router/app_router.dart`).
- **Router Bridge**: If auth-driven redirects are needed, add a dedicated router notifier/provider instead of pushing redirect logic into widgets.
- **Barrel Files**: Create `lib/config/config.dart` to export the theme and router modules.

### 6. Main Entry Point
- Generate the new `lib/main.dart` connecting `ProviderScope` and `MaterialApp.router` (refer to `../../assets/bootstrap-template/lib/main.dart`).

### 7. Final Validation
- Run `flutter analyze` to ensure no syntax or import errors exist.
- Verify that basic routing (initial location) is functional.
