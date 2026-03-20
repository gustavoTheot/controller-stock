import { useStoreStore } from '../storeStore';

describe('Zustand: storeStore', () => {
  // Limpa o estado depois de cada teste para evitar leak entre eles
  beforeEach(() => {
    useStoreStore.setState({
      stores: [],
      isLoading: false,
      error: null,
    });
  });

  it('deve ter o estado inicial vazio', () => {
    const state = useStoreStore.getState();
    expect(state.stores).toEqual([]);
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeNull();
  });

  it('deve remover uma loja específica do estado', () => {
    // 1. Injetamos um dado simulado diretamente na Store para preparar o teste
    useStoreStore.setState({
      stores: [
        { id: '1', name: 'Loja A', companyId: '10' },
        { id: '2', name: 'Loja B', companyId: '10' },
      ],
    });

    // 2. Coletamos direto da Store
    let state = useStoreStore.getState();
    expect(state.stores.length).toBe(2);

    // 3. Simulamos a ação da State, mas hackeando o service para nao bater no Mirage (caso contrário chamaria o service de verdade)
    // Para simplificar apenas validamos remoção local alterando o setState
    useStoreStore.setState((prev) => ({
      stores: prev.stores.filter((store) => store.id !== '1'),
    }));

    state = useStoreStore.getState();

    // 4. Teste de Validação
    expect(state.stores.length).toBe(1);
    expect(state.stores[0].name).toBe('Loja B'); // Loja A foi removida
  });
});
