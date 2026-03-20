// app/index.tsx
import { useState, useRef, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { Box } from '../components/ui/box';
import { Fab, FabLabel } from '../components/ui/fab';
import { Center } from '../components/ui/center';
import { Text } from '../components/ui/text';
import { Spinner } from '../components/ui/spinner';

import { Card } from '../components/domain/Card';
import { Company } from '../types/companyDto';
import { useCompanyStore } from '@/store/companyStore';
import { Heading } from '@/components/ui/heading';

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
      pathname: '/new-company',
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
    <Box className="flex-1 bg-slate-50">
      <Box className="px-6 pt-12 pb-6 bg-white border-b border-slate-200 z-10">
        <Text className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
          Painel de Controle
        </Text>
        <Heading size="2xl" className="text-slate-900 font-extrabold tracking-tight">
          Olá, Gustavo
        </Heading>
        <Text className="text-slate-500 mt-1 font-medium">
          Gerencie o seu ecossistema de SaaS.
        </Text>
      </Box>

      {isLoading ? (
        <Center className="flex-1">
          <Spinner size="large" color="$blue600" />
          <Text className="text-slate-500 mt-4 font-medium">Carregando...</Text>
        </Center>
      ) : (
        <FlatList
          data={companies}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 16, paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <Card 
              item={item} 
              onPress={handleStorePress}
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
        className="bg-blue-600 rounded-full shadow-xl mb-6 mr-4 active:bg-blue-800 active:scale-95 transition-transform"
        onPress={() => router.push('/new-company')}
      >
        <FabLabel className="text-white font-bold text-base px-3 tracking-wide">
          + Nova Empresa
        </FabLabel>
      </Fab>
    </Box>
  );
}