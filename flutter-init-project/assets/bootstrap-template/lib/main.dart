import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:config/config.dart'; // Ensure Barrel exists

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appRouter = ref.watch(goRouterProvider);
    
    return MaterialApp.router(
      title: 'Clean Architecture App',
      routerConfig: appRouter,
      themeMode: ThemeMode.system,
      theme: AppTheme(primaryColor: AppColors.primary).lightTheme,
      darkTheme: AppTheme(primaryColor: AppColors.primary).darkTheme,
      debugShowCheckedModeBanner: false,
    );
  }
}
