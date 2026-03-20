import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useStoreStore } from '../store/storeStore';

export function useStoreForm() {
  const router = useRouter();

  const { storeId, storeName, storeAddress } = useLocalSearchParams<{
    storeId: string;
    storeName: string;
    storeAddress?: string;
  }>();

  const isEditing = !!storeId;
  const { addStore, updateStore } = useStoreStore();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isLoadingSaving, setIsLoadingSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; address?: string; general?: string }>({});

  useEffect(() => {
    if (isEditing) {
      if (storeName) setName(storeName);
      if (storeAddress) setAddress(storeAddress);
    }
  }, [isEditing, storeName, storeAddress]);

  const validate = () => {
    let newErrors: { name?: string; address?: string } = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'O nome da loja é obrigatório.';
      isValid = false;
    }

    if (!address.trim()) {
      newErrors.address = 'O endereço/CEP é obrigatório.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setIsLoadingSaving(true);
      setErrors({});

      const params = {
        name: name.trim(),
        address: address.trim(),
      };

      if (isEditing) {
        await updateStore({ id: storeId, ...params });
      } else {
        await addStore(params);
      }

      router.back();
    } catch (err) {
      setErrors({ general: 'Ocorreu um erro ao salvar a loja. Tente novamente.' });
    } finally {
      setIsLoadingSaving(false);
    }
  };

  const handleCancel = () => router.back();

  return {
    isEditing,
    storeId,
    name,
    setName,
    address,
    setAddress,
    errors,
    setErrors,
    isLoadingSaving,
    handleSave,
    handleCancel,
  };
}
