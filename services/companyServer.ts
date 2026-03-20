import axios from 'axios';
import { CompanyServiceInterface } from '../adapters/compnay';
import { Company } from '../types/companyDto';

export class CompanyService implements CompanyServiceInterface {
  private readonly baseUrl = '/api/company' as const;

  async getAll() {
    const response = await axios(this.baseUrl);
    return response.data.company as Company[];
  }

  async create(data: Company) {
    const response = await axios.post(this.baseUrl, data);
    return response.data.company;
  }

  async update(data: Company) {
    const response = await axios.put(`${this.baseUrl}/${data.id}`, data);
    return response.data.company;
  }

  async delete(id: string) {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data.company;
  }
}
