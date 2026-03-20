import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCompanyStore } from '@/store/companyStore';

export function useCompanyForm() {
  const router = useRouter();

  const { companyId, companyName } = useLocalSearchParams<{
    companyId: string;
    companyName: string;
  }>();

  const isEditing = !!companyId;
  const { addCompany, updateCompany } = useCompanyStore();

  const [name, setName] = useState('');
  const [isLoadingSaving, setIsLoadingSaving] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isEditing && companyName) {
      setName(companyName);
    }
  }, [isEditing, companyName]);

  const handleSave = async () => {
    if (!name.trim()) {
      setValidationError('O nome da empresa é obrigatório.');
      return;
    }

    try {
      setIsLoadingSaving(true);
      setValidationError('');

      const params = { name: name.trim() };

      if (isEditing) {
        await updateCompany({ id: companyId, ...params });
      } else {
        await addCompany(params);
      }

      router.back();
    } catch (err) {
      setValidationError('Ocorreu um erro ao salvar a empresa. Tente novamente.');
    } finally {
      setIsLoadingSaving(false);
    }
  };

  const handleCancel = () => router.back();

  return {
    isEditing,
    companyId,
    name,
    setName,
    isLoadingSaving,
    validationError,
    setValidationError,
    handleSave,
    handleCancel,
  };
}
