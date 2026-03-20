import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

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
import { useCompanyStore } from '@/store/companyStore';

export default function FormCompany() {
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

  return (
    <Box className="flex-1 bg-slate-50 px-6 py-8">
      <VStack space="2xl">
        <VStack space="xs" className="mb-2">
          <Heading size="2xl" className="font-extrabold tracking-tight text-slate-900">
            {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
          </Heading>
          <Text size="md" className="mt-1 font-medium text-slate-500">
            {isEditing
              ? `Modifique os dados de ID: ${companyId}`
              : 'Preencha os dados para registrar uma nova rede.'}
          </Text>
        </VStack>

        {/* Formulário */}
        <FormControl isInvalid={!!validationError}>
          <FormControlLabel mb="$2">
            <FormControlLabelText className="text-base font-bold text-slate-700">
              Nome da Empresa
            </FormControlLabelText>
          </FormControlLabel>

          <Input
            variant="outline"
            size="xl"
            className="h-14 rounded-xl border-slate-300 bg-white shadow-sm focus:border-blue-600"
          >
            <InputField
              placeholder="Ex: Tech Varejo SA"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (validationError) setValidationError('');
              }}
              autoFocus
              className="text-slate-800"
            />
          </Input>

          {/* Exibição de Erro */}
          {!!validationError && (
            <FormControlError className="mt-2">
              <FormControlErrorText className="font-medium text-red-500">
                {validationError}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <VStack space="md" className="mt-8">
          <Button
            size="xl"
            variant="solid"
            isDisabled={isLoadingSaving}
            onPress={handleSave}
            className="h-14 rounded-xl bg-blue-600 shadow-md hover:bg-blue-700 active:scale-[0.99] active:bg-blue-800"
          >
            {isLoadingSaving && <ButtonSpinner color="white" />}
            <ButtonText className="px-2 text-lg font-bold text-white">
              {isLoadingSaving ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar'}
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
