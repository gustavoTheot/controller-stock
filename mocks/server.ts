import { createServer } from 'miragejs';
import { models } from './models';
import { seedDatabase } from './seeds';
import { setupCompanyRoutes } from './routes/companyRoutes';
import { setupStoreRoutes } from './routes/sotreRoutes';
import { setupProductRoutes } from './routes/productRoute';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models,

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