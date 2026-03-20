import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCompanyStore } from '@/store/companyStore';
import { Company } from '../types/companyDto';

export function useHome() {
  const router = useRouter();

  const { companies, isLoading, removeCompany, getCompanies } = useCompanyStore();

  useEffect(() => {
    getCompanies();
  }, []);

  const handleStorePress = (companyId: string, companyName: string) => {
    router.push({
      pathname: '/store/[id]',
      params: { id: companyId, companyName: companyName },
    });
  };

  const handleEditPress = (company: Company) => {
    router.push({
      pathname: '/company/form-company',
      params: {
        companyId: company.id,
        companyName: company.name,
      },
    });
  };

  const handleDeletePress = (companyId: string) => {
    Alert.alert(
      'Confirmar Remoção',
      'Tem certeza que deseja apagar esta empresa? Isso removerá também todas as suas lojas e produtos associados.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeCompany(companyId);
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível remover a empresa.');
            }
          },
        },
      ],
    );
  };

  const handleNavigateToNewCompany = () => {
    router.push('/company/form-company');
  };

  return {
    companies,
    isLoading,
    handleStorePress,
    handleEditPress,
    handleDeletePress,
    handleNavigateToNewCompany,
  };
}
