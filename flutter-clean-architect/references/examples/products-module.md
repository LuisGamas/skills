# Example: Product Module (Remote + Local, Offline-first)

## File Structure
```
lib/modules/product/
├── domain/
│   ├── entities/ product_entity.dart
│   ├── repositories/ product_repository.dart
│   ├── datasources/ product_datasource.dart
│   └── product_domain.dart
├── infrastructure/
│   ├── models/ product_model.dart
│   ├── mappers/ product_mapper.dart
│   ├── datasources/ product_remote_datasource.dart, product_local_datasource.dart
│   ├── repositories/ product_repository_impl.dart
│   └── product_infrastructure.dart
└── presentation/
    ├── providers/ product_provider.dart, products_notifier.dart
    ├── screens/ products_screen.dart
    └── product_presentation.dart
```

## Entity (Isar)
```dart
@collection
class ProductEntity {
  Id get isarId => fastHash(id);
  final String id;
  final String name;
  final double price;
  @enumerated
  final ProductCategory category;

  const ProductEntity({required this.id, required this.name, required this.price, required this.category});

  ProductEntity copyWith({String? id, String? name, double? price, ProductCategory? category}) =>
      ProductEntity(id: id ?? this.id, name: name ?? this.name, price: price ?? this.price, category: category ?? this.category);
}
```

## Model & Mapper
```dart
class ProductModel {
  final String productId;
  final String productName;
  final double unitPrice;

  ProductModel({required this.productId, required this.productName, required this.unitPrice});

  factory ProductModel.fromJson(Map<String, dynamic> json) => ProductModel(
        productId: json['product_id']?.toString() ?? '',
        productName: json['product_name']?.toString() ?? '',
        unitPrice: (json['unit_price'] as num?)?.toDouble() ?? 0,
      );
}

class ProductMapper {
  static ProductEntity toEntity(ProductModel model) => ProductEntity(
      id: model.productId, name: model.productName, price: model.unitPrice, category: ProductCategory.other);
}
```

## Repository Impl
```dart
class ProductRepositoryImpl implements ProductRepository {
  final ProductRemoteDataSource _remote;
  final ProductLocalDataSource _local;

  ProductRepositoryImpl({required ProductRemoteDataSource remote, required ProductLocalDataSource local})
      : _remote = remote, _local = local;

  @override
  Future<List<ProductEntity>> getProducts() async {
    try {
      final products = await _remote.getProducts();
      for (final p in products) await _local.saveProduct(p);
      return products;
    } catch (_) {
      return await _local.getProducts();
    }
  }
}
```

## Provider & Screen
```dart
final productRemoteDataSourceProvider = Provider<ProductRemoteDataSource>((ref) {
  return ProductRemoteDataSourceImpl(apiClient: ref.watch(apiClientProvider));
});

final productLocalDataSourceProvider = Provider<ProductLocalDataSource>((ref) {
  return ProductLocalDataSourceImpl(isar: ref.watch(isarProvider));
});

final productRepositoryProvider = Provider<ProductRepository>((ref) {
  final remote = ref.watch(productRemoteDataSourceProvider);
  final local = ref.watch(productLocalDataSourceProvider);
  return ProductRepositoryImpl(remote: remote, local: local);
});

final productsNotifierProvider = AsyncNotifierProvider<ProductsNotifier, List<ProductEntity>>(ProductsNotifier.new);

class ProductsNotifier extends AsyncNotifier<List<ProductEntity>> {
  @override
  Future<List<ProductEntity>> build() async {
    return ref.watch(productRepositoryProvider).getProducts();
  }
}

class ProductsScreen extends ConsumerWidget {
  const ProductsScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(productsNotifierProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Products')),
      body: productsAsync.when(
        data: (products) => ListView.builder(
          itemCount: products.length,
          itemBuilder: (_, i) => ListTile(title: Text(products[i].name)),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Error: $e')),
      ),
    );
  }
}
```
