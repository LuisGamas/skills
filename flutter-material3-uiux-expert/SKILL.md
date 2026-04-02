---
name: flutter-material3-uiux-expert
description: Design, implement, migrate, or review Flutter interfaces using Material Design 3 in the style shown by this repository's real Flutter projects: centralized design tokens, expressive surfaces, selective glassmorphism, shared widgets, semantic colors, and practical responsive behavior that matches the actual screen. Use when building screens, widgets, themes, responsive layouts, or auditing UI code for consistency with this personal Material 3 workflow.
---

# Flutter Material 3 UI/UX Expert

Build adaptive Flutter interfaces that follow Material 3 conventions without falling back to ad hoc styling.

## Skill Profile

- UI system target: Material Design 3 / Material You
- Framework target preserved from previous iteration: Flutter 3.16+
- Responsive model: practical responsiveness based on actual screen needs, with compact, medium, and expanded support when the screen benefits from it
- Theming model: token-driven + `Theme.of(context)` extraction
- Visual style allowance: intentional use of shadows, blurred surfaces, gradients, and expressive composition when consistent with the project
- Accessibility focus: touch targets, contrast, semantics, scaling
- Skill version preserved from previous iteration: `3.1.0`
- Source anchors preserved from previous iteration:
  - [Official Material 3 Spec](https://m3.material.io)
  - [Flutter Material Docs](https://docs.flutter.dev/ui/design/material)

## Required Resource Map

Read these reference files before generating UI:

1. [`references/core/core-logic.md`](references/core/core-logic.md)
   Use for the main workflow, configuration-layer patterns, component-selection guidance, and responsive layout rules.
2. [`references/core/constraints.md`](references/core/constraints.md)
   Use for anti-patterns, accessibility rules, performance rules, and hallucination guards.
3. [`references/core/data-schema.md`](references/core/data-schema.md)
   Use for breakpoints, token schemas, color semantics, typography expectations, component availability, and responsive behavior.
4. [`references/examples/few-shot-examples.md`](references/examples/few-shot-examples.md)
   Use for end-to-end screen patterns and interactive form implementations.

Use this script when auditing an existing codebase:

- [`scripts/m3_audit.py`](scripts/m3_audit.py)
  Run to detect legacy Material 2 widgets in Dart files.

## Operating Procedure

1. Inspect the existing design system.
   Determine whether theme and token classes already exist.
2. Map responsive behavior.
   Define what the screen should do for compact, medium, and expanded breakpoints.
3. Choose verified M3 components that match the actual screen.
   Use the availability matrix in [`references/core/data-schema.md`](references/core/data-schema.md) before selecting a widget.
4. Build with tokens and semantic colors.
   Prefer `Theme.of(context).colorScheme`, `Theme.of(context).textTheme`, and project token classes.
5. Enforce layout discipline.
   Constrain wide layouts when needed and avoid fake responsiveness.
6. Audit before delivery.
   Check the result against [`references/core/constraints.md`](references/core/constraints.md) and use [`scripts/m3_audit.py`](scripts/m3_audit.py) when relevant.

## Non-Negotiable Rules

- Extract `colorScheme` and `textTheme` once at the top of `build()`.
- Avoid hardcoded colors and ad hoc spacing.
- Prefer current Material 3 widgets over legacy Material 2 equivalents.
- Define responsive behavior when the screen or layout actually requires it.
- Constrain expanded content width for readability when building desktop or web surfaces.
- Use semantic surfaces by default, but allow intentional shadow, blur, and visual depth patterns when they are part of the design language.

## Output Expectations

When completing UI tasks with this skill:

- Use a token-driven implementation.
- Keep component choices aligned with current Flutter support.
- Explain or encode responsive behavior clearly.
- Preserve accessibility and performance constraints.
- Provide migration-safe replacements when replacing Material 2 patterns.
