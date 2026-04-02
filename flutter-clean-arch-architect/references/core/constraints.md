# Constraints & Negation Rules

## Chain of Thought
Before generating code:
1. Which layer does this code belong to?
2. Does it violate any dependency rules?
3. Is there an existing similar pattern in the project?

## Data Anchoring
Respond ONLY based on the information in this skill and the project context.

---

## 🚫 Negation Rules (NEVER do)

### Domain Layer
- NEVER import `flutter/material.dart`.
- NEVER import network packages (`dio`, `http`, `retrofit`).
- NEVER import DB packages except Isar annotations (approved optimization).
- NEVER use `Map<String, dynamic>` or `fromJson/toJson` in entities.
- NEVER import presentation logic.

### Infrastructure Layer
- NEVER put business logic in datasources.
- NEVER put UI logic in repositories or models.
- NEVER expose `Map<String, dynamic>` outside of Models.
- NEVER return Models to the domain — always map to Entity.

### Presentation Layer
- NEVER instantiate classes manually in Notifiers — use DI via `ref`.
- NEVER create private methods that return Widgets — always create classes.
- NEVER use `ConsumerStatefulWidget` when `ConsumerWidget` suffices.
- NEVER use `ref.watch` inside action methods — use `ref.read`.

### General
- NEVER omit Mappers — always explicitly convert Model ↔ Entity.
- NEVER omit barrel files — every layer must have its own export file.
- NEVER mix languages — all code and documentation must be in English.
- NEVER omit file suffixes: `_entity.dart`, `_model.dart`, etc.
- NEVER force `usecases` into the architecture when the project style does not use them.
- NEVER collapse auth stream state, auth data sync, auth operations, and router bridging into one monolithic provider if the app benefits from keeping them separate.
- NEVER force remote and local datasources into one repository when separate repositories/providers are clearer.

---

## ✅ When to use ConsumerStatefulWidget
ONLY if required for:
- `TextEditingController`
- `AnimationController`
- `ScrollController`
- `FocusNode`
- `TabController`
- Life cycle methods (`initState`, `dispose`)

---

## ✅ Isar Annotations on Entity
Allowed ONLY for:
- `@collection`
- `Id get isarId`
- `@Index()`
- `@enumerated`
