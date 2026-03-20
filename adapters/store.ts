import { CreateStoreParams, Store, UpdateStoreParams } from '../types/storeDto';

export interface StoreServiceInterface {
  getAll(companyId: string): Promise<Store[]>;
  create: (data: CreateStoreParams) => Promise<Store>;
  delete: (id: string) => Promise<Store>;
  update: (data: UpdateStoreParams) => Promise<Store>;
}
