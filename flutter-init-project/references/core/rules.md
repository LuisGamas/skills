# Rules & Constraints — Flutter Init Project

## Technical Mandates

### 1. No Code Generators for State Management
- **FORBIDDEN**: Do not install `riverpod_annotation`, `riverpod_generator`, or `build_runner`.
- **REQUIRED**: Strictly employ **Manual Riverpod** with current APIs such as `Provider`, `NotifierProvider`, `AsyncNotifierProvider`, and `StreamProvider`.

### 2. Clean Architecture Integrity
- **REQUIRED**: Maintain strict layer separation for every module:
  - `domain/`: Entities, abstract repositories, and abstract datasources.
  - `infrastructure/`: Implementations, data models (DTOs), and mappers.
  - `presentation/`: Screens, widgets, and local state management (Providers/Notifiers).
- **FORBIDDEN**: Never place domain logic or infrastructure implementations inside presentation folders.
- **ALLOWED**: For smaller apps, keep `domain`, `infrastructure`, and `presentation` at the root of `lib/` instead of forcing `lib/modules/`.
- **FORBIDDEN**: Do not force a `usecase` layer if the project does not use one.

### 3. Dependency Management
- **REQUIRED**: Stick ONLY to: `flutter_riverpod`, `go_router`, and `google_fonts`.
- **FORBIDDEN**: Do not install `get_it`, `provider`, `bloc`, or `freezed` unless explicitly requested by the user after initialization.

### 4. Design Token Adherence
- **REQUIRED**: Use exclusively tokens from `AppSpacing`, `AppColors`, `AppRadius`, and `AppShadows`.
- **FORBIDDEN**: No "Magic Numbers" (e.g., `SizedBox(height: 20)`) or literal color hex codes outside of `app_config.dart`.

### 5. Configuration & Main Standards
- `lib/main.dart` must remain minimal: only `ProviderScope` and `MaterialApp.router`.
- **FORBIDDEN**: Do not place routing configurations or thematic logic directly inside `main.dart`.
- **REQUIRED**: Explicitly define `useMaterial3: true` in the `ThemeData`.

### 6. Barrel Files (Encapsulation)
- **REQUIRED**: Create barrel files (`config.dart`, `widgets.dart`) to simplify imports.
- **SPECIFIC**: If you create a `lib/config/config.dart` barrel, ensure it explicitly exports both theme and router configurations (e.g., `export 'theme/app_config.dart';`).
- **RECOMMENDED**: Create `shared_services.dart`, `shared_widgets.dart`, and equivalent barrel files when the app has reusable infrastructure or UI pieces.

### 7. Cleanup
- **REQUIRED**: Always delete the default counter app code in `lib/main.dart` and the associated `test/widget_test.dart`.
