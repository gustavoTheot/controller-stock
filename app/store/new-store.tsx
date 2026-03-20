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
import { useStoreStore } from '@/store/storeStore';

export default function FormStore() {
  const router = useRouter();
  
  const { storeId, storeName } = useLocalSearchParams<{ storeId: string, storeName: string }>();
  const isEditing = !!storeId;

  const { addStore, updateStore } = useStoreStore();
  
  const [name, setName] = useState('');
  const [isLoadingSaving, setIsLoadingSaving] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isEditing && storeName) {
      setName(storeName);
    }
  }, [isEditing, storeName]);

  const handleSave = async () => {
    if (!name.trim()) {
      setValidationError('O nome da loja é obrigatório.');
      return;
    }

    try {
      setIsLoadingSaving(true);
      setValidationError('');
      
      const params = { name: name.trim() };
      
      if (isEditing) {
        await updateStore({ id: storeId, ...params });
      } else {
        await addStore(params);
      }      
      
      router.back();
    } catch (err) {
      setValidationError('Ocorreu um erro ao salvar a loja. Tente novamente.');
    } finally {
      setIsLoadingSaving(false);
    }
  };

  return (
    <Box className="flex-1 bg-slate-50 px-6 py-8">
      <VStack space="2xl">
        
        <VStack space="xs" className="mb-2">
          <Heading size="2xl" className="text-slate-900 font-extrabold tracking-tight">
            {isEditing ? 'Editar Loja' : 'Nova Loja'}
          </Heading>
          <Text size="md" className="text-slate-500 font-medium mt-1">
            {isEditing ? `Modifique os dados de ID: ${storeId}` : 'Preencha os dados para registrar uma nova rede.'}
          </Text>
        </VStack>

        {/* Formulário */}
        <FormControl isInvalid={!!validationError}>
          <FormControlLabel mb="$2">
            <FormControlLabelText className="text-slate-700 font-bold text-base">
              Nome da Loja
            </FormControlLabelText>
          </FormControlLabel>
          
          <Input 
            variant="outline" 
            size="xl" 
            className="h-14 rounded-xl border-slate-300 bg-white focus:border-blue-600 shadow-sm"
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
              <FormControlErrorText className="text-red-500 font-medium">
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
            className="h-14 rounded-xl bg-blue-600 shadow-md hover:bg-blue-700 active:bg-blue-800 active:scale-[0.99]"
          >
            {isLoadingSaving && <ButtonSpinner color="white" />}
            <ButtonText className="text-white font-bold text-lg px-2">
              {isLoadingSaving ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Salvar')}
            </ButtonText>
          </Button>

          <Button 
            size="xl" 
            variant="outline" 
            isDisabled={isLoadingSaving}
            onPress={() => router.back()}
            className="h-14 rounded-xl border-slate-200 active:bg-slate-100"
          >
            <ButtonText className="text-slate-500 font-semibold text-lg">Cancelar</ButtonText>
          </Button>
        </VStack>

      </VStack>
    </Box>
  );
}