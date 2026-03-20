import { FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, FileSpreadsheet, Search } from 'lucide-react-native';
import { Stack } from 'expo-router';

import { Box } from '../../components/ui/box';
import { Fab, FabLabel } from '../../components/ui/fab';
import { Center } from '../../components/ui/center';
import { Text } from '../../components/ui/text';
import { Spinner } from '../../components/ui/spinner';
import { Heading } from '../../components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputSlot } from '../../components/ui/input';

import { ProductCard } from '@/components/domain/ProductCard';
import { useProducts } from '@/hooks/useProduct';

export default function Products() {
  const {
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
  } = useProducts();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <Box className="flex-1 bg-slate-50">
        <Stack.Screen options={{ headerShown: false }} />

        <Box className="z-10 border-b border-slate-200 bg-white px-6 pb-6 pt-5">
          <HStack className="mb-5 items-center justify-between">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleGoBack}
              className="h-10 w-10 items-center justify-center rounded-xl bg-blue-50"
            >
              <ChevronLeft size={24} color="#2563eb" strokeWidth={3} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleImportExcel}
              className="flex-row items-center rounded-lg bg-emerald-50 px-3 py-2"
            >
              <FileSpreadsheet size={16} color="#10b981" />
              <Text className="ml-2 text-xs font-bold text-emerald-700">Importar</Text>
            </TouchableOpacity>
          </HStack>

          <Text className="text-xs font-bold uppercase text-blue-600">Loja / Filial</Text>
          <Heading size="2xl" className="font-extrabold text-slate-900">
            {storeName || 'Carregando...'}
          </Heading>

          <Input
            variant="outline"
            size="md"
            className="mt-4 h-12 flex-row items-center rounded-xl border-slate-200 bg-slate-50 px-3"
          >
            <InputSlot>
              <Search size={20} color="#94a3b8" />
            </InputSlot>
            <InputField
              placeholder="Buscar produto..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Input>
        </Box>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" color="$blue600" />
          </Center>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 120, paddingTop: 16, paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <ProductCard product={item} onEdit={handleEditPress} onDelete={handleDeletePress} />
            )}
          />
        )}

        <Fab
          size="lg"
          placement="bottom right"
          className="mb-8 mr-6 rounded-2xl bg-blue-600"
          onPress={handleNavigateToNewProduct}
        >
          <FabLabel className="px-2 font-extrabold text-white">+ Novo Produto</FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}
