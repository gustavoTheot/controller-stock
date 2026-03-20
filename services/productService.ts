import axios from 'axios';
import { ProductServiceInterface } from '../adapters/product';
import { ProductParams } from '../types/productDto';

export class ProductService implements ProductServiceInterface {
  private readonly baseUrl = '/api/products' as const;

  async getAll(storeId: string, search?: string) {
    const response = await axios.get(`${this.baseUrl}`, {
      params: { storeId, search },
    });
    return response.data.products || [];
  }

  async create(data: ProductParams) {
    const payload = { ...data };
    if (!payload.id) {
      delete payload.id;
    }

    const response = await axios.post(this.baseUrl, payload);
    return response.data.product;
  }

  async update(data: ProductParams) {
    const response = await axios.put(`${this.baseUrl}/${data.id}`, data);
    return response.data.product;
  }

  async delete(id: string) {
    if (!id) throw new Error('O ID do produto é obrigatório para a deleção.');
    await axios.delete(`${this.baseUrl}/${id}`);
  }
}
