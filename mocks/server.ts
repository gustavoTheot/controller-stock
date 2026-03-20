import { createServer, RestSerializer } from 'miragejs';
import { models } from './models';
import { seedDatabase } from './seeds';
import { setupCompanyRoutes } from './routes/companyRoutes';
import { setupProductRoutes } from './routes/productRoute';
import { setupStoreRoutes } from './routes/stpreRoutes';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models,

    serializers: {
      application: RestSerializer.extend({
        serializeIds: 'always',
        embed: true,
        root: true,
      }),
    },

    seeds(server) {
      seedDatabase(server);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      setupCompanyRoutes(this);
      setupStoreRoutes(this);
      setupProductRoutes(this);

      this.passthrough();
    },
  });
}