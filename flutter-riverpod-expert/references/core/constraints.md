# Constraints & Negation Rules — Riverpod 3.x

## 1. BANNED APIs (NEVER USE)

| Banned API | Replacement | Import if Legacy Needed |
|------------|-------------|------------------------|
| `StateProvider` | `NotifierProvider` | `package:riverpod/legacy.dart` |
| `StateNotifier` | `Notifier` | `package:riverpod/legacy.dart` |
| `StateNotifierProvider` | `NotifierProvider` | `package:riverpod/legacy.dart` |
| `ChangeNotifier` | `AsyncNotifier` / `Notifier` in app state, or dedicated router bridge when integrating `GoRouter` | `package:riverpod/legacy.dart` |
| `ChangeNotifierProvider` | `AsyncNotifierProvider` / `NotifierProvider` | `package:riverpod/legacy.dart` |
| `AutoDisposeNotifier` | `Notifier` (unified in 3.0) | N/A |
| `AutoDisposeAsyncNotifier` | `AsyncNotifier` (unified in 3.0) | N/A |
| `AutoDisposeRef` | `Ref` (unified in 3.0) | N/A |
| `FamilyNotifier` | `Notifier` with constructor+field | N/A |
| `AutoDisposeFamilyNotifier` | `Notifier` with constructor+field | N/A |
| `ExampleRef` (generated) | `Ref` (unified in 3.0) | N/A |

**CRITICAL:** If user code contains any banned API → migrate it immediately. Never generate new code using these.

---

## 2. DO / DON'T (Official Guidelines)

### Initialization
- **AVOID:** Initializing providers in a widget's `initState()`.
- **DO:** Initialize in `build()` or trigger via user actions (e.g., `onPressed`).
- **DON'T:** Perform side effects (POST/PUT/DELETE) during provider initialization. Use `AsyncValue.guard()` in methods.

### State Management
- **AVOID:** Using providers for ephemeral state (controllers, form state, animations). Use `flutter_hooks` or standard Flutter controllers.
- **DO:** Use top-level `final` providers. Never create providers inside classes or methods.
- **DON'T:** Use `ref.read()` in `build()`. This is a bug that prevents rebuilds. Always use `ref.watch()` or `ref.select()`.
- **DO:** Split providers by concern when needed: stream state, auth state sync, operations, forms, router bridge.

### Data Integrity
- **DO:** Use immutable entities with `copyWith`. Never use mutable state objects.
- **DON'T:** Use `Map<String, dynamic>` as state. Always use a typed data class.
- **DO:** Check `ref.mounted` after any async `await` operation in a Notifier.

---

## 3. ANTI-PATTERNS

### UI Logic in Repository
- **DON'T:** Put navigation logic or snackbars in a Repository.
- **DO:** Repository returns data/throws; UI handles navigation based on the result.

### Resource Leaks
- **DO:** Always dispose resources (WebSockets, DB connections) in `ref.onDispose()`.

### Router Integration
- **ALLOW:** A `ChangeNotifier` bridge for `GoRouter.refreshListenable` when the project uses auth-driven redirects.
- **DON'T:** Use `ChangeNotifier` as the default application state solution.

### Hallucination Guard
- If an API or pattern is not documented in the modules, respond: **"That API is not in my reference data for Riverpod 3.x. Please verify in the official docs."**
- Never invent Riverpod APIs. If uncertain, say so.
