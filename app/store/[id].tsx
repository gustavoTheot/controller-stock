import { useEffect } from 'react';
import { FlatList, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

import { Box } from '../../components/ui/box';
import { Fab, FabLabel } from '../../components/ui/fab';
import { Center } from '../../components/ui/center';
import { Text } from '../../components/ui/text';
import { Spinner } from '../../components/ui/spinner';
import { Heading } from '../../components/ui/heading';
import { HStack } from '../../components/ui/hstack';

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
    Alert.alert("Atenção", "Deseja remover esta loja?", [
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
      pathname: './form-store',
      params: { 
        storeId: store.id, 
        storeName: store.name ,
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <Box className="flex-1 bg-slate-50">      
        
        <Box className="px-6 py-5 bg-white border-b border-slate-100 z-10 shadow-sm rounded-b-3xl mb-2">
          <HStack className="items-center mb-5">
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center border border-blue-100/50"
            >
              <ChevronLeft size={24} color="#2563eb" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="text-blue-600 font-bold ml-3 text-sm">
              Voltar ao Painel
            </Text>
          </HStack>
          
          <Text className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-1.5 ml-1">
            Rede Matriz
          </Text>
          <Heading size="3xl" className="text-slate-900 font-black tracking-tight" numberOfLines={1}>
            {companyName || 'Carregando...'}
          </Heading>
          <Text className="text-slate-500 mt-1.5 font-medium leading-relaxed">
            Selecione uma das unidades abaixo para gerenciar o estoque.
          </Text>
        </Box>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" color="$blue600" />
            <Text className="text-slate-500 mt-4 font-medium animate-pulse">Carregando filiais...</Text>
          </Center>
        ) : (
          <FlatList
            data={stores}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120, paddingTop: 12, paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <StoreCard 
                store={item} 
                onPress={handleViewProducts}
                onEdit={handleEditPress}
                onDelete={handleDeletePress}
              />
            )}
            ListEmptyComponent={
              <Center className="mt-10 p-10 border-2 border-dashed border-slate-300 rounded-[32px] bg-slate-100 mx-2">
                <Box className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
                  <Text className="text-blue-600 text-3xl">🏪</Text>
                </Box>
                <Text className="text-slate-700 text-lg font-bold text-center">
                  Nenhuma loja encontrada
                </Text>
                <Text className="text-slate-500 text-sm text-center mt-2 leading-relaxed">
                  Adicione a primeira loja para esta rede tocando no botão abaixo.
                </Text>
              </Center>
            }
          />
        )}

        {/* FAB Estilizado */}
        <Fab
          size="lg"
          placement="bottom right"
          className="bg-blue-600 rounded-2xl shadow-blue-600/30 shadow-2xl mb-8 mr-6 active:bg-blue-800 active:scale-95 transition-all"
          onPress={() => router.push('./form-store')}
        >
          <FabLabel className="text-white font-extrabold text-base px-2 py-1 tracking-wide">
            + Nova Loja
          </FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}