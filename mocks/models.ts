import { Model, hasMany, belongsTo, Registry } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

import { Company } from '../types/companyDto';
import { Store } from '../types/storeDto';
import { Product } from '../types/productDto';

export const models = {
  company: Model.extend({
    stores: hasMany(),
  }) as ModelDefinition<Company>,

  store: Model.extend({
    company: belongsTo(),
    products: hasMany(),
  }) as ModelDefinition<Store>,

  product: Model.extend({
    store: belongsTo(),
  }) as ModelDefinition<Product>,
};

export type AppRegistry = Registry<typeof models, {}>;
export type AppSchema = Schema<AppRegistry>;