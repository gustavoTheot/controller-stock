import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { Box } from '../../components/ui/box';
import { VStack } from '../../components/ui/vstack';
import { Heading } from '../../components/ui/heading';
import { Text } from '../../components/ui/text';
import { Input, InputField } from '../../components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '../../components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '../../components/ui/form-control';
import { useStoreStore } from '@/store/storeStore';

export default function FormStore() {
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

  return (
    <Box className="flex-1 bg-slate-50 px-6 py-8">
      <VStack space="2xl">
        <VStack space="xs" className="mb-2">
          <Heading size="2xl" className="font-extrabold tracking-tight text-slate-900">
            {isEditing ? 'Editar Loja' : 'Nova Loja'}
          </Heading>
          <Text size="md" className="mt-1 font-medium text-slate-500">
            {isEditing
              ? `Modifique os dados de ID: ${storeId}`
              : 'Preencha os dados e endereço para registrar sua unidade.'}
          </Text>
        </VStack>

        <VStack space="xl">
          <FormControl isInvalid={!!errors.name}>
            <View className="mb-1">
              <FormControlLabel>
                <FormControlLabelText className="text-base font-bold text-slate-700">
                  Nome da Loja <Text className="text-red-500">*</Text>
                </FormControlLabelText>
              </FormControlLabel>
            </View>

            <Input
              variant="outline"
              size="xl"
              className={`h-14 rounded-xl bg-white shadow-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}
            >
              <InputField
                placeholder="Ex: Tech Varejo Paulista"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                autoFocus={!isEditing}
                className="text-slate-800"
              />
            </Input>

            {!!errors.name && (
              <FormControlError className="mt-1">
                <FormControlErrorText className="font-medium text-red-500">
                  {errors.name}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.address}>
            <View className="mb-1">
              <FormControlLabel>
                <FormControlLabelText className="text-base font-bold text-slate-700">
                  Endereço ou CEP <Text className="text-red-500">*</Text>
                </FormControlLabelText>
              </FormControlLabel>
            </View>

            <Input
              variant="outline"
              size="xl"
              className={`h-14 rounded-xl bg-white shadow-sm ${errors.address ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}
            >
              <InputField
                placeholder="Ex: Av. Paulista, 1000 - SP"
                value={address}
                onChangeText={(text) => {
                  setAddress(text); // Agora usa setAddress
                  if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                }}
                className="text-slate-800"
              />
            </Input>

            {!!errors.address && (
              <FormControlError className="mt-1">
                <FormControlErrorText className="font-medium text-red-500">
                  {errors.address}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Mensagem de Erro Geral */}
          {!!errors.general && (
            <Text className="mt-2 text-center font-medium text-red-500">{errors.general}</Text>
          )}
        </VStack>

        {/* Botões */}
        <VStack space="md" className="mt-6">
          <Button
            size="xl"
            variant="solid"
            isDisabled={isLoadingSaving}
            onPress={handleSave}
            className="h-14 rounded-xl bg-blue-600 shadow-md hover:bg-blue-700 active:scale-[0.99] active:bg-blue-800"
          >
            {isLoadingSaving && <ButtonSpinner color="white" />}
            <ButtonText className="px-2 text-lg font-bold text-white">
              {isLoadingSaving ? 'Salvando...' : isEditing ? 'Atualizar Loja' : 'Salvar Nova Loja'}
            </ButtonText>
          </Button>

          <Button
            size="xl"
            variant="outline"
            isDisabled={isLoadingSaving}
            onPress={() => router.back()}
            className="h-14 rounded-xl border-slate-200 active:bg-slate-100"
          >
            <ButtonText className="text-lg font-semibold text-slate-500">Cancelar</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
