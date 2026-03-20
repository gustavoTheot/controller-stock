// components/domain/Card.tsx
import { Box } from '../ui/box';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Center } from '../ui/center';
import { Button, ButtonText } from '../ui/button';

import { TouchableOpacity } from 'react-native';

interface CardProps {
  item: any; // Você pode tipar como Company no futuro
  onPress: (id: string, name: string) => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export function Card({ item, onPress, onEdit, onDelete }: CardProps) {
  const initial = item.name ? item.name.charAt(0).toUpperCase() : 'E';

  // Usamos um valor com fallback caso exista a propriedade de lojas futuramente
  const totalStores = item.quantityOfStores ?? item.stores?.length ?? 0;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item.id, item.name)}>
      <Box className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <VStack space="md">
          <HStack space="md" className="items-start">
            {/* Ícone ou Avatar da Rede com cantos mais arredondados estilo App */}
            <Center className="h-14 w-14 rounded-xl border border-blue-100 bg-blue-50">
              <Text className="text-xl font-extrabold text-blue-600">{initial}</Text>
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
                    {item.name}
                  </Heading>
                </Box>
                {/* Badge Visual da Empresa */}
                <Box className={`rounded-md bg-blue-100 px-2 py-0.5`}>
                  <Text className={`text-[10px] font-bold uppercase tracking-wider text-blue-700`}>
                    Matriz
                  </Text>
                </Box>
              </HStack>

              <HStack className="items-center" space="xs">
                <Text size="sm" className="font-medium text-slate-500">
                  ID:
                </Text>
                <Text size="sm" className="font-semibold text-slate-700">
                  {item.id || 'N/A'}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Destaque de Estatísticas / Resumo */}
          <Box className="mt-1 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <HStack className="items-center justify-between">
              <VStack>
                <Text
                  size="xs"
                  className="w-full flex-wrap font-medium uppercase tracking-wider text-slate-400"
                >
                  Status
                </Text>
                {/* <HStack className="items-center mt-1" space="xs">
                  <Box className="w-2 h-2 rounded-full bg-green-500" />
                  <Text className="text-slate-800 font-bold text-sm">
                    Conta Ativa
                  </Text>
                </HStack> */}
              </VStack>

              {/* <VStack className="items-end">
                <Text size="xs" className="text-slate-400 font-medium uppercase tracking-wider">
                  Filiais Cadastradas
                </Text>
                <Text className="text-blue-600 font-extrabold text-base mt-0.5">
                  {totalStores} {totalStores === 1 ? 'loja' : 'lojas'}
                </Text>
              </VStack> */}
            </HStack>
          </Box>

          <HStack space="sm" className="mt-1 justify-end border-t border-slate-100 pt-3">
            <Button
              size="xs"
              variant="outline"
              className="h-8 flex-1 justify-center rounded-lg border-slate-300 active:bg-slate-100 sm:flex-none"
              onPress={() => onEdit(item)}
            >
              <ButtonText className="px-2 font-semibold text-slate-600">Editar</ButtonText>
            </Button>

            <Button
              size="xs"
              variant="outline"
              action="negative"
              className="h-8 flex-1 justify-center rounded-lg border-red-300 active:bg-red-50 sm:flex-none"
              onPress={() => onDelete(item.id)}
            >
              <ButtonText className="px-2 font-semibold text-red-600">Remover</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}
