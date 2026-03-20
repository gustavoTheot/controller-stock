// app/company/[id].tsx
import { useCallback, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect, Stack } from 'expo-router';

import { Box } from '../../components/ui/box';
import { Fab, FabLabel } from '../../components/ui/fab';
import { Center } from '../../components/ui/center';
import { Text } from '../../components/ui/text';
import { Spinner } from '../../components/ui/spinner';
import { Heading } from '../../components/ui/heading';
import { Button, ButtonText } from '../../components/ui/button';

import { Store } from '../../types/storeDto';
import { Card } from '@/components/domain/Card';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/domain/ProductCard';
import { Product } from '@/types/productDto';

export default function Products() {
  const router = useRouter();  
  const { id: storeId, storeName } = useLocalSearchParams<{ id: string, storeName: string }>();
  
  const { products, isLoading, getProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    getProducts(storeId);
  }, [storeId]);

  const handleDeletePress = (productId: string) => {
    Alert.alert("Atenção", "Deseja remover este produto?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: () => deleteProduct(productId) }
    ]);
  };

  const handleViewProducts = (producId: string, productName: string) => {    
    router.push({
      pathname: '/product/[id]',
      params: { id: producId, productName }
    });
  };

  const handleEditPress = (item: Product) => {
    router.push({
      pathname: './new-product',
      params: { 
        storeId: item.id, 
        storeName: item.name ,
      }
    });
  };

  return (
    <Box className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />
    
      <Box className="px-6 pt-12 pb-6 bg-white border-b border-slate-200 z-10">
        <Button 
          variant="link" 
          size="sm" 
          className="p-0 mb-2 h-auto w-16 justify-start" 
          onPress={() => router.back()}
        >
          <ButtonText className="text-blue-600 font-bold">← Voltar</ButtonText>
        </Button>
        <Text className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
          Filiais
        </Text>
        <Heading size="2xl" className="text-slate-900 font-extrabold tracking-tight">
          {storeName || 'Carregando...'}
        </Heading>
        <Text className="text-slate-500 mt-1 font-medium">
          Gerenciar os estoques e produtos desta empresa.
        </Text>
      </Box>

      {isLoading ? (
        <Center className="flex-1">
          <Spinner size="large" color="$blue600" />
          <Text className="text-slate-500 mt-4 font-medium">Carregando...</Text>
        </Center>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 16, paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onPress={handleViewProducts}
              onEdit={handleEditPress}
              onDelete={handleDeletePress}
            />
    )}
          ListEmptyComponent={
            <Center className="mt-12 p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 mx-4">
              <Text className="text-slate-400 text-lg font-semibold text-center">
                Nenhuma empresa por aqui ainda.
              </Text>
              <Text className="text-slate-400 text-sm text-center mt-2">
                Clique no botão abaixo para adicionar o seu primeiro cliente.
              </Text>
            </Center>
          }
        />
      )}

      <Fab
        size="lg"
        placement="bottom right"
        className="bg-blue-600 rounded-full shadow-xl mb-6 mr-4 active:bg-blue-800"
        onPress={() => console.log("Navegar para criar nova loja (em breve)")} // router.push(`/new-store?producId=${producId}`)
      >
        <FabLabel className="text-white font-bold text-base px-3">+ Nova Filial</FabLabel>
      </Fab>
    </Box>
  );
}