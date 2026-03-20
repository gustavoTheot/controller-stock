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
      <Box className="mb-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <VStack space="md">
          <HStack space="md" className="items-start">
            {/* Ícone ou Avatar da Loja com cantos mais arredondados estilo App */}
            <Center className="w-14 h-14 bg-indigo-50 rounded-xl border border-indigo-100">
              <Text className="text-indigo-600 font-extrabold text-xl">
                {initial}
              </Text>
            </Center>

            {/* Nome e Detalhes Principais */}
            <VStack className="flex-1 mt-0.5" space="xs">
              <HStack className="justify-between items-start">
                <Box className="flex-1 pr-2">
                  <Heading size="md" className="text-slate-900 font-bold leading-tight" numberOfLines={1}>
                    {store.name}
                  </Heading>
                </Box>
                {/* Badge Visual (Opcional, definimos pelo tipo ou apenas Loja para estética) */}
                <Box className={`px-2 py-0.5 rounded-md bg-indigo-100`}>
                  <Text className={`text-[10px] font-bold uppercase tracking-wider text-indigo-700`}>
                    Ativa
                  </Text>
                </Box>
              </HStack>

              <HStack className="items-center" space="xs">
                <Text size="sm" className="text-slate-500 font-medium">ID:</Text>
                <Text size="sm" className="text-slate-700 font-semibold">{store.id || 'N/A'}</Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Destaque de Estatísticas / Endereço */}
          <Box className="bg-slate-50 rounded-xl p-3 mt-1 border border-slate-100">
            <HStack className="justify-between items-center">
              <VStack>
                <Text size="xs" className="text-slate-400 font-medium uppercase tracking-wider flex-wrap w-full">
                  Endereço
                </Text>
                <Text className="text-slate-800 font-bold text-sm mt-0.5" numberOfLines={1}>
                  {store.address || 'Não cadastrado'}
                </Text>
              </VStack>
              
              {/* Opcional: Se no futuro a modelagem tiver estatísticas, o código abaixo serviria para mostrar */}
              <VStack className="items-end">
                <Text size="xs" className="text-slate-400 font-medium uppercase tracking-wider">
                  Prod. Registrados
                </Text>
                <Text className="text-indigo-600 font-extrabold text-base mt-0.5">
                  {store.quantityOfProducts ?? 0}
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Área de Ações com Design Flex-1 (mesmo do Product) */}
          <HStack space="sm" className="justify-end border-t border-slate-100 pt-3 mt-1">
            <Button 
              size="xs" 
              variant="outline" 
              className="rounded-lg h-8 border-slate-300 active:bg-slate-100 flex-1 sm:flex-none justify-center"
              onPress={() => onEdit(store)} 
            >
              <ButtonText className="text-slate-600 font-semibold px-2">Editar</ButtonText>
            </Button>
            
            <Button 
              size="xs" 
              variant="outline" 
              action="negative" 
              className="rounded-lg h-8 border-red-300 active:bg-red-50 flex-1 sm:flex-none justify-center"
              onPress={() => onDelete(store.id)}
            >
              <ButtonText className="text-red-600 font-semibold px-2">Remover</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}