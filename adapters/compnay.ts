import { Company } from '../types/companyDto';

export interface CompanyServiceInterface {
  getAll(): Promise<Company[]>;
  create: (data: Company) => Promise<Company>;
  update: (data: Company) => Promise<Company>;
  delete: (id: string) => Promise<Company>;
}
