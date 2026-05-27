# Example: Settings Module (Local-only, no API)

## File Structure
```
lib/modules/settings/
├── domain/
│   ├── entities/ app_settings_entity.dart
│   ├── repositories/ settings_repository.dart
│   ├── datasources/ settings_datasource.dart
│   └── settings_domain.dart
├── infrastructure/
│   ├── datasources/ settings_local_datasource.dart
│   ├── repositories/ settings_repository_impl.dart
│   └── settings_infrastructure.dart
└── presentation/
    ├── providers/ settings_provider.dart, settings_notifier.dart
    ├── screens/ settings_screen.dart
    └── settings_presentation.dart
```

## Entity (Singleton)
```dart
@collection
class AppSettingsEntity {
  Id id = 0; // Singleton — always ID 0
  @enumerated
  final AppThemeMode themeMode;
  final String locale;

  AppSettingsEntity({this.themeMode = AppThemeMode.system, this.locale = 'en'});

  AppSettingsEntity copyWith({AppThemeMode? themeMode, String? locale}) =>
      AppSettingsEntity(themeMode: themeMode ?? this.themeMode, locale: locale ?? this.locale);
}
```

## Provider Chain (No remote)
```dart
final settingsLocalDataSourceProvider = Provider<SettingsLocalDataSource>((ref) {
  return SettingsLocalDataSourceImpl(localDb: ref.watch(localDbProvider));
});

final settingsRepositoryProvider = Provider<SettingsRepository>((ref) {
  final local = ref.watch(settingsLocalDataSourceProvider);
  return SettingsRepositoryImpl(local: local);
});

final settingsNotifierProvider = AsyncNotifierProvider<SettingsNotifier, AppSettingsEntity>(SettingsNotifier.new);

class SettingsNotifier extends AsyncNotifier<AppSettingsEntity> {
  @override
  Future<AppSettingsEntity> build() async {
    return ref.watch(settingsRepositoryProvider).getSettings();
  }

  Future<void> updateTheme(AppThemeMode mode) async {
    final repository = ref.read(settingsRepositoryProvider);
    final current = await repository.getSettings();
    final updated = current.copyWith(themeMode: mode);
    await repository.saveSettings(updated);
    state = AsyncValue.data(updated);
  }
}
```

## Screen
```dart
class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settingsAsync = ref.watch(settingsNotifierProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: settingsAsync.when(
        data: (settings) => ListView(children: [Text('Current Theme: ${settings.themeMode.name}')]),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Error: $e')),
      ),
    );
  }
}
```
