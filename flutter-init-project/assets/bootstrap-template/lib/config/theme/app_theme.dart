import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  final Color primaryColor;
  AppTheme({required this.primaryColor});

  late final ThemeData lightTheme = _buildTheme(Brightness.light);
  late final ThemeData darkTheme  = _buildTheme(Brightness.dark);

  ThemeData _buildTheme(Brightness brightness) {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: primaryColor,
      brightness: brightness,
    );
    return ThemeData(
      useMaterial3: true,
      brightness: colorScheme.brightness,
      colorScheme: colorScheme,
      textTheme: _buildTextTheme(colorScheme),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
        ),
      ),
    );
  }

  TextTheme _buildTextTheme(ColorScheme colorScheme) {
    final base = colorScheme.brightness == Brightness.light 
        ? Typography.material2021().black 
        : Typography.material2021().white;
        
    final headsFonts = GoogleFonts.montserratTextTheme(base);
    final bodyFonts  = GoogleFonts.nunitoTextTheme(base);

    return base.copyWith(
      displayLarge:   headsFonts.displayLarge,
      displayMedium:  headsFonts.displayMedium,
      displaySmall:   headsFonts.displaySmall,
      headlineLarge:  headsFonts.headlineLarge,
      headlineMedium: headsFonts.headlineMedium,
      headlineSmall:  headsFonts.headlineSmall,
      titleLarge:     headsFonts.titleLarge,
      titleMedium:    headsFonts.titleMedium,
      titleSmall:     headsFonts.titleSmall,
      bodyLarge:      bodyFonts.bodyLarge,
      bodyMedium:     bodyFonts.bodyMedium,
      bodySmall:      bodyFonts.bodySmall,
      labelLarge:     bodyFonts.labelLarge,
      labelMedium:    bodyFonts.labelMedium,
      labelSmall:     bodyFonts.labelSmall,
    ).apply(
      displayColor: colorScheme.onSurface,
      bodyColor:    colorScheme.onSurface,
    );
  }
}
