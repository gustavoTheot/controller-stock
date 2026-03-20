// components/domain/ProductCard.tsx
import { Box } from '../ui/box';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Center } from '../ui/center';
import { Button, ButtonText } from '../ui/button';
import { TouchableOpacity } from 'react-native';
import { Product } from '@/types/productDto';

interface ProductCardProps {
  product: Product;
  onPress?: (productId: string, productName: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function ProductCard({ product, onPress, onEdit, onDelete }: ProductCardProps) {
  // Formatação de preço (Moeda BRL)
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price ?? 0);

  // Status de Estoque
  const quantity = product.quantity ?? 0;
  const isOutOfStock = quantity === 0;
  const isLowStock = quantity > 0 && quantity <= 10;

  let stockBadgeColor = 'bg-green-100';
  let stockTextColor = 'text-green-700';
  let stockText = 'Em Estoque';

  if (isOutOfStock) {
    stockBadgeColor = 'bg-red-100';
    stockTextColor = 'text-red-700';
    stockText = 'Esgotado';
  } else if (isLowStock) {
    stockBadgeColor = 'bg-orange-100';
    stockTextColor = 'text-orange-700';
    stockText = 'Baixo Estoque';
  }

  // Categoria visual
  const categoryInitial = product.category ? product.category.charAt(0).toUpperCase() : 'P';

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Box className="mb-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <VStack space="md">
          <HStack space="md" className="items-start">
            {/* Ícone ou Avatar da Categoria */}
            <Center className="w-14 h-14 bg-slate-100/80 rounded-xl border border-slate-200">
              <Text className="text-slate-600 font-extrabold text-xl">
                {categoryInitial}
              </Text>
            </Center>

            {/* Nome e Detalhes */}
            <VStack className="flex-1 mt-0.5" space="xs">
              <HStack className="justify-between items-start">
                <Box className="flex-1 pr-2">
                  <Heading size="md" className="text-slate-900 font-bold leading-tight" numberOfLines={1}>
                    {product.name}
                  </Heading>
                </Box>
                {/* Badge de status do estoque */}
                <Box className={`px-2 py-0.5 rounded-md ${stockBadgeColor}`}>
                  <Text className={`text-[10px] font-bold uppercase tracking-wider ${stockTextColor}`}>
                    {stockText}
                  </Text>
                </Box>
              </HStack>

              <HStack className="items-center" space="xs">
                <Text size="sm" className="text-slate-500 font-medium">SKU:</Text>
                <Text size="sm" className="text-slate-700 font-semibold">{product.sku || 'N/A'}</Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Destaque Financeiro / Saldo */}
          <Box className="bg-slate-50 rounded-xl p-3 mt-1 border border-slate-100">
            <HStack className="justify-between items-center">
              <VStack>
                <Text size="xs" className="text-slate-400 font-medium uppercase tracking-wider">
                  Estoque Atual
                </Text>
                <Text className="text-slate-800 font-bold text-base mt-0.5">
                  {quantity} {quantity === 1 ? 'unidade' : 'unidades'}
                </Text>
              </VStack>
              
              <VStack className="items-end">
                <Text size="xs" className="text-slate-400 font-medium uppercase tracking-wider">
                  Valor Unitário
                </Text>
                <Text className="text-blue-600 font-extrabold text-base mt-0.5">
                  {formattedPrice}
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Área de Ações */}
          <HStack space="sm" className="justify-end border-t border-slate-100 pt-3 mt-1">
            <Button 
              size="xs" 
              variant="outline" 
              className="rounded-lg h-8 border-slate-300 active:bg-slate-100 flex-1 sm:flex-none justify-center"
              onPress={() => onEdit(product)} 
            >
              <ButtonText className="text-slate-600 font-semibold px-2">Editar</ButtonText>
            </Button>
            
            <Button 
              size="xs" 
              variant="outline" 
              action="negative" 
              className="rounded-lg h-8 border-red-300 active:bg-red-50 flex-1 sm:flex-none justify-center"
              onPress={() => onDelete(product.id)}
            >
              <ButtonText className="text-red-600 font-semibold px-2">Remover</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}