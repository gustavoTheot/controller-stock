import { Product } from '../types/productDto';

export interface ProductServiceInterface {
  getAll(): Promise<any>;
  create: (data: Product) => Promise<void>;
  delete: (id: string) => Promise<void>;
  update: (data: Product) => Promise<void>;
}
