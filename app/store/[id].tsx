// app/company/[id].tsx
import { useCallback, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';

import { Box } from '../../components/ui/box';
import { Fab, FabLabel } from '../../components/ui/fab';
import { Center } from '../../components/ui/center';
import { Text } from '../../components/ui/text';
import { Spinner } from '../../components/ui/spinner';
import { VStack } from '../../components/ui/vstack';
import { Heading } from '../../components/ui/heading';
import { Button, ButtonText } from '../../components/ui/button';

import { useStoreStore } from '../../store/storeStore';
import { Store } from '../../types/storeDto';
import { StoreCard } from '@/components/domain/StoreCard';

export default function Stores() {
  const router = useRouter();  
  const { id: companyId, companyName } = useLocalSearchParams<{ id: string, companyName: string }>();
  
  const { stores, isLoading, getStoresByCompany, removeStore } = useStoreStore();

  useEffect(() => {
    getStoresByCompany(companyId);
  }, [companyId]);

  const handleDeletePress = (storeId: string) => {
    Alert.alert("Atenção", "Deseja remover esta filial?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: () => removeStore(storeId) }
    ]);
  };

   const handleViewProducts = (storeId: string, storeName: string) => {    
    router.push({
      pathname: '/product/[id]',
      params: { id: storeId, storeName }
    });
  };

  const handleEditPress = (store: Store) => {
    router.push({
      pathname: './new-store',
      params: { 
        storeId: store.id, 
        storeName: store.name ,
      }
    });
  };

  return (
    <Box className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header Premium de Navegação */}
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
          {companyName || 'Carregando...'}
        </Heading>
        <Text className="text-slate-500 mt-1 font-medium">
          Gerencie as unidades físicas desta rede.
        </Text>
      </Box>

      {isLoading ? (
        <Center className="flex-1">
          <Spinner size="large" color="$blue600" />
          <Text className="text-slate-500 mt-4 font-medium">Carregando...</Text>
        </Center>
      ) : (
        <FlatList
          data={stores}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 16, paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <StoreCard 
              store={item} 
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

      {/* FAB Estilizado */}
      <Fab
        size="lg"
        placement="bottom right"
        className="bg-blue-600 rounded-full shadow-xl mb-6 mr-4 active:bg-blue-800"
        onPress={() => router.push('./new-store')}
      >
        <FabLabel className="text-white font-bold text-base px-3">+ Nova Filial</FabLabel>
      </Fab>
    </Box>
  );
}