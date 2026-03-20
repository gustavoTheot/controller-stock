import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useStoreStore } from '../store/storeStore';
import { Store } from '../types/storeDto';

export function useStores() {
  const router = useRouter();
  const { id: companyId, companyName } = useLocalSearchParams<{
    id: string;
    companyName: string;
  }>();

  const { stores, isLoading, getStoresByCompany, removeStore } = useStoreStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getStoresByCompany(companyId, searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [companyId, searchQuery]);

  const handleDeletePress = (storeId: string) => {
    Alert.alert('Atenção', 'Deseja remover esta loja?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removeStore(storeId) },
    ]);
  };

  const handleViewProducts = (storeId: string, storeName: string) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: storeId, storeName },
    });
  };

  const handleEditPress = (store: Store) => {
    router.push({
      pathname: './form-store',
      params: {
        storeId: store.id,
        storeName: store.name,
        storeAddress: store.address,
      },
    });
  };

  const handleNavigateToNewStore = () => router.push('./form-store');
  const handleGoBack = () => router.back();

  return {
    stores,
    isLoading,
    companyName,
    searchQuery,
    setSearchQuery,
    handleDeletePress,
    handleViewProducts,
    handleEditPress,
    handleNavigateToNewStore,
    handleGoBack,
  };
}
