import { Server } from 'miragejs';
import { AppRegistry } from './models';

export function seedDatabase(server: Server<AppRegistry>) {
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
    sku: 'MBP-001',
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
}