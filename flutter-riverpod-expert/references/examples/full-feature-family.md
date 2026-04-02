# Example: Full Feature Family

**Goal:** Create a user profile feature where any user can be viewed and edited by ID using repository-driven dependency injection.

## 1. Manual Definition (Constructor-Based Family)

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// === Domain ===
@immutable
class UserEntity {
  final String id;
  final String name;
  final String email;

  const UserEntity({
    required this.id,
    required this.name,
    required this.email,
  });

  UserEntity copyWith({String? name, String? email}) {
    return UserEntity(
      id: id,
      name: name ?? this.name,
      email: email ?? this.email,
    );
  }
}

// === Infrastructure ===
abstract class UserRepository {
  Future<UserEntity> getUser(String id);
  Future<UserEntity> updateUser(
    String id, {
    String? name,
    String? email,
  });
}

final userRepositoryProvider = Provider<UserRepository>((ref) {
  return UserRepositoryImpl();
});

// === Presentation — Manual family wrapper ===
final userProfileProvider =
    AsyncNotifierProviderFamily<UserProfileNotifier, UserEntity, String>(
  UserProfileNotifier.new,
);

class UserProfileNotifier extends FamilyAsyncNotifier<UserEntity, String> {
  late final String userId;

  @override
  Future<UserEntity> build(String arg) async {
    userId = arg;
    return ref.watch(userRepositoryProvider).getUser(arg);
  }

  Future<void> updateName(String newName) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      final repository = ref.read(userRepositoryProvider);
      final updated = await repository.updateUser(userId, name: newName);
      if (!ref.mounted) {
        return updated;
      }
      return updated;
    });
  }
}

// === UI ===
class UserProfileScreen extends ConsumerWidget {
  const UserProfileScreen({
    required this.userId,
    super.key,
  });

  final String userId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userProfileProvider(userId));

    return userAsync.when(
      data: (user) {
        return Column(
          children: [
            Text(user.name),
            FilledButton(
              onPressed: () {
                ref.read(userProfileProvider(userId).notifier).updateName('New Name');
              },
              child: const Text('Edit'),
            ),
          ],
        );
      },
      loading: () => const CircularProgressIndicator(),
      error: (error, stackTrace) => Text('Error: $error'),
    );
  }
}
```

## Why This Matches the Project Style

- The repository is exposed through an explicit provider.
- The async feature state is isolated in its own notifier.
- The keyed family is used only because the screen depends on `userId`.
- No code generation is required.
