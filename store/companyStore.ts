import { create } from 'zustand';
import { Company, CreateCompanyParams, UpdateCompanyParams } from '../types/companyDto';
import { CompanyService } from '../services/companyServer'; // Ajuste o caminho se necessário
import Toast from 'react-native-toast-message';

const companyService = new CompanyService();

interface CompanyState {
  companies: Company[];
  isLoading: boolean;
  error: string | null;

  getCompanies: () => Promise<void>;
  addCompany: (data: CreateCompanyParams) => Promise<void>;
  updateCompany: (data: UpdateCompanyParams) => Promise<void>;
  removeCompany: (id: string) => Promise<void>;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],
  isLoading: false,
  error: null,

  getCompanies: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await companyService.getAll();
      set({ companies: data });
    } catch (err) {
      set({ error: 'Erro ao carregar empresas', isLoading: false });
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  addCompany: async (data: CreateCompanyParams) => {
    try {
      set({ error: null });
      const newCompany = await companyService.create(data);

      set((state) => ({ companies: [...state.companies, newCompany] }));

      Toast.show({
        type: 'success',
        text1: 'Empresa Adicionada!',
      });
    } catch (err) {
      set({ error: 'Erro ao criar a empresa.' });

      Toast.show({
        type: 'error',
        text1: 'Erro ao adicionar empresa!',
      });
      throw err;
    }
  },

  updateCompany: async (data: UpdateCompanyParams) => {
    try {
      set({ error: null });
      const updatedCompany = await companyService.update(data);

      set((state) => ({
        companies: state.companies.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company,
        ),
      }));

      Toast.show({
        type: 'success',
        text1: 'Empresa Atualizada!',
      });
    } catch (err) {
      set({ error: 'Erro ao atualizar a empresa.' });

      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar empresa!',
      });
      throw err;
    }
  },

  removeCompany: async (id: string) => {
    try {
      set({ error: null });
      await companyService.delete(id);

      set((state) => ({
        companies: state.companies.filter((company) => company.id !== id),
      }));

      Toast.show({
        type: 'success',
        text1: 'Empresa Removida!',
      });
    } catch (err) {
      set({ error: 'Erro ao remover a empresa.' });

      Toast.show({
        type: 'error',
        text1: 'Erro ao remover empresa!',
      });
      throw err;
    }
  },
}));
