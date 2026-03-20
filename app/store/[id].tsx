// app/store/[id].tsx
import { useEffect, useState } from 'react';
import { FlatList, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search } from 'lucide-react-native';

import { Box } from '../../components/ui/box';
import { Fab, FabLabel } from '../../components/ui/fab';
import { Center } from '../../components/ui/center';
import { Text } from '../../components/ui/text';
import { Spinner } from '../../components/ui/spinner';
import { Heading } from '../../components/ui/heading';
import { HStack } from '../../components/ui/hstack';
import { Input, InputField, InputSlot } from '../../components/ui/input';

import { useStoreStore } from '../../store/storeStore';
import { Store } from '../../types/storeDto';
import { StoreCard } from '@/components/domain/StoreCard';

export default function Stores() {
  const router = useRouter();
  const { id: companyId, companyName } = useLocalSearchParams<{
    id: string;
    companyName: string;
  }>();

  const { stores, isLoading, getStoresByCompany, removeStore } = useStoreStore();

  // Estado para armazenar a palavra da busca
  const [searchQuery, setSearchQuery] = useState('');

  // Busca na API passando o searchQuery via debounce (otimiza requisições)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getStoresByCompany(companyId, searchQuery);
    }, 500); // aguarda 500ms depois de parar de digitar para requisitar

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
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <Box className="flex-1 bg-slate-50">
        {/* Header Premium de Navegação */}
        <Box className="z-10 mb-2 rounded-b-3xl border-b border-slate-100 bg-white px-6 py-5 shadow-sm">
          <HStack className="mb-5 items-center">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-xl border border-blue-100/50 bg-blue-50"
            >
              <ChevronLeft size={24} color="#2563eb" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="ml-3 text-sm font-bold text-blue-600">Voltar ao Painel</Text>
          </HStack>

          <Text className="mb-1.5 ml-1 text-[10px] font-bold uppercase tracking-widest text-indigo-600">
            Rede Matriz
          </Text>
          <Heading
            size="3xl"
            className="font-black tracking-tight text-slate-900"
            numberOfLines={1}
          >
            {companyName || 'Carregando...'}
          </Heading>

          <Text className="mb-4 mt-1.5 font-medium leading-relaxed text-slate-500">
            Selecione uma das unidades abaixo para gerenciar o estoque.
          </Text>

          {/* Barra de Pesquisa */}
          <Input
            variant="outline"
            size="md"
            className="h-12 flex-row items-center rounded-xl border-slate-200 bg-slate-50 px-3"
          >
            <InputSlot className="pr-2">
              <Search size={20} color="#94a3b8" />
            </InputSlot>
            <InputField
              placeholder="Buscar loja pelo nome..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="text-slate-800"
            />
          </Input>
        </Box>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" color="$blue600" />
            <Text className="mt-4 animate-pulse font-medium text-slate-500">
              Carregando filiais...
            </Text>
          </Center>
        ) : (
          <FlatList
            // Agora usa stores diretamente da store Zustand
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
              <Center className="mx-2 mt-10 rounded-[32px] border-2 border-dashed border-slate-300 bg-slate-100 p-10">
                <Box className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Text className="text-3xl text-blue-600">🏪</Text>
                </Box>
                <Text className="text-center text-lg font-bold text-slate-700">
                  {searchQuery ? 'Nenhuma loja encontrada' : 'Nenhuma loja cadastrada'}
                </Text>
                <Text className="mt-2 text-center text-sm leading-relaxed text-slate-500">
                  {searchQuery
                    ? 'Tente buscar com outra palavra.'
                    : 'Adicione a primeira loja para esta rede tocando no botão abaixo.'}
                </Text>
              </Center>
            }
          />
        )}

        {/* FAB Estilizado */}
        <Fab
          size="lg"
          placement="bottom right"
          className="mb-8 mr-6 rounded-2xl bg-blue-600 shadow-2xl shadow-blue-600/30 transition-all active:scale-95 active:bg-blue-800"
          onPress={() => router.push('./form-store')}
        >
          <FabLabel className="px-2 py-1 text-base font-extrabold tracking-wide text-white">
            + Nova Loja
          </FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}
