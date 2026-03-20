import { Product, ProductParams } from '../types/productDto';

export interface ProductServiceInterface {
  getAll(storeId: string): Promise<any>;
  create: (data: ProductParams) => Promise<void>;
  delete: (id: string) => Promise<void>;
  update: (data: ProductParams) => Promise<void>;
}
