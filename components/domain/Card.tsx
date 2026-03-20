// components/domain/CompanyCard.tsx
import { Box } from '../ui/box';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Center } from '../ui/center';
import { Button, ButtonText } from '../ui/button';

import { TouchableOpacity } from 'react-native';

interface CardProps {
  item: any;
  onPress: (id: string, name: string) => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void; 
}

export function Card({ item, onPress, onEdit, onDelete }: CardProps) {
  const initial = item.name ? item.name.charAt(0).toUpperCase() : 'E';

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item.id, item.name)}>
      <Box className="mb-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <VStack space="md">
          <HStack space="md" className="items-center">
            {/* Avatar */}
            <Center className="w-12 h-12 bg-blue-100/80 rounded-full border border-blue-200">
              <Text className="text-blue-700 font-extrabold text-lg">
                {initial}
              </Text>
            </Center>

            {/* Textos */}
            <VStack className="flex-1">
              <Heading size="md" className="text-slate-900 font-bold" numberOfLines={1}>
                {item.name}
              </Heading>
              <Text size="sm" className="text-slate-500 font-medium mt-0.5">
                ID: {item.id}
              </Text>
            </VStack>
            
            {/* Seta indicador */}
            <Text className="text-slate-400 text-xl font-medium px-1">›</Text>
          </HStack>

          {/* Área de Ações */}
          <HStack space="sm" className="justify-end border-t border-slate-100 pt-3 mt-1">
            <Button 
              size="xs" 
              variant="outline" 
              className="rounded-lg h-8 border-slate-300 active:bg-slate-100"
              onPress={() => onEdit(item)} 
            >
              <ButtonText className="text-slate-600 font-semibold px-2">Editar</ButtonText>
            </Button>
            
            <Button 
              size="xs" 
              variant="outline" 
              action="negative" 
              className="rounded-lg h-8 border-red-300 active:bg-red-50"
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