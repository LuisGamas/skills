# Architecture & Core Logic — Flutter Clean Architecture

## Tone
Imperative. Direct. No fluff. Generate clean, typed, and testable code that matches the project's real structure.

---

## Workflow
When the user requests to create or refactor a feature, first decide which of these two project styles fits the existing codebase:

1. **Modular feature style**
   Use `lib/modules/<feature_name>/domain`, `infrastructure`, and `presentation` when the app already works feature-by-feature.
2. **Flat project style**
   Use root-level `lib/domain`, `lib/infrastructure`, and `lib/presentation` when the app is smaller and does not need per-feature slicing.

Do not force the modular variant when the project already follows a flatter structure similar to `kreator_frame-main`.

---

## Creation Order
When the user requests to create or refactor a modular feature:

### 1. Planning
- Define the full folder structure for the feature.
- Identify required entities, datasources, repositories, providers, and supporting shared services.
- Confirm if remote, local, or both datasources are needed.
- Decide whether remote and local concerns should live behind one repository or two separate repositories/providers.

### 2. Creation Order
Generate files strictly in this order:

**Domain (First — No Flutter UI Dependencies):**
1. Entities (`domain/entities/`)
2. Abstract Repositories (`domain/repositories/`)
3. Abstract DataSources (`domain/datasources/`)
4. Barrel file (`domain/feature_domain.dart`)

**Infrastructure (Second — Implements Domain):**
1. Models/DTOs (`infrastructure/models/`)
2. Mappers (`infrastructure/mappers/`)
3. Errors/Failures (`infrastructure/errors/`)
4. DataSource implementations (`infrastructure/datasources/`)
5. Repository implementations (`infrastructure/repositories/`)
6. Barrel file (`infrastructure/feature_infrastructure.dart`)

**Presentation (Third — Consumes Domain via DI):**
1. Providers (`presentation/providers/`)
2. Additional state, operations, form, or router providers (`presentation/providers/`)
3. Widgets (`presentation/widgets/`)
4. Screens (`presentation/screens/`)
5. Barrel file (`presentation/feature_presentation.dart`)

### 3. Dependency Injection
Preferred chain:

```text
ExternalService → DataSource → Repository → Provider/Notifier
```

Common real variants from the reference projects:

```text
Firebase/Functions/Firestore → DataSource → Repository → Provider/Notifier
IsarLocalDataSource → LocalStorageRepository → Provider/Notifier
Firebase Auth Stream → StreamProvider → AuthState Notifier / GoRouter bridge
Repository → Notifier for state
Repository → Notifier for operations
```

### 4. Verification
Execute the checklist in `constraints.md` before delivering code.

---

## Folder Structure

### Modular app
```text
lib/
├── config/
│   ├── constants/
│   ├── router/
│   └── theme/
│
├── modules/
│   └── feature_name/
│       ├── domain/
│       │   ├── datasources/
│       │   ├── entities/
│       │   ├── repositories/
│       │   └── feature_domain.dart
│       │
│       ├── infrastructure/
│       │   ├── datasources/
│       │   ├── errors/
│       │   ├── mappers/
│       │   ├── models/
│       │   ├── repositories/
│       │   └── feature_infrastructure.dart
│       │
│       └── presentation/
│           ├── providers/
│           ├── screens/
│           ├── widgets/
│           └── feature_presentation.dart
│
├── shared/
│   ├── exceptions/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── widgets/
│
└── main.dart
```

### Flat app
```text
lib/
├── config/
├── domain/
│   ├── datasources/
│   ├── entities/
│   ├── repositories/
│   └── domain.dart
├── infrastructure/
│   ├── datasources/
│   ├── mappers/
│   ├── models/
│   ├── repositories/
│   └── infrastructure.dart
├── presentation/
│   ├── providers/
│   ├── screens/
│   ├── widgets/
│   └── presentation.dart
├── shared/
└── main.dart
```

