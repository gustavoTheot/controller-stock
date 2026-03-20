import { create } from 'zustand';
import { Store, CreateStoreParams, UpdateStoreParams } from '../types/storeDto';
import { StoreService } from '@/services/storeService';

interface StoreState {
  stores: Store[];
  isLoading: boolean;
  error: string | null;

  getStoresByCompany: (companyId: string, search?: string) => Promise<void>;
  addStore: (data: CreateStoreParams) => Promise<void>;
  updateStore: (data: UpdateStoreParams) => Promise<void>;
  removeStore: (id: string) => Promise<void>;
}

const storeService = new StoreService();

export const useStoreStore = create<StoreState>((set) => ({
  stores: [],
  isLoading: false,
  error: null,

  getStoresByCompany: async (companyId: string, search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await storeService.getAll(companyId, search);
      console.log('', data);
      set({ stores: data });
    } catch (err) {
      set({ error: 'Erro ao carregar lojas', isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  addStore: async (data: CreateStoreParams) => {
    try {
      set({ error: null });
      const newStore = await storeService.create(data);
      set((state) => ({ stores: [...state.stores, newStore] }));
    } catch (err) {
      set({ error: 'Erro ao criar a loja.' });
      throw err;
    }
  },

  updateStore: async (data: UpdateStoreParams) => {
    try {
      set({ error: null });
      const updatedStore = await storeService.update(data);
      set((state) => ({
        stores: state.stores.map((store) => (store.id === updatedStore.id ? updatedStore : store)),
      }));
    } catch (err) {
      set({ error: 'Erro ao atualizar a loja.' });
      throw err;
    }
  },

  removeStore: async (id: string) => {
    try {
      set({ error: null });
      await storeService.delete(id);
      set((state) => ({
        stores: state.stores.filter((store) => store.id !== id),
      }));
    } catch (err) {
      set({ error: 'Erro ao remover a loja.' });
      throw err;
    }
  },
}));
