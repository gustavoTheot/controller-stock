// hooks/useProducts.ts
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types/productDto';

export function useProducts() {
  const router = useRouter();
  const { id: storeId, storeName } = useLocalSearchParams<{ id: string; storeName: string }>();

  const { products, isLoading, getProducts, deleteProduct } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getProducts(storeId, searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [storeId, searchQuery]);

  const handleDeletePress = (productId: string) => {
    Alert.alert('Atenção', 'Deseja remover este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => deleteProduct(productId, storeId) },
    ]);
  };

  const handleEditPress = (item: Product) => {
    router.push({
      pathname: './form-product',
      params: {
        productId: item.id,
        storeId: storeId,
        productName: item.name,
        category: item.category,
        price: item.price?.toString(),
        quantity: item.quantity?.toString(),
      },
    });
  };

  const handleImportExcel = () => {
    Alert.alert('Importar Produtos', 'A importação via planilha estará disponível em breve!');
  };

  const handleNavigateToNewProduct = () =>
    router.push({ pathname: './form-product', params: { storeId } });
  const handleGoBack = () => router.back();

  return {
    products,
    isLoading,
    storeName,
    searchQuery,
    setSearchQuery,
    handleDeletePress,
    handleEditPress,
    handleImportExcel,
    handleNavigateToNewProduct,
    handleGoBack,
  };
}
