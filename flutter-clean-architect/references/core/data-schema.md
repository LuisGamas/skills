# Data Schema — Architectural Element Shapes

TypeScript-style interfaces defining the expected shape of each architectural element.

---

## Entity (Domain)
```typescript
interface Entity {
  readonly id: string;
  readonly [field: string]: PrimitiveOrValueObject;
  copyWith(overrides: Partial<Entity>): Entity;
  equalsById(other: Entity): boolean;
  computedGetters: readonly;
  isarAnnotations?: ["@collection", "@Index()"];
  isarId?: number; 
  fromJson: never;
  toJson: never;
  flutterImports: never;
}
```

## Abstract Repository & DataSource (Domain)
```typescript
interface AbstractContract {
  methodSignatures: Future<Entity | Entity[] | void>;
  implementationDetails: never;
}
```

## Model / DTO (Infrastructure)
```typescript
interface Model {
  fields: SnakeCaseOrExternalNaming;
  fromJson(json: Map<string, dynamic>): Model;
  toJson(): Map<string, dynamic>;
  businessLogic: never;
}
```

## Mapper (Infrastructure)
```typescript
interface Mapper {
  static toEntity(model: Model): Entity;
  static fromEntity(entity: Entity): Model;
}
```

## Repository Implementation (Infrastructure)
```typescript
interface RepositoryImpl extends AbstractRepository {
  readonly dataSource?: AbstractDataSource;
  readonly remoteDataSource?: AbstractDataSource;
  readonly localDataSource?: AbstractDataSource;
  directApiCalls: never;
  directDbCalls: never;
}
```

## Failure (Infrastructure)
```typescript
interface Failure {
  readonly message: string;
  subtypes: ["ServerFailure", "CacheFailure", "NetworkFailure", "ValidationFailure"];
}
```

## Notifier (Presentation)
```typescript
interface AppNotifier<State> extends Notifier<State> {
  build(): State;
  actionMethods: Future<void>;
  directRepositoryAccess: never; 
  refWatchInActions: never; 
}
```

## Provider Chain
```typescript
type ProviderChain = {
  1: Provider<ExternalService>;       
  2: Provider<RemoteDataSource>;      
  3: Provider<LocalDataSource>;       
  4: Provider<Repository>;            
  5: Provider<Repository>;            
  6: NotifierProvider<Notifier, State> | AsyncNotifierProvider<Notifier, State> | StreamProvider<State>;
};
```

## Split Presentation State
```typescript
interface PresentationSplit {
  streamState?: StreamProvider<any>;
  stateProvider?: NotifierProvider<any, any> | AsyncNotifierProvider<any, any>;
  operationsProvider?: NotifierProvider<any, any>;
  formProvider?: NotifierProvider<any, any>;
  routerBridge?: Provider<ChangeNotifier>;
}
```

## Isar Entity Strategy
```typescript
interface IsarEntityStrategy {
  entityCanBeCollection: true;
  remoteModelSeparateFromEntity: true;
  mapperAbsorbsRemoteShapeChanges: true;
}
```
