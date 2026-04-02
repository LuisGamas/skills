# Example: Migration Guide (Legacy → Modern)

**Goal:** Migrate a legacy `ChangeNotifier` to modern `AsyncNotifier`.

## 1. Legacy Pattern (❌ BANNED)

```dart
class ProductListNotifier extends ChangeNotifier {
  ProductListNotifier(this._repository) { _load(); }
  final ProductRepository _repository;
  List<Product> products = [];
  bool isLoading = true;
  String? error;

  Future<void> _load() async {
    try { products = await _repository.get(); } 
    catch (e) { error = e.toString(); } 
    finally { isLoading = false; notifyListeners(); }
  }

  Future<void> delete(String id) async {
    isLoading = true; notifyListeners();
    try { await _repository.delete(id); _load(); } 
    catch (e) { error = e.toString(); notifyListeners(); }
  }
}
```

## 2. Modern Riverpod 3.x (✅ RECOMMENDED)

```dart
class ProductList extends AsyncNotifier<List<Product>> {
  @override
  Future<List<Product>> build() async {
    // ref.watch() for reactive dependency injection
    final repository = ref.watch(productRepositoryProvider);
    return await repository.get();
  }

  Future<void> delete(String id) async {
    state = const AsyncLoading(); // Sets isLoading=true
    state = await AsyncValue.guard(() async {
      final repository = ref.read(productRepositoryProvider);
      await repository.delete(id);
      return await repository.get();
    });
  }
}

final productListProvider = AsyncNotifierProvider<ProductList, List<Product>>(ProductList.new);
```

### Why Modern is Superior:
1. **No Manual Loading/Error Flags:** `AsyncValue` handles `isLoading` and `error` automatically.
2. **Unified Initialization:** `build()` replaces constructors and `initState` calls.
3. **Reactive Injection:** `ref.watch()` in `build()` automatically refreshes the state if the repository changes.
4. **Pattern Matching:** UI uses `.when()` to handle all 3 states cleanly.
5. **No notifyListeners():** State assignments (`state =`) trigger rebuilds automatically.
6. **Immutable State:** Prevents bugs from mutating the list directly.
