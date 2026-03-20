export interface Store {
  id: string;
  companyId: string;
  name: string;
  address: string;
  quantityOfProducts: number;
}

export interface CreateStoreParams {
  name: string;
  address: string;
}

export interface UpdateStoreParams {
  id: string;
  name?: string;
  address?: string;
}
