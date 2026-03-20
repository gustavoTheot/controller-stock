// components/domain/StoreCard.tsx
import { Box } from '../ui/box';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Center } from '../ui/center';
import { Button, ButtonText } from '../ui/button';

import { TouchableOpacity } from 'react-native';
import { Store } from '@/types/storeDto';

interface StoreCardProps {
  store: Store;
  onPress: (storeId: string, storeName: string) => void;
  onEdit: (store: Store) => void;
  onDelete: (storeId: string) => void;
}

export function StoreCard({ store, onPress, onEdit, onDelete }: StoreCardProps) {
  const initial = store.name ? store.name.charAt(0).toUpperCase() : 'E';

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(store.id, store.name)}>
      <Box className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <VStack space="md">
          <HStack space="md" className="items-start">
            {/* Ícone ou Avatar da Loja com cantos mais arredondados estilo App */}
            <Center className="h-14 w-14 rounded-xl border border-indigo-100 bg-indigo-50">
              <Text className="text-xl font-extrabold text-indigo-600">{initial}</Text>
            </Center>

            {/* Nome e Detalhes Principais */}
            <VStack className="mt-0.5 flex-1" space="xs">
              <HStack className="items-start justify-between">
                <Box className="flex-1 pr-2">
                  <Heading
                    size="md"
                    className="font-bold leading-tight text-slate-900"
                    numberOfLines={1}
                  >
                    {store.name}
                  </Heading>
                </Box>
                {/* Badge Visual (Opcional, definimos pelo tipo ou apenas Loja para estética) */}
                <Box className={`rounded-md bg-indigo-100 px-2 py-0.5`}>
                  <Text
                    className={`text-[10px] font-bold uppercase tracking-wider text-indigo-700`}
                  >
                    Ativa
                  </Text>
                </Box>
              </HStack>

              <HStack className="items-center" space="xs">
                <Text size="sm" className="font-medium text-slate-500">
                  ID:
                </Text>
                <Text size="sm" className="font-semibold text-slate-700">
                  {store.id || 'N/A'}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Destaque de Estatísticas / Endereço */}
          <Box className="mt-1 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <HStack className="items-center justify-between">
              <VStack>
                <Text
                  size="xs"
                  className="w-full flex-wrap font-medium uppercase tracking-wider text-slate-400"
                >
                  Endereço
                </Text>
                <Text className="mt-0.5 text-sm font-bold text-slate-800" numberOfLines={1}>
                  {store.address || 'Não cadastrado'}
                </Text>
              </VStack>

              {/* Opcional: Se no futuro a modelagem tiver estatísticas, o código abaixo serviria para mostrar */}
              <VStack className="items-end">
                <Text size="xs" className="font-medium uppercase tracking-wider text-slate-400">
                  Prod. Registrados
                </Text>
                <Text className="mt-0.5 text-base font-extrabold text-indigo-600">
                  {store.quantityOfProducts ?? 0}
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Área de Ações com Design Flex-1 (mesmo do Product) */}
          <HStack space="sm" className="mt-1 justify-end border-t border-slate-100 pt-3">
            <Button
              size="xs"
              variant="outline"
              className="h-8 flex-1 justify-center rounded-lg border-slate-300 active:bg-slate-100 sm:flex-none"
              onPress={() => onEdit(store)}
            >
              <ButtonText className="px-2 font-semibold text-slate-600">Editar</ButtonText>
            </Button>

            <Button
              size="xs"
              variant="outline"
              action="negative"
              className="h-8 flex-1 justify-center rounded-lg border-red-300 active:bg-red-50 sm:flex-none"
              onPress={() => onDelete(store.id)}
            >
              <ButtonText className="px-2 font-semibold text-red-600">Remover</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}
