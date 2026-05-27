# Few-Shot Examples — Flutter Material 3 UI/UX Expert

---

## Example 1 — Fully Responsive Screen (Mobile + Tablet + Desktop)

**Scenario**: Implement a dashboard screen with adaptive navigation, a constrained content area, and M3 components.

```dart
import 'package:flutter/material.dart';
import 'package:your_app/config/config.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  static const _destinations = [
    NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
    NavigationDestination(icon: Icon(Icons.explore_outlined), selectedIcon: Icon(Icons.explore), label: 'Explore'),
    NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Profile'),
  ];

  static const _railDestinations = [
    NavigationRailDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: Text('Home')),
    NavigationRailDestination(icon: Icon(Icons.explore_outlined), selectedIcon: Icon(Icons.explore), label: Text('Explore')),
    NavigationRailDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: Text('Profile')),
  ];

  @override
  Widget build(BuildContext context) {
    final colors     = Theme.of(context).colorScheme;
    final textStyles = Theme.of(context).textTheme;

    return LayoutBuilder(
      builder: (context, constraints) {
        // ── Compact: Mobile ─────────────────────────────────
        if (constraints.maxWidth < AppBreakpoints.compact) {
          return Scaffold(
            appBar: AppBar(title: const Text('Dashboard'), scrolledUnderElevation: 3),
            body: _Body(selectedIndex: _selectedIndex, colors: colors, textStyles: textStyles),
            bottomNavigationBar: NavigationBar(
              selectedIndex: _selectedIndex,
              onDestinationSelected: (i) => setState(() => _selectedIndex = i),
              destinations: _destinations,
            ),
          );
        }

        // ── Medium: Tablet ────────────────────────────────────
        if (constraints.maxWidth < AppBreakpoints.medium) {
          return Scaffold(
            appBar: AppBar(title: const Text('Dashboard'), scrolledUnderElevation: 3),
            body: Row(
              children: [
                NavigationRail(
                  selectedIndex: _selectedIndex,
                  onDestinationSelected: (i) => setState(() => _selectedIndex = i),
                  destinations: _railDestinations,
                  labelType: NavigationRailLabelType.all,
                ),
                const VerticalDivider(width: 1),
                Expanded(
                  child: _Body(selectedIndex: _selectedIndex, colors: colors, textStyles: textStyles),
                ),
              ],
            ),
          );
        }

        // ── Expanded: Desktop / Web ───────────────────────────
        return Scaffold(
          body: Row(
            children: [
              NavigationDrawer(
                selectedIndex: _selectedIndex,
                onDestinationSelected: (i) => setState(() => _selectedIndex = i),
                children: [
                  const SizedBox(height: AppSpacing.lg),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
                    child: Text('Dashboard', style: textStyles.titleMedium),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  NavigationDrawerDestination(icon: const Icon(Icons.home_outlined), label: const Text('Home')),
                  NavigationDrawerDestination(icon: const Icon(Icons.explore_outlined), label: const Text('Explore')),
                  NavigationDrawerDestination(icon: const Icon(Icons.person_outline), label: const Text('Profile')),
                ],
              ),
              const VerticalDivider(width: 1),
              Expanded(
                child: Column(
                  children: [
                    AppBar(title: const Text('Dashboard'), scrolledUnderElevation: 3),
                    Expanded(
                      child: _Body(selectedIndex: _selectedIndex, colors: colors, textStyles: textStyles),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _Body extends StatelessWidget {
  const _Body({required this.selectedIndex, required this.colors, required this.textStyles});
  final int selectedIndex;
  final ColorScheme colors;
  final TextTheme textStyles;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        // Always clamp content width on large screens
        constraints: const BoxConstraints(maxWidth: AppBreakpoints.maxWidth),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            spacing: AppSpacing.lg,
            children: [
              Text('Welcome back', style: textStyles.headlineMedium),

              // Component: CarouselView (M3 Native Carousel)
              SizedBox(
                height: 200,
                child: CarouselView(
                  itemExtent: 300,
                  shrinkExtent: 200,
                  children: List.generate(3, (index) => 
                    Card.filled(
                      color: colors.primaryContainer,
                      child: Center(
                        child: Text('Featured Item ${index + 1}', 
                          style: textStyles.titleLarge?.copyWith(color: colors.onPrimaryContainer)
                        ),
                      ),
                    ),
                  ),
                ),
              ),

              const Divider(), // M3 horizontal separator

              Text('Quick Stats', style: textStyles.titleMedium),
              
              // Stat cards: grid adapts automatically via Wrap
              Wrap(
                spacing: AppSpacing.md,
                runSpacing: AppSpacing.md,
                children: [
                  _StatCard(label: 'Revenue', value: r'$12,400', icon: Icons.trending_up, colors: colors, textStyles: textStyles),
                  _StatCard(label: 'Users',   value: '3,210',    icon: Icons.people,       colors: colors, textStyles: textStyles),
                  _StatCard(label: 'Orders',  value: '842',      icon: Icons.shopping_bag, colors: colors, textStyles: textStyles),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.label, required this.value, required this.icon, required this.colors, required this.textStyles});
  final String label;
  final String value;
  final IconData icon;
  final ColorScheme colors;
  final TextTheme textStyles;

  @override
  Widget build(BuildContext context) {
    return Card.filled(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          spacing: AppSpacing.md,
          children: [
            Icon(icon, color: colors.primary, size: AppIconSizes.lg),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: textStyles.labelMedium?.copyWith(color: colors.onSurfaceVariant)),
                Text(value, style: textStyles.titleLarge),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

**Tokens applied**: `AppSpacing`, `AppBreakpoints`, `AppIconSizes`, `colors.*`, `textStyles.*`
**Patterns**: `LayoutBuilder` + three-tier navigation, `ConstrainedBox` on content, `Card.filled`, `CarouselView`, `Divider`, `Column(spacing:)`.

---

## Example 2 — Interactive Form with M3 Components

**Scenario**: Settings form combining `SegmentedButton`, `Switch`, `Chips`, `SearchBar`, `TextField`, and `FilledButton`.

```dart
import 'package:flutter/material.dart';
import 'package:your_app/config/config.dart';

