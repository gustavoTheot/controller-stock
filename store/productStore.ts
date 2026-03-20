import { create } from 'zustand';
import { Product, ProductParams } from '../types/productDto';
import { ProductService } from '../services/productService';

const productService = new ProductService();

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  getProducts: (storeId: string, search?: string) => Promise<void>;
  addProduct: (data: ProductParams) => Promise<void>;
  updateProduct: (data: ProductParams) => Promise<void>;
  saveProduct: (data: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  getProducts: async (storeId: string, search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await productService.getAll(storeId, search);
      set({ products: data });
    } catch (err) {
      set({
        error: 'Não foi possível carregar os produtos. Tente novamente mais tarde.',
        isLoading: false,
      });
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (data: ProductParams) => {
    try {
      set({ error: null });
      const response = await productService.create(data);
      set((state) => ({ products: [...state.products, response] }));
    } catch (err) {
      set({ error: 'Erro ao criar o produto.' });
      throw err;
    }
  },

  updateProduct: async (data: ProductParams) => {
    try {
      set({ error: null });
      const response = await productService.update(data);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === response.id ? response : product
        ),
      }));
    } catch (err) {
      set({ error: 'Erro ao atualizar o produto.' });
      throw err;
    }
  },

  saveProduct: async (data: Product) => {
    // Usamos 'get()' para acessar funções dentro da própria store
    if (data.id) {
      await get().updateProduct(data);
    } else {
      await get().addProduct(data);
    }
  },

  deleteProduct: async (id: string) => {
    try {
      set({ error: null });
      await productService.delete(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
    } catch (err) {
      set({ error: 'Erro ao deletar o produto.' });
      throw err;
    }
  },
}));