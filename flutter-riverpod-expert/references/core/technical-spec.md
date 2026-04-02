# Technical Specification — Riverpod APIs

## 1. Provider Core Signatures

| Provider Type | Use Case | Async? | Manual Signature |
|---|---|---|---|
| `Provider<T>` | Immutable/computed/dependency injection | No | `Provider<T>((ref) => ...)` |
| `NotifierProvider<N,T>` | Sync state + mutations | No | `NotifierProvider<N,T>(N.new)` |
| `AsyncNotifierProvider<N,T>` | Async state + mutations | **Yes** | `AsyncNotifierProvider<N,T>(N.new)` |
| `StreamProvider<T>` | Real-time/auth streams | **Yes** | `StreamProvider<T>((ref) => ...)` |

---

## 2. Ref API Reference (Unified 3.0)

| Method | Purpose | Use In | Triggers Rebuild? |
|---|---|---|---|
| `ref.watch(provider)` | Subscribe to state | `build()` | **YES** |
| `ref.read(provider)` | One-time read | Methods | NO |
| `ref.read(p.notifier)` | Access Notifier | Methods | NO |
| `ref.select((s) => s.f)`| Field optimization | `build()` | **If field changes** |
| `ref.listen(p, cb)` | Side effects | `build()` | NO |
| `ref.invalidate(p)` | Force refresh | Any | Triggers rebuild |
| `ref.mounted` | Check if alive | After async | N/A |
| `ref.keepAlive()` | Prevent disposal | `build()` | N/A |

---

## 3. AsyncValue API

```dart
// States
AsyncData(T value)
AsyncLoading()
AsyncError(Object error, StackTrace stack)

// Pattern Matching (Preferred)
asyncValue.when(
  data: (d) => ...,
  loading: () => ...,
  error: (e, s) => ...,
);

// Helpers
asyncValue.valueOrNull;
asyncValue.isLoading;
asyncValue.hasError;
await AsyncValue.guard(() async => ...); // Mutation helper
```

---

## 4. Advanced 3.0 Features

### Automatic Retry
Failed initializations retry with exponential backoff (200ms → 6.4s).
```dart
ProviderScope(
  retry: (count, error) => error is AuthError ? null : Duration(seconds: count * 2),
)
```

### Practical Preference

The reference projects prioritize manual providers, explicit dependency injection, and split responsibilities over code generation or experimental abstractions.

---

## 5. Family (Parameterized Providers)
- **Manual:** Use `.family` when the feature genuinely benefits from keyed async state.
- **Constraint:** Params MUST have consistent `==` and `hashCode`. NEVER use mutable collections.