---

## Layer Patterns

### Domain — Entities
Pure business objects. Immutable. Pure Dart only.

**Isar strategy used in the reference projects:** the entity may also be the Isar schema when local persistence benefits from it.

```dart
import 'package:isar/isar.dart';

part 'wallpaper_entity.g.dart';

@collection
class WallpaperEntity {
  Id isarId = Isar.autoIncrement;
  final String id;
  final String category;
  final String name;
  final String url;

  WallpaperEntity({
    required this.id,
    required this.category,
    required this.name,
    required this.url,
  });

  WallpaperEntity copyWith({
    String? id,
    String? category,
    String? name,
    String? url,
  }) {
    return WallpaperEntity(
      id: id ?? this.id,
      category: category ?? this.category,
      name: name ?? this.name,
      url: url ?? this.url,
    );
  }
}
```

### Infrastructure — Models (DTO)
External data representation. Keep models separate when the remote payload can change independently from the entity or local database shape.

```dart
class WallpaperModel {
  final String id;
  final String category;
  final DateTime createdAt;
  final bool isPremium;
  final String name;
  final int position;
  final List<String> tags;
  final String url;

  const WallpaperModel({
    required this.id,
    required this.category,
    required this.createdAt,
    required this.isPremium,
    required this.name,
    required this.position,
    required this.tags,
    required this.url,
  });
}
```

### Infrastructure — Mappers
Use explicit mappers to keep entities stable even if the remote payload changes.

```dart
class WallpaperMapper {
  static WallpaperEntity mapModelToEntity(WallpaperModel model) {
    return WallpaperEntity(
      id: model.id,
      category: model.category,
      name: model.name,
      url: model.url,
    );
  }
}
```

### Infrastructure — Repository Implementation
Usually delegate directly to one datasource. Combine remote + local only when the feature truly needs a single offline-first orchestration point.

```dart
class AuthRepositoryImpl extends AuthRepository {
  final AuthDataSource dataSource;

  AuthRepositoryImpl({required this.dataSource});

  @override
  Future<UserLoggedEntity> loginWithEmail(String email, String password) {
    return dataSource.loginWithEmail(email, password);
  }
}
```

### Presentation — Providers & Notifiers
Expose datasource providers, repository providers, and separate state or operations providers when the feature benefits from it.

```dart
final authDataSourceProvider = Provider<AuthDataSource>((ref) {
  final firebaseAuth = ref.watch(firebaseAuthProvider);
  final userDataSource = ref.watch(userDataSourceProvider);

  return AuthDataSourceImpl(
    firebaseAuth: firebaseAuth,
    userDataSource: userDataSource,
  );
});

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final dataSource = ref.watch(authDataSourceProvider);
  return AuthRepositoryImpl(dataSource: dataSource);
});

class AuthOperationsNotifier extends Notifier<AuthOperationState> {
  @override
  AuthOperationState build() => const AuthOperationState();

  Future<void> loginWithEmail(String email, String password) async {
    final repository = ref.read(authRepositoryProvider);
    await repository.loginWithEmail(email, password);
  }
}
```

---

## Real Project Guidance

- Prefer domain barrels that export datasources, entities, repositories, and result objects.
- Use separate providers when auth state, auth operations, auth stream, and router refresh should not be coupled into one notifier.
- Use repository providers and datasource providers as explicit public composition points.
- When local persistence is independent enough, expose a dedicated local storage repository/provider instead of hiding it behind a remote repository.
- For Firebase + web CORS-sensitive integrations, prefer Firebase Functions middleware as the remote datasource boundary when the project already follows that pattern.

## Isar Pattern

When the project follows the `wallium-main` style:

- Keep entities as Isar collections.
- Keep remote models separate from entities.
- Use mappers to adapt unstable remote payloads into stable entities.
- Let models absorb web/API shape changes so entities and local storage remain consistent.
