import { Server } from 'miragejs';
import { AppRegistry } from './models';

export function seedDatabase(server: Server<AppRegistry>) {
  const company = server.create('company', {
    id: 'adc-123',
    name: 'Tech Varejo SA',
  });

  const store1 = server.create('store', {
    id: 'store-1',
    name: 'Filial Centro',
    companyId: company.id,
    address: 'Rua Central, 456 - CEP 12345-678',
  });

  const store2 = server.create('store', {
    id: 'store-2',
    name: 'Filial Shopping',
    companyId: company.id,
    address: 'Av. Shopping, 123 - CEP 12345-678',
  });

  server.create('product', {
    id: 'prod-1',
    name: 'MacBook Pro',
    quantity: 15,
    price: 12000,
    sku: 'MBP-001',
    storeId: store1.id,
  });

  server.create('product', {
    id: 'prod-2',
    name: 'Monitor Dell 27"',
    quantity: 30,
    price: 2500,
    sku: 'MON-DELL-27',
    storeId: store1.id,
  });

  server.create('product', {
    id: 'prod-3',
    name: 'Teclado Mecânico',
    quantity: 50,
    price: 450,
    sku: 'KB-MEC-01',
    storeId: store2.id,
  });
}
