// app/product/[id].tsx
import { useEffect, useState } from 'react';
import { FlatList, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, FileSpreadsheet, Search } from 'lucide-react-native';

import { Box } from '../../components/ui/box';
import { Fab, FabLabel } from '../../components/ui/fab';
import { Center } from '../../components/ui/center';
import { Text } from '../../components/ui/text';
import { Spinner } from '../../components/ui/spinner';
import { Heading } from '../../components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputSlot } from '../../components/ui/input';

import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/domain/ProductCard';
import { Product } from '@/types/productDto';

export default function Products() {
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
      { text: 'Remover', style: 'destructive', onPress: () => deleteProduct(productId) },
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
      },
    });
  };

  const handleImportExcel = () => {
    Alert.alert(
      'Importar Produtos',
      'A importação via planilha Excel (.xlsx, .csv) estará disponível em breve!',
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <Box className="flex-1 bg-slate-50">
        <Stack.Screen options={{ headerShown: false }} />

        <Box className="z-10 border-b border-slate-200 bg-white px-6 pb-6 pt-5">
          <HStack className="mb-5 items-center justify-between">
            <HStack className="items-center">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.back()}
                className="h-10 w-10 items-center justify-center rounded-xl border border-blue-100/50 bg-blue-50"
              >
                <ChevronLeft size={24} color="#2563eb" strokeWidth={3} />
              </TouchableOpacity>
              <Text className="ml-3 text-sm font-bold text-blue-600">Voltar à Matriz</Text>
            </HStack>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleImportExcel}
              className="flex-row items-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2"
            >
              <FileSpreadsheet size={16} color="#10b981" />
              <Text className="ml-2 text-xs font-bold text-emerald-700">Importar</Text>
            </TouchableOpacity>
          </HStack>

          <Text className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-600">
            Loja / Filial
          </Text>
          <Heading size="2xl" className="font-extrabold tracking-tight text-slate-900">
            {storeName || 'Carregando...'}
          </Heading>

          <Text className="mb-4 mt-1 font-medium text-slate-500">
            Gerenciar os estoques e produtos desta unidade.
          </Text>

          <Input
            variant="outline"
            size="md"
            className="h-12 flex-row items-center rounded-xl border-slate-200 bg-slate-50 px-3"
          >
            <InputSlot className="pr-2">
              <Search size={20} color="#94a3b8" />
            </InputSlot>
            <InputField
              placeholder="Buscar produto cadastrado..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="text-slate-800"
            />
          </Input>
        </Box>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" color="$blue600" />
            <Text className="mt-4 animate-pulse font-medium text-slate-500">Carregando...</Text>
          </Center>
        ) : (
          <FlatList
            // Agora usa o products da store sem um filter intermediário
            data={products}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120, paddingTop: 16, paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => {
                  /* pode abrir detalhe futuro */
                }}
                onEdit={handleEditPress}
                onDelete={handleDeletePress}
              />
            )}
            ListEmptyComponent={
              <Center className="mx-4 mt-12 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8">
                <Box className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Text className="text-3xl text-blue-600">📦</Text>
                </Box>
                <Text className="text-center text-lg font-semibold text-slate-400">
                  {searchQuery ? 'Produto não encontrado.' : 'Estoque vazio nesta loja.'}
                </Text>
                <Text className="mt-2 text-center text-sm leading-relaxed text-slate-400">
                  {searchQuery
                    ? 'Remova o filtro para ver todos.'
                    : 'Importe do excel ou adicione um primeiro produto pelo botão abaixo.'}
                </Text>
              </Center>
            }
          />
        )}

        <Fab
          size="lg"
          placement="bottom right"
          className="mb-8 mr-6 rounded-2xl bg-blue-600 shadow-2xl shadow-blue-600/30 transition-all active:scale-95 active:bg-blue-800"
          onPress={() => router.push({ pathname: './form-product', params: { storeId } })}
        >
          <FabLabel className="px-2 py-1 text-base font-extrabold tracking-wide text-white">
            + Novo Produto
          </FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}
