import { View, ScrollView, Switch } from 'react-native';

import { Box } from '../../components/ui/box';
import { VStack } from '../../components/ui/vstack';
import { HStack } from '../../components/ui/hstack';
import { Heading } from '../../components/ui/heading';
import { Text } from '../../components/ui/text';
import { Input, InputField } from '../../components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '../../components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlErrorText,
} from '../../components/ui/form-control';
import { useProductForm } from '@/hooks/useProductForm';

const DEFAULT_CATEGORIES = [
  'Eletrônicos',
  'Informática',
  'Acessórios',
  'Móveis',
  'Vestuário',
  'Alimentação',
];

export default function FormProduct() {
  const {
    isEditing,
    name,
    setName,
    price,
    handlePriceChange,
    hasStock,
    setHasStock,
    quantity,
    setQuantity,
    category,
    setCategory,
    isCustomCategory,
    setIsCustomCategory,
    customCategoryText,
    setCustomCategoryText,
    isLoadingSaving,
    errors,
    setErrors,
    handleSave,
    handleCancel,
  } = useProductForm();

  return (
    <Box className="flex-1 bg-slate-50 px-6 py-6">
      <VStack space="2xl" className="flex-1">
        <VStack space="xs" className="mb-2">
          <Heading size="2xl" className="font-extrabold tracking-tight text-slate-900">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </Heading>
          <Text size="md" className="mt-1 font-medium text-slate-500">
            {isEditing ? `Edição do item` : 'Preencha os dados do novo item para o estoque.'}
          </Text>
        </VStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl" className="pb-8">
            {/* Campo NOME */}
            <FormControl isInvalid={!!errors.name}>
              <View className="mb-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-base font-bold text-slate-700">
                    Nome do Produto <Text className="text-red-500">*</Text>
                  </FormControlLabelText>
                </FormControlLabel>
              </View>

              <Input
                variant="outline"
                size="xl"
                className={`h-14 rounded-xl bg-white shadow-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}
              >
                <InputField
                  placeholder="Ex: MacBook Pro M2"
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
                <FormControlErrorText className="mt-1 text-red-500">
                  {errors.name}
                </FormControlErrorText>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.category}>
              <View className="mb-2 flex-row items-center justify-between">
                <FormControlLabel>
                  <FormControlLabelText className="text-base font-bold text-slate-700">
                    Categoria do Produto
                  </FormControlLabelText>
                </FormControlLabel>

                {isCustomCategory && (
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0"
                    onPress={() => {
                      setIsCustomCategory(false);
                      setCategory(DEFAULT_CATEGORIES[0]);
                      if (errors.category) setErrors((prev) => ({ ...prev, category: undefined }));
                    }}
                  >
                    <ButtonText className="text-xs font-semibold text-blue-600">
                      ← Voltar pra lista
                    </ButtonText>
                  </Button>
                )}
              </View>

              {isCustomCategory ? (
                <Input
                  variant="outline"
                  size="xl"
                  className={`h-14 rounded-xl bg-white shadow-sm ${errors.category ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}
                >
                  <InputField
                    placeholder="Digite a nova categoria..."
                    value={customCategoryText}
                    onChangeText={(text) => {
                      setCustomCategoryText(text);
                      if (errors.category) setErrors((prev) => ({ ...prev, category: undefined }));
                    }}
                    autoFocus
                    className="text-slate-800"
                  />
                </Input>
              ) : (
                <HStack className="flex-wrap gap-2">
                  {DEFAULT_CATEGORIES.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <Button
                        key={cat}
                        size="sm"
                        variant={isSelected ? 'solid' : 'outline'}
                        className={`h-9 rounded-full border ${isSelected ? 'border-slate-800 bg-slate-800' : 'border-slate-300 bg-white'}`}
                        onPress={() => setCategory(cat)}
                      >
                        <ButtonText className={isSelected ? 'text-white' : 'text-slate-600'}>
                          {cat}
                        </ButtonText>
                      </Button>
                    );
                  })}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 rounded-full border border-blue-200 bg-blue-50"
                    onPress={() => {
                      setIsCustomCategory(true);
                      setCustomCategoryText('');
                    }}
                  >
                    <ButtonText className="font-bold text-blue-600">+ Criar Nova</ButtonText>
                  </Button>
                </HStack>
              )}

              {!!errors.category && (
                <FormControlErrorText className="mt-1 text-red-500">
                  {errors.category}
                </FormControlErrorText>
              )}
            </FormControl>

            <VStack space="md" className="mt-2">
              <HStack className="items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <VStack>
                  <Text className="text-base font-bold text-slate-700">Tem em estoque?</Text>
                  <Text className="text-sm font-medium text-slate-500">
                    Ative para definir a quantidade inicial
                  </Text>
                </VStack>
                <Switch
                  value={hasStock}
                  onValueChange={setHasStock}
                  trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
                  thumbColor="#ffffff"
                />
              </HStack>

              {hasStock && (
                <FormControl isInvalid={!!errors.quantity}>
                  <View className="mb-1 mt-2">
                    <FormControlLabel>
                      <FormControlLabelText className="text-base font-bold text-slate-700">
                        Quantidade Inicial <Text className="text-red-500">*</Text>
                      </FormControlLabelText>
                    </FormControlLabel>
                  </View>

                  <Input
                    variant="outline"
                    size="xl"
                    className={`h-14 rounded-xl bg-white shadow-sm ${errors.quantity ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}
                  >
                    <InputField
                      placeholder="Ex: 50"
                      value={quantity}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        setQuantity(text.replace(/[^0-9]/g, ''));
                        if (errors.quantity)
                          setErrors((prev) => ({ ...prev, quantity: undefined }));
                      }}
                      className="font-bold text-slate-800"
                    />
                  </Input>
                  {!!errors.quantity && (
                    <FormControlErrorText className="mt-1 text-red-500">
                      {errors.quantity}
                    </FormControlErrorText>
                  )}
                </FormControl>
              )}
            </VStack>

            <FormControl isInvalid={!!errors.price}>
              <View className="mb-1 mt-2">
                <FormControlLabel>
                  <FormControlLabelText className="text-base font-bold text-slate-700">
                    Preço de Venda <Text className="text-red-500">*</Text>
                  </FormControlLabelText>
                </FormControlLabel>
              </View>

              <Input
                variant="outline"
                size="xl"
                className={`h-14 rounded-xl bg-white shadow-sm ${errors.price ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}
              >
                <InputField
                  placeholder="R$ 0,00"
                  value={price}
                  keyboardType="numeric"
                  onChangeText={handlePriceChange}
                  className="font-bold text-slate-800"
                />
              </Input>
              {!!errors.price && (
                <FormControlErrorText className="mt-1 text-red-500">
                  {errors.price}
                </FormControlErrorText>
              )}
            </FormControl>

            {!!errors.general && (
              <Text className="mt-2 text-center font-medium text-red-500">{errors.general}</Text>
            )}
          </VStack>
        </ScrollView>

        <VStack space="md" className="mt-auto border-t border-slate-100 pt-4">
          <Button
            size="xl"
            variant="solid"
            isDisabled={isLoadingSaving}
            onPress={handleSave}
            className="h-14 rounded-xl bg-blue-600 shadow-md active:scale-[0.99]"
          >
            {isLoadingSaving && <ButtonSpinner color="white" />}
            <ButtonText className="px-2 text-lg font-bold text-white">
              {isLoadingSaving
                ? 'Salvando...'
                : isEditing
                  ? 'Salvar Alterações'
                  : 'Adicionar Produto'}
            </ButtonText>
          </Button>

          <Button
            size="xl"
            variant="outline"
            isDisabled={isLoadingSaving}
            onPress={handleCancel}
            className="h-14 rounded-xl border-slate-200 active:bg-slate-100"
          >
            <ButtonText className="text-lg font-semibold text-slate-500">Cancelar</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
