import { Box } from '../ui/box';
import { VStack } from '../ui/vstack';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Pressable } from '../ui/pressable';
import { Company } from '../../types/companyDto';

interface CompanyCardProps {
  company: Company;
  onPress: (companyId: string) => void;
}

export function CompanyCard({ company, onPress }: CompanyCardProps) {
  return (
    <Pressable onPress={() => onPress(company.id)}>
      <Box className="p-5 mb-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:bg-slate-50">
        <VStack space="sm">
          <Heading size="md" className="text-slate-800 font-bold">
            {company.name}
          </Heading>
          <Text size="sm" className="text-slate-400 font-medium">
            ID: {company.id}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
}