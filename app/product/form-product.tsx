import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, ScrollView } from 'react-native';

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
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types/productDto';

// Categorias comuns do mercado
const DEFAULT_CATEGORIES = [
  'Eletrônicos', 'Informática', 'Acessórios', 
  'Móveis', 'Vestuário', 'Alimentação'
];

// Utilitário para formatar moeda -> R$ 1.999,99
function formatCurrency(value: string) {
  let numericValue = value.replace(/\D/g, ''); // Remove tudo que não é dígito
  if (!numericValue) return '';

  const amount = parseFloat(numericValue) / 100;
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Utilitário para desformatar moeda na hora de salvar (R$ 1.999,99 -> 1999.99)
function parseCurrencyToNumber(value: string) {
  let numericValue = value.replace(/\D/g, '');
  if (!numericValue) return 0;
  return parseFloat(numericValue) / 100;
}

export default function FormProduct() {
  const router = useRouter();
  
  const { productId, storeId, productName, category: paramCategory, price: paramPrice } = useLocalSearchParams<{ 
    productId: string, 
    storeId: string,
    productName?: string,
    category?: string,
    price?: string
  }>();

  const isEditing = !!productId;
  const { saveProduct } = useProductStore();
  
  // Estados do Produto
  const [name, setName] = useState('');
  const [price, setPrice] = useState(''); // Guarda no formato string mascarada
  
  // Controle Categoria
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryText, setCustomCategoryText] = useState('');

  const [isLoadingSaving, setIsLoadingSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string, price?: string, category?: string, general?: string }>({});

  useEffect(() => {
    if (isEditing) {
      if (productName) setName(productName);
      
      // Se veio valor do banco (ex: 199.9), precisa formatar para carregar bonito
      if (paramPrice) {
        // Multiplica por 100 e padroniza para string sem ponto para reciclar o formatCurrency
        const rawValue = (Number(paramPrice) * 100).toFixed(0); 
        setPrice(formatCurrency(rawValue));
      }
      
      if (paramCategory) {
        if (!DEFAULT_CATEGORIES.includes(paramCategory)) {
          setIsCustomCategory(true);
          setCustomCategoryText(paramCategory);
          setCategory(paramCategory);
        } else {
          setCategory(paramCategory);
        }
      }
    }
  }, [isEditing, productName, paramCategory, paramPrice]);

  // Handler que processa o texto em tempo real aplicando a máscara
  const handlePriceChange = (text: string) => {
    const formatted = formatCurrency(text);
    setPrice(formatted);
    if (errors.price) setErrors(prev => ({ ...prev, price: undefined }));
  };

  const validate = () => {
    let newErrors: any = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'O nome do produto é obrigatório.';
      isValid = false;
    }

    if (!price.trim() || parseCurrencyToNumber(price) <= 0) {
      newErrors.price = 'Insira um valor maior que zero.';
      isValid = false;
    }

    if (isCustomCategory && !customCategoryText.trim()) {
      newErrors.category = 'Defina o nome da nova categoria.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const finalCategory = isCustomCategory ? customCategoryText.trim() : category;
    const finalPrice = parseCurrencyToNumber(price); 

    try {
      setIsLoadingSaving(true);
      setErrors({});
      
      const productPayload: Product = {
        id: productId || '', 
        storeId: storeId,
        name: name.trim(),
        category: finalCategory,
        price: finalPrice, // Envia para o Mock/Backend como tipo numérico
        quantity: isEditing ? undefined : 0 
      };
      
      await saveProduct(productPayload);
      router.back();

    } catch (err) {
      setErrors({ general: 'Ocorreu um erro ao salvar. Tente novamente.' });
    } finally {
      setIsLoadingSaving(false);
    }
  };

  return (
    <Box className="flex-1 bg-slate-50 px-6 py-6">
      <VStack space="2xl" className="flex-1">
        
        <VStack space="xs" className="mb-2">
          <Heading size="2xl" className="text-slate-900 font-extrabold tracking-tight">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </Heading>
          <Text size="md" className="text-slate-500 font-medium mt-1">
            {isEditing ? `Edição do item` : 'Preencha os dados do novo item para o estoque.'}
          </Text>
        </VStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl" className="pb-8">
            
            {/* Campo NOME */}
            <FormControl isInvalid={!!errors.name}>
              <View className="mb-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-slate-700 font-bold text-base">
                    Nome do Produto <Text className="text-red-500">*</Text>
                  </FormControlLabelText>
                </FormControlLabel>
              </View>
              
              <Input variant="outline" size="xl" className={`h-14 rounded-xl bg-white shadow-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}>
                <InputField 
                  placeholder="Ex: MacBook Pro M2" 
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  autoFocus={!isEditing}
                  className="text-slate-800"
                />
              </Input>
              {!!errors.name && <FormControlErrorText className="text-red-500 mt-1">{errors.name}</FormControlErrorText>}
            </FormControl>

            {/* Campo CATEGORIA Inteligente */}
            <FormControl isInvalid={!!errors.category}>
              <View className="mb-2 flex-row justify-between items-center">
                <FormControlLabel>
                  <FormControlLabelText className="text-slate-700 font-bold text-base">
                    Categoria do Produto
                  </FormControlLabelText>
                </FormControlLabel>
                
                {isCustomCategory && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto"
                    onPress={() => {
                      setIsCustomCategory(false);
                      setCategory(DEFAULT_CATEGORIES[0]);
                      if (errors.category) setErrors(prev => ({ ...prev, category: undefined }));
                    }}
                  >
                    <ButtonText className="text-blue-600 font-semibold text-xs">← Voltar pra lista</ButtonText>
                  </Button>
                )}
              </View>
              
              {isCustomCategory ? (
                // Input para categoria customizada
                <Input variant="outline" size="xl" className={`h-14 rounded-xl bg-white shadow-sm ${errors.category ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}>
                  <InputField 
                    placeholder="Digite a nova categoria..." 
                    value={customCategoryText}
                    onChangeText={(text) => {
                      setCustomCategoryText(text);
                      if (errors.category) setErrors(prev => ({ ...prev, category: undefined }));
                    }}
                    autoFocus
                    className="text-slate-800"
                  />
                </Input>
              ) : (
                // Lista Padrão de Categorias
                <HStack className="flex-wrap gap-2">
                  {DEFAULT_CATEGORIES.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <Button
                        key={cat}
                        size="sm"
                        variant={isSelected ? 'solid' : 'outline'}
                        className={`rounded-full h-9 border ${isSelected ? 'bg-slate-800 border-slate-800' : 'bg-white border-slate-300'}`}
                        onPress={() => setCategory(cat)}
                      >
                        <ButtonText className={isSelected ? 'text-white' : 'text-slate-600'}>
                          {cat}
                        </ButtonText>
                      </Button>
                    );
                  })}
                  {/* Botão Outra Categoria */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full h-9 border border-blue-200 bg-blue-50"
                    onPress={() => {
                      setIsCustomCategory(true);
                      setCustomCategoryText('');
                    }}
                  >
                    <ButtonText className="text-blue-600 font-bold">+ Criar Nova</ButtonText>
                  </Button>
                </HStack>
              )}
              
              {!!errors.category && <FormControlErrorText className="text-red-500 mt-1">{errors.category}</FormControlErrorText>}
            </FormControl>

            {/* Campo PREÇO Mascarado */}
            <FormControl isInvalid={!!errors.price}>
              <View className="mb-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-slate-700 font-bold text-base">
                    Preço de Venda <Text className="text-red-500">*</Text>
                  </FormControlLabelText>
                </FormControlLabel>
              </View>
              
              <Input variant="outline" size="xl" className={`h-14 rounded-xl bg-white shadow-sm ${errors.price ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'}`}>
                <InputField 
                  placeholder="R$ 0,00" 
                  value={price}
                  keyboardType="numeric" // abre o teclado de números do celular
                  onChangeText={handlePriceChange}
                  className="text-slate-800 font-bold"
                />
              </Input>
              {!!errors.price && <FormControlErrorText className="text-red-500 mt-1">{errors.price}</FormControlErrorText>}
            </FormControl>

            {!!errors.general && (
              <Text className="text-red-500 font-medium text-center mt-2">{errors.general}</Text>
            )}

          </VStack>
        </ScrollView>

        <VStack space="md" className="mt-auto pt-4 border-t border-slate-100">
          <Button 
            size="xl" 
            variant="solid" 
            isDisabled={isLoadingSaving}
            onPress={handleSave}
            className="h-14 rounded-xl bg-blue-600 shadow-md active:scale-[0.99]"
          >
            {isLoadingSaving && <ButtonSpinner color="white" />}
            <ButtonText className="text-white font-bold text-lg px-2">
              {isLoadingSaving ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar Produto')}
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