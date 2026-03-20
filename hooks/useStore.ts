import { useState, useEffect, useCallback } from 'react';
import { CreateStoreParams, Store, UpdateStoreParams } from '../types/storeDto';
import { StoreService } from '../services/storeService';

export function useStores() {
  const storeService = new StoreService();

  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Usamos useCallback para que a função não seja recriada a cada renderização,
  // otimizando a performance do React.
  const getStore = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await storeService.getAll();
      setStores(data);
    } catch (err) {
      setError('Não foi possível carregar as lojas. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Exemplo de como envelopar a criação para a UI usar facilmente:
  const addStore = async (data: CreateStoreParams) => {
    try {
      setError(null);
      const response = await storeService.create(data);

      setStores((prev) => [...prev, response]);
    } catch (err) {
      setError('Erro ao criar a loja.');
      throw err;
    }
  };

  const updateStore = async (data: UpdateStoreParams) => {
    try {
      setError(null);
      const response = await storeService.update(data);

      setStores((prev) =>
        prev.map((store) => (store.id === response.id ? response : store)),
      );
    } catch (err) {
      setError('Erro ao atualizar a loja.');
      throw err;
    }
  };

  const saveStore = async (data: Store) => {
    if (data.id) {
      await updateStore(data);
    } else {
      await addStore(data);
    }
  };

  const removeStore = async (id: string) => {
    try {
      setError(null);
      await storeService.delete(id);

      setStores((prev) => prev.filter((store) => store.id !== id));
    } catch (err) {
      setError('Erro ao deletar a loja.');
      throw err;
    }
  };

  useEffect(() => {
    getStore();
  }, [getStore]);

  return {
    stores,
    isLoading,
    error,
    getStore,
    removeStore,
    saveStore,
  };
}
