import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type BoundsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DependentsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Bounds {
  readonly id: string;
  readonly email?: string | null;
  readonly guardian?: string | null;
  readonly timeStart?: string | null;
  readonly timeStop?: string | null;
  readonly location?: string | null;
  readonly size?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Bounds, BoundsMetaData>);
  static copyOf(source: Bounds, mutator: (draft: MutableModel<Bounds, BoundsMetaData>) => MutableModel<Bounds, BoundsMetaData> | void): Bounds;
}

export declare class Dependents {
  readonly id: string;
  readonly email?: string | null;
  readonly guardian?: string | null;
  readonly name?: string | null;
  readonly location?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Dependents, DependentsMetaData>);
  static copyOf(source: Dependents, mutator: (draft: MutableModel<Dependents, DependentsMetaData>) => MutableModel<Dependents, DependentsMetaData> | void): Dependents;
}

export declare class Todo {
  readonly id: string;
  readonly description?: string | null;
  readonly isComplete?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}