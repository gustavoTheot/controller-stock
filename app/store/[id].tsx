import { FlatList, TouchableOpacity } from 'react-native';
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

import { StoreCard } from '@/components/domain/StoreCard';
import { useStores } from '@/hooks/useStore';

export default function Stores() {
  const {
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
  } = useStores();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <Box className="flex-1 bg-slate-50">
        <Box className="z-10 mb-2 rounded-b-3xl border-b border-slate-100 bg-white px-6 py-5 shadow-sm">
          <HStack className="mb-5 items-center">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleGoBack}
              className="h-10 w-10 items-center justify-center rounded-xl border border-blue-100/50 bg-blue-50"
            >
              <ChevronLeft size={24} color="#2563eb" strokeWidth={3} />
            </TouchableOpacity>
            <Text className="ml-3 text-sm font-bold text-blue-600">Voltar ao Painel</Text>
          </HStack>

          <Text className="mb-1.5 ml-1 text-[10px] font-bold uppercase tracking-widest text-indigo-600">Empresa Matriz</Text>
          <Heading
            size="3xl"
            className="font-black tracking-tight text-slate-900"
            numberOfLines={1}
          >
            {companyName || 'Carregando...'}
          </Heading>

          <Input
            variant="outline"
            size="md"
            className="mt-4 h-12 flex-row items-center rounded-xl border-slate-200 bg-slate-50 px-3"
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
          </Center>
        ) : (
          <FlatList
            data={stores}
            keyExtractor={(item) => item.id}
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
              <Center className="mt-10 p-10">
                <Text className="font-bold text-slate-700">Nenhuma loja encontrada</Text>
              </Center>
            }
          />
        )}

        <Fab
          size="lg"
          placement="bottom right"
          className="mb-8 mr-6 rounded-2xl bg-blue-600"
          onPress={handleNavigateToNewStore}
        >
          <FabLabel className="px-2 font-extrabold text-white">+ Nova Loja</FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}
