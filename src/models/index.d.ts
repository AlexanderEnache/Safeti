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

type EagerBounds = {
  readonly id: string;
  readonly email?: string | null;
  readonly guardian?: string | null;
  readonly location?: string | null;
  readonly size?: number | null;
  readonly time?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBounds = {
  readonly id: string;
  readonly email?: string | null;
  readonly guardian?: string | null;
  readonly location?: string | null;
  readonly size?: number | null;
  readonly time?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Bounds = LazyLoading extends LazyLoadingDisabled ? EagerBounds : LazyBounds

export declare const Bounds: (new (init: ModelInit<Bounds, BoundsMetaData>) => Bounds) & {
  copyOf(source: Bounds, mutator: (draft: MutableModel<Bounds, BoundsMetaData>) => MutableModel<Bounds, BoundsMetaData> | void): Bounds;
}

type EagerDependents = {
  readonly id: string;
  readonly email?: string | null;
  readonly guardian?: string | null;
  readonly name?: string | null;
  readonly location?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDependents = {
  readonly id: string;
  readonly email?: string | null;
  readonly guardian?: string | null;
  readonly name?: string | null;
  readonly location?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Dependents = LazyLoading extends LazyLoadingDisabled ? EagerDependents : LazyDependents

export declare const Dependents: (new (init: ModelInit<Dependents, DependentsMetaData>) => Dependents) & {
  copyOf(source: Dependents, mutator: (draft: MutableModel<Dependents, DependentsMetaData>) => MutableModel<Dependents, DependentsMetaData> | void): Dependents;
}

type EagerTodo = {
  readonly id: string;
  readonly description?: string | null;
  readonly isComplete?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly id: string;
  readonly description?: string | null;
  readonly isComplete?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo, TodoMetaData>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}