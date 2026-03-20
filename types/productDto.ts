export interface Product {
  id: string;
  storeId: string;
  name: string;
  category: string;
  quantity?: number;
  price?: number;
  sku?: string;
}

export interface ProductParams {
  id?: string;
  storeId?: string;
  name?: string;
  category?: string;
  quantity?: number;
  price?: number;
  sku?: string;
}
