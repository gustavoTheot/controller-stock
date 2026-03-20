export interface Company {
  id: string;
  name: string;
}

export interface CreateCompanyParams {
  name: string;
}

export interface UpdateCompanyParams {
  id: string;
  name: string;
}
