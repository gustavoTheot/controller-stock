// components/domain/Card.tsx
import { Box } from '../ui/box';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Center } from '../ui/center';
import { Button, ButtonText } from '../ui/button';

import { TouchableOpacity } from 'react-native';
import { Company, UpdateCompanyParams } from '@/types/companyDto';

interface CardProps {
  company: Company;
  onPress: (id: string, name: string) => void;
  onEdit: (company: UpdateCompanyParams) => void;
  onDelete: (id: string) => void;
}

export function Card({ company, onPress, onEdit, onDelete }: CardProps) {
  const initial = company.name ? company.name.charAt(0).toUpperCase() : 'E';

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(company.id, company.name)}>
      <Box className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <VStack space="md">
          <HStack space="md" className="items-start">
            <Center className="h-14 w-14 rounded-xl border border-blue-100 bg-blue-50">
              <Text className="text-xl font-extrabold text-blue-600">{initial}</Text>
            </Center>

            <VStack className="mt-0.5 flex-1" space="xs">
              <HStack className="items-start justify-between">
                <Box className="flex-1 pr-2">
                  <Heading
                    size="md"
                    className="font-bold leading-tight text-slate-900"
                    numberOfLines={1}
                  >
                    {company.name}
                  </Heading>
                </Box>
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
                  {company.id || 'N/A'}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <Box className="mt-1 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <HStack className="items-center justify-between">
              <VStack>
                <Text
                  size="xs"
                  className="w-full flex-wrap font-medium uppercase tracking-wider text-slate-400"
                >
                  Status
                </Text>
                <HStack className="mt-1 items-center" space="xs">
                  <Box className="h-2 w-2 rounded-full bg-green-500" />
                  <Text className="text-sm font-bold text-slate-800">Conta Ativa</Text>
                </HStack>
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
              onPress={() => onEdit(company)}
            >
              <ButtonText className="px-2 font-semibold text-slate-600">Editar</ButtonText>
            </Button>

            <Button
              size="xs"
              variant="outline"
              action="negative"
              className="h-8 flex-1 justify-center rounded-lg border-red-300 active:bg-red-50 sm:flex-none"
              onPress={() => onDelete(company.id)}
            >
              <ButtonText className="px-2 font-semibold text-red-600">Remover</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}
