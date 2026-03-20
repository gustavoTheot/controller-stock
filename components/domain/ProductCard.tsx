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
      <Box className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <VStack space="md">
          <HStack space="md" className="items-start">
            {/* Ícone ou Avatar da Categoria */}
            <Center className="h-14 w-14 rounded-xl border border-slate-200 bg-slate-100/80">
              <Text className="text-xl font-extrabold text-slate-600">{categoryInitial}</Text>
            </Center>

            {/* Nome e Detalhes */}
            <VStack className="mt-0.5 flex-1" space="xs">
              <HStack className="items-start justify-between">
                <Box className="flex-1 pr-2">
                  <Heading
                    size="md"
                    className="font-bold leading-tight text-slate-900"
                    numberOfLines={1}
                  >
                    {product.name}
                  </Heading>
                </Box>
                {/* Badge de status do estoque */}
                <Box className={`rounded-md px-2 py-0.5 ${stockBadgeColor}`}>
                  <Text
                    className={`text-[10px] font-bold uppercase tracking-wider ${stockTextColor}`}
                  >
                    {stockText}
                  </Text>
                </Box>
              </HStack>

              <HStack className="items-center" space="xs">
                <Text size="sm" className="font-medium text-slate-500">
                  SKU:
                </Text>
                <Text size="sm" className="font-semibold text-slate-700">
                  {product.sku || 'N/A'}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Destaque Financeiro / Saldo */}
          <Box className="mt-1 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <HStack className="items-center justify-between">
              <VStack>
                <Text size="xs" className="font-medium uppercase tracking-wider text-slate-400">
                  Estoque Atual
                </Text>
                <Text className="mt-0.5 text-base font-bold text-slate-800">
                  {quantity} {quantity === 1 ? 'unidade' : 'unidades'}
                </Text>
              </VStack>

              <VStack className="items-end">
                <Text size="xs" className="font-medium uppercase tracking-wider text-slate-400">
                  Valor Unitário
                </Text>
                <Text className="mt-0.5 text-base font-extrabold text-blue-600">
                  {formattedPrice}
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Área de Ações */}
          <HStack space="sm" className="mt-1 justify-end border-t border-slate-100 pt-3">
            <Button
              size="xs"
              variant="outline"
              className="h-8 flex-1 justify-center rounded-lg border-slate-300 active:bg-slate-100 sm:flex-none"
              onPress={() => onEdit(product)}
            >
              <ButtonText className="px-2 font-semibold text-slate-600">Editar</ButtonText>
            </Button>

            <Button
              size="xs"
              variant="outline"
              action="negative"
              className="h-8 flex-1 justify-center rounded-lg border-red-300 active:bg-red-50 sm:flex-none"
              onPress={() => onDelete(product.id)}
            >
              <ButtonText className="px-2 font-semibold text-red-600">Remover</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}
