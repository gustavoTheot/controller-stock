import { useEffect } from 'react';
import { FlatList, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, FileSpreadsheet } from 'lucide-react-native'; // Importamos o icone de excel

import { Box } from '../../components/ui/box';
import { Fab, FabLabel } from '../../components/ui/fab';
import { Center } from '../../components/ui/center';
import { Text } from '../../components/ui/text';
import { Spinner } from '../../components/ui/spinner';
import { Heading } from '../../components/ui/heading';
import { HStack } from '@/components/ui/hstack';

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

  const handleEditPress = (item: Product) => {
    router.push({
      pathname: './form-product',
      params: { 
        productId: item.id, 
        storeId: storeId,
        productName: item.name,
        category: item.category,
        price: item.price?.toString()
      }
    });
  };

  const handleImportExcel = () => {
    Alert.alert(
      "Importar Produtos", 
      "A importação via planilha Excel (.xlsx, .csv) estará disponível em breve!"
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <Box className="flex-1 bg-slate-50">
        <Stack.Screen options={{ headerShown: false }} />
      
        <Box className="px-6 pt-5 pb-6 bg-white border-b border-slate-200 z-10">
          <HStack className="items-center justify-between mb-5">
            <HStack className="items-center">
              <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => router.back()}
                className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center border border-blue-100/50"
              >
                <ChevronLeft size={24} color="#2563eb" strokeWidth={3} />
              </TouchableOpacity>
              <Text className="text-blue-600 font-bold ml-3 text-sm">
                Voltar à Matriz
              </Text>
            </HStack>

            {/* Novo Botão Importar */}
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={handleImportExcel}
              className="px-3 py-2 bg-emerald-50 rounded-lg flex-row items-center border border-emerald-200"
            >
              <FileSpreadsheet size={16} color="#10b981" />
              <Text className="text-emerald-700 font-bold text-xs ml-2">Importar Excel</Text>
            </TouchableOpacity>
          </HStack>

          <Text className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            Loja / Filial
          </Text>
          <Heading size="2xl" className="text-slate-900 font-extrabold tracking-tight">
            {storeName || 'Carregando...'}
          </Heading>
          <Text className="text-slate-500 mt-1 font-medium">
            Gerenciar os estoques e produtos desta unidade.
          </Text>
        </Box>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" color="$blue600" />
            <Text className="text-slate-500 mt-4 font-medium animate-pulse">Carregando...</Text>
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
                onPress={() => {/* pode abrir detalhe futuro */}}
                onEdit={handleEditPress}
                onDelete={handleDeletePress}
              />
            )}
            ListEmptyComponent={
              <Center className="mt-12 p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 mx-4">
                <Box className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
                  <Text className="text-blue-600 text-3xl">📦</Text>
                </Box>
                <Text className="text-slate-400 text-lg font-semibold text-center">
                  Estoque vazio nesta loja.
                </Text>
                <Text className="text-slate-400 text-sm text-center mt-2 leading-relaxed">
                  Importe do excel ou adicione um primeiro produto pelo botão abaixo.
                </Text>
              </Center>
            }
          />
        )}

        <Fab
          size="lg"
          placement="bottom right"
          className="bg-blue-600 rounded-2xl shadow-blue-600/30 shadow-2xl mb-8 mr-6 active:bg-blue-800 active:scale-95 transition-all"
          onPress={() => router.push({ pathname: './form-product', params: { storeId } })}
        >
          <FabLabel className="text-white font-extrabold text-base px-2 py-1 tracking-wide">
            + Novo Produto
          </FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}