class SettingsFormScreen extends StatefulWidget {
  const SettingsFormScreen({super.key});

  @override
  State<SettingsFormScreen> createState() => _SettingsFormScreenState();
}

class _SettingsFormScreenState extends State<SettingsFormScreen> {
  String _notificationMode = 'Push';
  bool   _darkMode         = false;
  final  Set<String> _selectedTags = {'Design'};

  static const _tags = ['Design', 'Flutter', 'Backend', 'DevOps'];

  void _showSavedSnackbar(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Settings saved'),
        behavior: SnackBarBehavior.floating,
        action: SnackBarAction(label: 'Undo', onPressed: () {}),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final colors     = Theme.of(context).colorScheme;
    final textStyles = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        scrolledUnderElevation: 3,
      ),
      body: Center(
        child: ConstrainedBox(
          // Clamp content for readability on large screens
          constraints: const BoxConstraints(maxWidth: AppBreakpoints.maxWidth),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              spacing: AppSpacing.xl,
              children: [

                // ── Search ─────────────────────────────────────────
                SearchAnchor(
                  builder: (context, controller) => SearchBar(
                    controller: controller,
                    hintText: 'Search settings...',
                    leading: const Icon(Icons.search),
                    onTap: controller.openView,
                    onChanged: (_) => controller.openView(),
                  ),
                  suggestionsBuilder: (context, controller) => [],
                ),

                // ── Notification Preference ────────────────────────
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: AppSpacing.sm,
                  children: [
                    Text('Notifications', style: textStyles.titleMedium),
                    SegmentedButton<String>(
                      segments: const [
                        ButtonSegment(value: 'Email', label: Text('Email'), icon: Icon(Icons.email_outlined)),
                        ButtonSegment(value: 'Push',  label: Text('Push'),  icon: Icon(Icons.notifications_outlined)),
                        ButtonSegment(value: 'None',  label: Text('None'),  icon: Icon(Icons.block)),
                      ],
                      selected: {_notificationMode},
                      onSelectionChanged: (val) => setState(() => _notificationMode = val.first),
                    ),
                  ],
                ),

                // ── Topic Chips ────────────────────────────────────
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: AppSpacing.sm,
                  children: [
                    Text('Topics of Interest', style: textStyles.titleMedium),
                    Wrap(
                      spacing: AppSpacing.xs,
                      runSpacing: AppSpacing.xs,
                      children: _tags.map((tag) => FilterChip(
                        label: Text(tag),
                        selected: _selectedTags.contains(tag),
                        onSelected: (selected) => setState(() {
                          selected ? _selectedTags.add(tag) : _selectedTags.remove(tag);
                        }),
                      )).toList(),
                    ),
                  ],
                ),

                // ── Text Field ────────────────────────────────────
                TextField(
                  decoration: InputDecoration(
                    labelText: 'Display Name',
                    hintText: 'Enter your name',
                    border: OutlineInputBorder(borderRadius: AppRadius.radiusSm),
                    prefixIcon: Icon(Icons.person_outline, size: AppIconSizes.md),
                  ),
                ),

                // ── Dark Mode Toggle ──────────────────────────────
                Row(
                  spacing: AppSpacing.md,
                  children: [
                    Switch(
                      value: _darkMode,
                      onChanged: (v) => setState(() => _darkMode = v),
                    ),
                    Text('Dark Mode', style: textStyles.bodyLarge),
                  ],
                ),

                // ── Actions ───────────────────────────────────────
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  spacing: AppSpacing.sm,
                  children: [
                    TextButton(
                      onPressed: () {},
                      child: Text('Cancel', style: TextStyle(color: colors.error)),
                    ),
                    FilledButton(
                      onPressed: () => _showSavedSnackbar(context),
                      child: const Text('Save Changes'),
                    ),
                  ],
                ),

              ],
            ),
          ),
        ),
      ),
    );
  }
}
```
