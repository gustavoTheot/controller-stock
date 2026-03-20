import { Server } from 'miragejs';
import { AppRegistry, AppSchema } from '../models';

export function setupStoreRoutes(server: Server<AppRegistry>) {
  server.get('/stores', (schema: AppSchema, request) => {
    const { companyId } = request.queryParams;

    let storesCollection = companyId 
      ? schema.where('store', { companyId })
      : schema.all('store');

    const storesWithCounts = storesCollection.models.map(store => {
      const productsCount = schema.where('product', { storeId: store.id }).length;
      
      return {
        ...store.attrs,
        quantityOfProducts: productsCount
      };
    });

    // 3. Devolvemos já em formato JSON embrulhado com a chave { stores: [...] }
    return { stores: storesWithCounts };
  });

  server.post('/stores', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.create('store', attrs);
  });

  server.put('/stores/:id', (schema: AppSchema, request) => {
    const newAttrs = JSON.parse(request.requestBody);
    const id = request.params.id;
    return schema.find('store', id)?.update(newAttrs);
  });

  server.delete('/stores/:id', (schema: AppSchema, request) => {
    const id = request.params.id;
    return schema.find('store', id)?.destroy();
  });
}