import axios from 'axios';
import { CompanyServiceInterface } from '../adapters/compnay';
import { Company, CreateCompanyParams, UpdateCompanyParams } from '../types/companyDto';

export class CompanyService implements CompanyServiceInterface {
  private readonly baseUrl = '/api/company' as const;

  async getAll() {
    const response = await axios(this.baseUrl);
    return response.data.companies as Company[];
  }

  async create(data: CreateCompanyParams) {
    const response = await axios.post(this.baseUrl, data);
    return response.data.company;
  }

  async update(data: UpdateCompanyParams) {
    const response = await axios.put(`${this.baseUrl}/${data.id}`, data);
    return response.data.company;
  }

  async delete(id: string) {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data.company;
  }
}
