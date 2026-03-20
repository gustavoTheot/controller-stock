import { create } from 'zustand';
import { Product, ProductParams } from '../types/productDto';
import { ProductService } from '../services/productService';
import { useStoreStore } from './storeStore';
import Toast from 'react-native-toast-message';

const productService = new ProductService();

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  getProducts: (storeId: string, search?: string) => Promise<void>;
  addProduct: (data: ProductParams) => Promise<void>;
  updateProduct: (data: ProductParams) => Promise<void>;
  saveProduct: (data: Product) => Promise<void>;
  removeProduct: (id: string, storeId: string) => Promise<void>;
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

      if (data.storeId) {
        useStoreStore.getState().incrementProductCount(data.storeId);
      }

      Toast.show({
        type: 'success',
        text1: 'Produto Adicionado!',
      });
    } catch (err) {
      set({ error: 'Erro ao criar o produto.' });

      Toast.show({
        type: 'error',
        text1: 'Erro ao adicionar produto!',
      });
      throw err;
    }
  },

  updateProduct: async (data: ProductParams) => {
    try {
      set({ error: null });
      const response = await productService.update(data);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === response.id ? response : product,
        ),
      }));

      Toast.show({
        type: 'success',
        text1: 'Produto Atualizado!',
      });
    } catch (err) {
      set({ error: 'Erro ao atualizar o produto.' });

      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar produto!',
      });
      throw err;
    }
  },

  saveProduct: async (data: Product) => {
    if (data.id) {
      await get().updateProduct(data);
    } else {
      await get().addProduct(data);
    }
  },

  removeProduct: async (id: string, storeId: string) => {
    if (!id) {
      console.warn('Tentativa de remover um produto sem ID.');
      return;
    }

    try {
      set({ error: null });
      await productService.delete(id);

      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));

      if (storeId) {
        useStoreStore.getState().decrementProductCount(storeId);
      }

      Toast.show({
        type: 'success',
        text1: 'Produto Removido!',
      });
    } catch (err) {
      set({ error: 'Erro ao deletar o produto.' });

      Toast.show({
        type: 'error',
        text1: 'Erro ao remover produto!',
      });
      throw err;
    }
  },
}));
