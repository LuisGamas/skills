---
name: flutter-clean-arch-architect
description: Design, scaffold, refactor, or audit Flutter code using a Clean Architecture aligned with this repository's real project style: `domain`, `infrastructure`, and `presentation` layers for modular features, manual Riverpod dependency injection, explicit datasource and repository contracts, optional local and remote repositories, Isar-friendly entities, and no `usecase` layer. Use when creating a new module, restructuring an existing feature, wiring datasources/repositories/providers, shaping shared services, or reviewing architectural boundaries in a Flutter codebase.
---

# Flutter Clean Architecture Architect

Build production-oriented Flutter modules with explicit separation of concerns and predictable generation order.

## Skill Profile

- Preferred state management: manual Riverpod
- Preferred module root: `lib/modules/<feature_name>/`
- Preferred layers: `domain/`, `infrastructure/`, `presentation/`
- Preferred data flow: `ExternalService -> DataSource -> Repository -> Provider/Notifier`
- Preferred local storage strategy: offline-first with Isar-compatible entities when local persistence is needed
- Preferred repository style: thin repositories that delegate to datasources unless aggregation or orchestration is genuinely needed
- Preferred architecture variants:
  - modular feature architecture under `lib/modules/` for medium and large apps
  - simpler root-level `domain/`, `infrastructure/`, `presentation/` layout for smaller apps
- Preferred coding style: classes over helper methods, explicit mappers, explicit barrel files
- Preferred widget bias: `ConsumerWidget` by default; use `ConsumerStatefulWidget` only when controllers or lifecycle are required
- Language policy: write code, comments, and docs in English
- Skill version preserved from previous iteration: `2.1.0`

## Required Resource Map

Read these reference files before generating or refactoring code:

1. [`references/core/architecture.md`](references/core/architecture.md)
   Use for the creation order, folder structure, dependency chain, and canonical implementation patterns.
2. [`references/core/constraints.md`](references/core/constraints.md)
   Use for non-negotiable architectural rules, banned imports, layer boundaries, and widget selection guardrails.
3. [`references/core/data-schema.md`](references/core/data-schema.md)
   Use for the expected shape of entities, models, repositories, failures, notifiers, and provider chains.

Load these examples when the request matches their scenario:

- [`references/examples/products-module.md`](references/examples/products-module.md)
  Use for remote + local + offline-first module creation.
- [`references/examples/settings-module.md`](references/examples/settings-module.md)
  Use for local-only modules without API integration.

## Operating Procedure

1. Analyze the request.
   Determine whether the feature needs remote data, local persistence, or both.
2. Plan the module surface.
   List entities, abstract contracts, infrastructure implementations, providers, notifiers, screens, widgets, shared services, and barrel files.
3. Enforce architecture boundaries.
   Verify the plan against [`references/core/constraints.md`](references/core/constraints.md) before writing code.
4. Generate in strict layer order.
   Follow the creation order defined in [`references/core/architecture.md`](references/core/architecture.md). Do not jump directly to presentation.
5. Wire dependency injection explicitly.
   Use Riverpod providers to compose services, datasources, repositories, and presentation state.
6. Validate completeness.
   Ensure repository contracts, datasource contracts, repository implementations, providers, mappers, and per-layer barrel files are present when the feature actually needs them.

## Non-Negotiable Rules

- Keep `domain` independent from Flutter UI and transport concerns.
- Keep JSON and `Map<String, dynamic>` limited to models and external boundaries.
- Never return infrastructure models to the domain or presentation layers.
- Never skip mappers between model and entity representations.
- Never instantiate dependencies manually inside notifiers when they should come from `ref`.
- Never replace widget classes with private widget-returning helper methods when a dedicated widget class is clearer.
- Never force a module layout for a small project when a flatter root architecture is more aligned with the existing app.
- Never force a single repository to own both remote and local persistence when separate repositories or providers keep the design clearer.

## Output Expectations

When completing a feature request with this skill:

- Produce the module structure explicitly.
- Keep the dependency chain visible and traceable.
- Use naming suffixes consistently, such as `_entity.dart`, `_model.dart`, `_repository.dart`, `_repository_impl.dart`, `_provider.dart`, `_notifier.dart`.
- Preserve an offline-first strategy when both remote and local datasources exist, but keep local storage repositories/providers separable when the project does so.
- Prefer clean, typed, testable code over brevity.
