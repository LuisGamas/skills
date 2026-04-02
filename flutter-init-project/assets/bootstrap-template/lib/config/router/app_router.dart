import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

// Import local screens below
// import '../../modules/dashboard/presentation/screens/home_screen.dart';
// import '../../shared/widgets/views/page_not_found_view.dart';

const homeScreenRoute = 'home_screen';

final goRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        name: homeScreenRoute,
        pageBuilder: (context, state) {
          // Replace with actual HomeScreen once generated
          return pagesTransition(const Scaffold(body: Center(child: Text('Home'))));
        },
      ),
    ],
    // errorBuilder: (context, state) => const PageNotFoundView(),
  );
});

CustomTransitionPage<dynamic> pagesTransition(Widget page) {
  return CustomTransitionPage(
    child: page,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const beginOffset = Offset(1.0, 0.0);
      const endOffset = Offset.zero;
      var tween = Tween(begin: beginOffset, end: endOffset)
          .chain(CurveTween(curve: Curves.easeInOut));
      return SlideTransition(position: animation.drive(tween), child: child);
    },
  );
}

