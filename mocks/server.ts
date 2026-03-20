import { createServer, Model, hasMany, belongsTo, Registry, Server } from 'miragejs';
import { Company } from '../types/companyDto';
import { Store } from '../types/storeDto';
import { Product } from '../types/productDto';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

// Criação de tabela no "banco"
const CompanyModel = Model.extend({
  // 1,n
  stores: hasMany(),
}) as ModelDefinition<Company>;

const StoreModel = Model.extend({
  company: belongsTo(),
  products: hasMany(),
}) as ModelDefinition<Store>;

const ProductModel = Model.extend({
  // 1,1
  store: belongsTo(),
}) as ModelDefinition<Product>;

type AppRegistry = Registry<
  {
    company: typeof CompanyModel;
    store: typeof StoreModel;
    product: typeof ProductModel;
  },
  {}
>;

type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      company: CompanyModel,
      store: StoreModel,
      product: ProductModel,
    },

    // Populando dados iniciais
    seeds(server: Server<AppRegistry>) {
      const company = server.create('company', {
        name: 'Tech Varejo SA',
      });

      const store1 = server.create('store', {
        name: 'Filial Centro',
        companyId: company.id,
      });
      const store2 = server.create('store', {
        name: 'Filial Shopping',
        companyId: company.id,
      });

      server.create('product', {
        name: 'MacBook Pro',
        quantity: 15,
        price: 12000,
        sku: 'MBP-001', // Note que adicionei o SKU que estava na interface
        storeId: store1.id,
      });

      server.create('product', {
        name: 'Monitor Dell 27"',
        quantity: 30,
        price: 2500,
        sku: 'MON-DELL-27',
        storeId: store1.id,
      });

      server.create('product', {
        name: 'Teclado Mecânico',
        quantity: 50,
        price: 450,
        sku: 'KB-MEC-01',
        storeId: store2.id,
      });
    },

    // Definindo as rotas
    routes() {
      this.namespace = 'api'; // Todas as chamadas para /api/... serão interceptadas
      this.timing = 750; // Simula um delay de rede de 750ms para parecer real

      // Rotas de Empresas
      this.get('/company', (schema) => {
        return schema.all('company');
      });

      this.post('/companies', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.create('company', attrs);
      });

      // Rotas de Lojas
      this.get('/stores', (schema: AppSchema) => {
        return schema.all('store');
      });

      // Rotas de Produtos
      this.get('/stores/:id/products', (schema: AppSchema, request) => {
        let storeId = request.params.id;
        return schema.where('product', { storeId });
      });

      // Permite que requisições não mapeadas passem (útil para o Metro Bundler/Expo)
      this.passthrough();
    },
  });

  return server;
}
