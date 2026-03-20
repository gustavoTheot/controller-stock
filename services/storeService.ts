import axios from 'axios';
import { StoreServiceInterface } from '../adapters/store';
import { CreateStoreParams, Store, UpdateStoreParams } from '../types/storeDto';

export class StoreService implements StoreServiceInterface {
  private readonly baseUrl = '/api/stores' as const;

  async getAll(): Promise<Store[]> {
    const response = await axios(this.baseUrl);
    return response.data.store;
  }

  async create(data: CreateStoreParams): Promise<Store> {
    const response = await axios.post(this.baseUrl, data);
    return response.data.store;
  }

  async update(data: UpdateStoreParams): Promise<Store> {
    const response = await axios.put(`${this.baseUrl}/${data.id}`, data);
    return response.data.store;
  }

  async delete(id: string): Promise<Store> {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data.store;
  }
}
