// app/index.tsx
import { useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box } from '../components/ui/box';
import { Fab, FabLabel } from '../components/ui/fab';
import { Center } from '../components/ui/center';
import { Text } from '../components/ui/text';
import { Spinner } from '../components/ui/spinner';
import { Heading } from '@/components/ui/heading';

import { Card } from '../components/domain/Card';
import { Company } from '../types/companyDto';
import { useCompanyStore } from '@/store/companyStore';

export default function Home() {
  const router = useRouter();
  const { companies, isLoading, removeCompany, getCompanies } = useCompanyStore();

  useEffect(() => {
    getCompanies();
  }, []);

  const handleStorePress = (storeId: string, companyName: string) => {    
    router.push({
      pathname: '/store/[id]',
      params: { id: storeId, companyName: companyName }
    });
  };

  const handleEditPress = (company: Company) => {
    router.push({
      pathname: '/form-company',
      params: { 
        companyId: company.id, 
        companyName: company.name 
      }
    });
  };

  const handleDeletePress = (companyId: string) => {
    Alert.alert(
      "Confirmar Remoção",
      "Tem certeza que deseja apagar esta empresa? Isso removerá também todas as suas lojas e produtos associados.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => {
          removeCompany(companyId).catch(() => {
            Alert.alert("Erro", "Não foi possível remover a empresa.");
          });
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>
      <Box className="flex-1 bg-slate-50">
        {/* Header Premium */}
        <Box className="px-6 pt-4 pb-6 bg-white border-b border-slate-200 z-10 shadow-sm">
          <Text className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1.5">
            Painel de Controle
          </Text>
          <Heading size="3xl" className="text-slate-900 font-black tracking-tight">
            Olá, Gustavo
          </Heading>
          <Text className="text-slate-500 mt-1.5 font-medium leading-relaxed">
            Gerencie o seu ecossistema de SaaS. Selecione uma rede para visualizar suas filiais.
          </Text>
        </Box>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" color="$blue600" />
            <Text className="text-slate-500 mt-4 font-medium animate-pulse">Carregando seus dados...</Text>
          </Center>
        ) : (
          <FlatList
            data={companies}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120, paddingTop: 20, paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <Card 
                item={item} 
                onPress={handleStorePress}
                onEdit={handleEditPress}
                onDelete={handleDeletePress}
              />
            )}
            ListEmptyComponent={
              <Center className="mt-12 p-10 border-2 border-dashed border-slate-300 rounded-[32px] bg-slate-100 mx-2">
                <Box className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
                  <Text className="text-blue-600 text-3xl">🏢</Text>
                </Box>
                <Text className="text-slate-700 text-lg font-bold text-center">
                  Nenhuma empresa adicionada
                </Text>
                <Text className="text-slate-500 text-sm text-center mt-2 leading-relaxed">
                  Toque no botão flutuante abaixo para registrar a sua primeira rede matriz no sistema.
                </Text>
              </Center>
            }
          />
        )}

        {/* Fab Melhorado */}
        <Fab
          size="lg"
          placement="bottom right"
          className="bg-blue-600 rounded-2xl shadow-blue-600/30 shadow-2xl mb-8 mr-6 active:bg-blue-800 active:scale-95 transition-all"
          onPress={() => router.push('/form-company')}
        >
          <FabLabel className="text-white font-extrabold text-base px-2 py-1 tracking-wide">
            + Nova Empresa
          </FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}