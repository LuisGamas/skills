# Technical Specifications — Flutter Init Project

## 1. Directory Tree Schema

```typescript
type DirectoryStructure = {
  lib: {
    config: {
      constants:    ['environment.dart'],
      router:       ['app_router.dart'],
      theme:        ['app_config.dart', 'app_theme.dart'],
      index:        ['config.dart'],      // Barrel file
    },
    modules?: {
      [moduleName: string]: {
        domain: {
          datasources:  string[],
          entities:     string[],
          repositories: string[],
        },
        infrastructure: {
          datasources:  string[],
          errors:       string[],
          mappers:      string[],
          models:       string[],
          repositories: string[],
        },
        presentation: {
          providers:    string[],
          screens:      string[],
          widgets:      string[],
        }
      }
    },
    domain?: {
      datasources: string[],
      entities: string[],
      repositories: string[],
    },
    infrastructure?: {
      datasources: string[],
      mappers: string[],
      models: string[],
      repositories: string[],
    },
    presentation?: {
      providers: string[],
      screens: string[],
      widgets: string[],
    },
    shared: {
      exceptions:   ['exceptions.dart'],
      services:     string[],
      widgets: {
        views:      ['page_not_found_view.dart'],
        index:      ['widgets.dart']
      }
    },
    main: 'main.dart'
  }
}
```

## 2. Design Token Schema
Tokens should follow the implementation style in `../../assets/bootstrap-template/lib/config/theme/app_config.dart`, but may adapt to the active project style. Real project variations include:
- **Colors**: Semantic palette (primary, success, warning, error, info) with light/dark variants.
- **Spacing**: Geometric scales such as `xxxs`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`.
- **Radius**: Standardized rounded borders with values adapted to the project's visual style.
- **Shadows**: Elevation levels (sm, md, lg, xl) using `BoxShadow`.
- **Durations**: Consistent animation timings (`fast`, `normal`, `slow`, `slower`, and optionally longer values when the design uses them).
- **IconSizes**: Standard iconography dimensions.
