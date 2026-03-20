import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box } from '../components/ui/box';
import { Fab, FabLabel } from '../components/ui/fab';
import { Center } from '../components/ui/center';
import { Text } from '../components/ui/text';
import { Spinner } from '../components/ui/spinner';
import { Heading } from '@/components/ui/heading';

import { Card } from '../components/domain/Card';
import { useHome } from '@/hooks/useHome';

export default function Home() {
  const {
    companies,
    isLoading,
    handleStorePress,
    handleEditPress,
    handleDeletePress,
    handleNavigateToNewCompany,
  } = useHome();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>
      <Box className="flex-1 bg-slate-50">
        <Box className="z-10 border-b border-slate-200 bg-white px-6 pb-6 pt-4 shadow-sm">
          <Text className="mb-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
            Painel de Controle
          </Text>
          <Heading size="3xl" className="font-black tracking-tight text-slate-900">
            Olá, Gustavo
          </Heading>
          <Text className="mt-1.5 font-medium leading-relaxed text-slate-500">
            Gerencie o seu ecossistema de SaaS. Selecione uma rede para visualizar suas filiais.
          </Text>
        </Box>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" color="$blue600" />
            <Text className="mt-4 animate-pulse font-medium text-slate-500">
              Carregando seus dados...
            </Text>
          </Center>
        ) : (
          <FlatList
            data={companies}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120, paddingTop: 20, paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <Card
                company={item}
                onPress={handleStorePress}
                onEdit={handleEditPress}
                onDelete={handleDeletePress}
              />
            )}
            ListEmptyComponent={
              <Center className="mx-2 mt-12 rounded-[32px] border-2 border-dashed border-slate-300 bg-slate-100 p-10">
                <Box className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Text className="text-3xl text-blue-600">🏢</Text>
                </Box>
                <Text className="text-center text-lg font-bold text-slate-700">
                  Nenhuma empresa adicionada
                </Text>
                <Text className="mt-2 text-center text-sm leading-relaxed text-slate-500">
                  Toque no botão flutuante abaixo para registrar a sua primeira rede matriz no sistema.
                </Text>
              </Center>
            }
          />
        )}

        <Fab
          size="lg"
          placement="bottom right"
          className="mb-8 mr-6 rounded-2xl bg-blue-600 shadow-2xl shadow-blue-600/30 transition-all active:scale-95 active:bg-blue-800"
          onPress={handleNavigateToNewCompany}
        >
          <FabLabel className="px-2 py-1 text-base font-extrabold tracking-wide text-white">
            + Nova Empresa
          </FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}
