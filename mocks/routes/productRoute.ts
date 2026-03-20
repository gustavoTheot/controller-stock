import { Server } from 'miragejs';
import { AppRegistry, AppSchema } from '../models';

export function setupProductRoutes(server: Server<AppRegistry>) {
  server.get('/products', (schema: AppSchema) => {
    return schema.all('product');
  });

  server.post('/products', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.create('product', attrs);
  });

  server.put('/products/:id', (schema: AppSchema, request) => {
    const newAttrs = JSON.parse(request.requestBody);
    const id = request.params.id;
    return schema.find('product', id)?.update(newAttrs);
  });

  server.delete('/products/:id', (schema: AppSchema, request) => {
    const id = request.params.id;
    return schema.find('product', id)?.destroy();
  });

  server.get('/stores/:id/products', (schema: AppSchema, request) => {
    const storeId = request.params.id;
    return schema.where('product', { storeId });
  });
}