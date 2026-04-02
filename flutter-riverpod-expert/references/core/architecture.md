# Architecture & Design Patterns — Riverpod 3.x

## 1. Injection Chain (Repository Pattern)

Implement the following flow for all features, but keep local and remote concerns separable when the project already does so:

```text
SERVICES (shared/services/)
    ↓ Provider<T> (Dio, SharedPreferences, Isar)
DATASOURCE (infrastructure/)
    ↓ ref.watch() injects services
REPOSITORY (infrastructure/)
    ↓ ref.watch() injects datasources
NOTIFIER (presentation/)
    ↓ ref.read() injects repositories (in mutation methods)
    ↓ ref.watch() injects repositories (in build method)
UI WIDGET (presentation/screens/)
    ↓ ref.watch() observes notifiers
```

Common real-world variants from the reference projects:

```text
StreamProvider<User?> → AuthStateNotifier
StreamProvider<User?> → GoRouter ChangeNotifier bridge
RepositoryProvider → AuthOperationsNotifier
RepositoryProvider → AsyncNotifier.family for remote collections
LocalStorageRepositoryProvider → local persistence providers
```

---

## 2. Widget Type Selection

| Widget Type | Use Case |
|---|---|
| `ConsumerWidget` | **Default.** Pure UI, no internal state, no controllers. |
| `ConsumerStatefulWidget` | Use ONLY for: `TextEditingController`, `ScrollController`, `AnimationController`, `FocusNode`, `initState/dispose` lifecycle. |

---

## 3. Notifier Mutability Pattern

Always use **Immutable State** with `AsyncValue.guard()` for async operations:

```dart
class MyNotifier extends AsyncNotifier<T> {
  @override
  Future<T> build() async => ref.watch(repoProvider).fetch();

  Future<void> update() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await ref.read(repoProvider).update();
      return await ref.read(repoProvider).fetch();
    });
  }
}
```

---

## 4. Personal Riverpod Structure

Prefer splitting providers by responsibility:

- datasource providers
- repository providers
- auth stream or status providers
- operation providers
- state synchronization providers
- form providers
- router bridge providers

Do not force everything into one notifier if the feature becomes less understandable.

---

## 5. Router Bridge Pattern

When route refresh must follow auth changes immediately, a dedicated `ChangeNotifier` bridge is acceptable:

```dart
class GoRouterNotifier extends ChangeNotifier {
  final Ref ref;

  GoRouterNotifier(this.ref) {
    ref.listen(authStateStreamProvider, (previous, next) {
      notifyListeners();
    }, fireImmediately: true);
  }
}
```

Use this only for framework interoperability such as `GoRouter.refreshListenable`, not as a general application state pattern.

---

## 6. Testing (Riverpod 3.0)

### Provider Container
Always use `ProviderContainer.test()` for unit tests to ensure proper disposal.

```dart
final container = ProviderContainer.test(
  overrides: [
    repoProvider.overrideWithValue(MockRepo()),
  ],
);
```

### Partial Notifier Overrides
Use `overrideWithBuild` to only mock the initialization while keeping the original mutation methods for testing.

```dart
counterProvider.overrideWithBuild((ref) => 42); // Initial state mocked
```

### Widget Test Access
Access the container directly from the tester:
```dart
final container = tester.container;
```
