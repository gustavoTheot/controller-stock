import { Server } from 'miragejs';
import { AppRegistry, AppSchema } from '../models';

export function setupCompanyRoutes(server: Server<AppRegistry>) {
  server.get('/company', (schema: AppSchema) => schema.all('company'));

  server.post('/company', (schema: AppSchema, request) => {
    let attrs = JSON.parse(request.requestBody);
    return schema.create('company', attrs);
  });

  server.put('/company/:id', (schema: AppSchema, request) => {
    let newAttrs = JSON.parse(request.requestBody);
    let id = request.params.id;
    return schema.find('company', id)?.update(newAttrs);
  });

  server.delete('/company/:id', (schema: AppSchema, request) => {
    let id = request.params.id;
    return schema.find('company', id)?.destroy();
  });
}
