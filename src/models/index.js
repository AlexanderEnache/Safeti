// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Bounds, Dependents, Todo } = initSchema(schema);

export {
  Bounds,
  Dependents,
  Todo
};