import axios from 'axios';
import { ProductServiceInterface } from '../adapters/product';
import { Product } from '../types/productDto';

export class ProductService implements ProductServiceInterface {
  private readonly baseUrl = '/api/products' as const;

  async getAll() {
    const response = await axios(this.baseUrl);
    return response.data;
  }

  async create(data: Product) {
    const response = await axios.post(this.baseUrl, data);
    return response.data;
  }

  async update(data: Product) {
    const response = await axios.put(`${this.baseUrl}/${data.id}`, data);
    return response.data;
  }

  async delete(id: string) {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }
}
