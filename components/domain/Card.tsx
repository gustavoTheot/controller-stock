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
      <Box className="mb-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <VStack space="md">
          <HStack space="md" className="items-start">
            {/* Ícone ou Avatar da Rede com cantos mais arredondados estilo App */}
            <Center className="w-14 h-14 bg-blue-50 rounded-xl border border-blue-100">
              <Text className="text-blue-600 font-extrabold text-xl">
                {initial}
              </Text>
            </Center>

            {/* Nome e Detalhes Principais */}
            <VStack className="flex-1 mt-0.5" space="xs">
              <HStack className="justify-between items-start">
                <Box className="flex-1 pr-2">
                  <Heading size="md" className="text-slate-900 font-bold leading-tight" numberOfLines={1}>
                    {item.name}
                  </Heading>
                </Box>
                {/* Badge Visual da Empresa */}
                <Box className={`px-2 py-0.5 rounded-md bg-blue-100`}>
                  <Text className={`text-[10px] font-bold uppercase tracking-wider text-blue-700`}>
                    Matriz
                  </Text>
                </Box>
              </HStack>

              <HStack className="items-center" space="xs">
                <Text size="sm" className="text-slate-500 font-medium">ID:</Text>
                <Text size="sm" className="text-slate-700 font-semibold">{item.id || 'N/A'}</Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Destaque de Estatísticas / Resumo */}
          <Box className="bg-slate-50 rounded-xl p-3 mt-1 border border-slate-100">
            <HStack className="justify-between items-center">
              <VStack>
                <Text size="xs" className="text-slate-400 font-medium uppercase tracking-wider flex-wrap w-full">
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

          <HStack space="sm" className="justify-end border-t border-slate-100 pt-3 mt-1">
            <Button 
              size="xs" 
              variant="outline" 
              className="rounded-lg h-8 border-slate-300 active:bg-slate-100 flex-1 sm:flex-none justify-center"
              onPress={() => onEdit(item)} 
            >
              <ButtonText className="text-slate-600 font-semibold px-2">Editar</ButtonText>
            </Button>
            
            <Button 
              size="xs" 
              variant="outline" 
              action="negative" 
              className="rounded-lg h-8 border-red-300 active:bg-red-50 flex-1 sm:flex-none justify-center"
              onPress={() => onDelete(item.id)}
            >
              <ButtonText className="text-red-600 font-semibold px-2">Remover</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}