// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Dependents, Todo } = initSchema(schema);

export {
  Dependents,
  Todo
};