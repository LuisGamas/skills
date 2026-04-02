---
name: flutter-riverpod-expert
description: Design, implement, refactor, migrate, or review Flutter state management with Riverpod using the manual provider patterns shown in this repository's real Flutter projects: explicit datasource and repository providers, split state and operation providers, auth stream listeners, GoRouter bridge providers, family providers where they genuinely help, and local or remote repositories that can remain independent. Use when creating providers and notifiers, modernizing state structure, wiring auth/router interaction, optimizing rebuilds, or aligning code with this repository's personal Flutter workflow.
---

# Flutter Riverpod Expert

Use Riverpod as a modern architectural tool, not as a loose collection of providers.

## Skill Profile

- Target standard: manual Riverpod aligned with the reference projects
- Primary state primitives: `Provider`, `NotifierProvider`, `AsyncNotifierProvider`, `StreamProvider`
- Secondary bridge primitive: `ChangeNotifier` only when integrating router refresh or framework listeners
- Migration stance: replace legacy app-state provider patterns aggressively, but allow framework interop patterns that the projects already use
- Provider design bias: typed immutable state and explicit repository injection
- Provider design bias: split auth state, auth operations, form state, and router bridge when the feature benefits from that separation
- Family guidance: support manual family providers, but do not force families or code generation where simpler providers fit better
- Skill version preserved from previous iteration: `3.0.0`
- Package references preserved from previous iteration:
  - `flutter_riverpod: ^3.3.0`
- Official source anchors preserved from previous iteration:
  - [Getting Started](https://riverpod.dev/docs/introduction/getting_started)
  - [What's New](https://riverpod.dev/docs/whats_new)
  - [Do / Don't](https://riverpod.dev/docs/root/do_dont)
  - [Family Providers](https://riverpod.dev/docs/concepts2/family)
  - [Migration from StateNotifier](https://riverpod.dev/docs/migration/from_state_notifier)
  - [Migration from ChangeNotifier](https://riverpod.dev/docs/migration/from_change_notifier)

## Required Resource Map

Read these reference files before generating or reviewing provider code:

1. [`references/core/constraints.md`](references/core/constraints.md)
   Use for banned APIs, anti-patterns, and migration guardrails.
2. [`references/core/technical-spec.md`](references/core/technical-spec.md)
   Use for provider signatures, unified `Ref` usage, `AsyncValue`, retry, mutations, offline persistence, and family rules.
3. [`references/core/architecture.md`](references/core/architecture.md)
   Use for repository injection, notifier mutation patterns, widget selection, and testing setup.

Load these examples when needed:

- [`references/examples/full-feature-family.md`](references/examples/full-feature-family.md)
  Use for parameterized feature design and manual vs code-generation comparison.
- [`references/examples/migration-guide.md`](references/examples/migration-guide.md)
  Use for legacy-to-modern migration patterns.

## Operating Procedure

1. Classify the state problem.
   Decide whether the concern is stream state, synchronized auth state, mutable operations, form state, router bridging, or parameterized async data.
2. Choose the provider shape.
   Select the smallest modern provider that fits the requirement.
3. Check constraints first.
   Reject banned APIs and legacy patterns before writing code.
4. Wire dependencies through repositories or services.
   Keep datasource and repository providers explicit and keep UI logic out of repositories.
5. Implement notifier methods safely.
   Use immutable state, `AsyncValue.guard()`, and `ref.mounted` checks after async work.
6. Validate rebuild behavior.
   Prefer `ref.watch()` in reactive contexts, `ref.read()` in action methods, and `ref.select()` when narrowing rebuilds.

## Non-Negotiable Rules

- Do not generate new code with `StateProvider`, `StateNotifier`, or `StateNotifierProvider`.
- Do not use `ChangeNotifier` for general app state, but allow it as a router bridge when matching the project's GoRouter integration pattern.
- Do not put side effects in provider initialization unless the provider itself represents that async loading workflow.
- Do not keep state as raw `Map<String, dynamic>`.
- Do not create providers inside classes or methods.
- Do not invent Riverpod APIs. If the needed API is not anchored in the provided references, state that clearly.

## Output Expectations

When completing Riverpod work with this skill:

- Use modern provider APIs consistently.
- Keep migration guidance explicit when replacing legacy code.
- Show datasource, repository, stream, operations, and notifier boundaries clearly.
- Prefer maintainable patterns over clever shortcuts.
- Preserve compatibility with the surrounding project style, prioritizing manual patterns over generated ones.
