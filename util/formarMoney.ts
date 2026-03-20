export function parseCurrencyToNumber(value: string) {
  let numericValue = value.replace(/\D/g, '');
  if (!numericValue) return 0;
  return parseFloat(numericValue) / 100;
}
export function formatCurrency(value: string) {
  let numericValue = value.replace(/\D/g, ''); // Remove tudo que não é dígito
  if (!numericValue) return '';

  const amount = parseFloat(numericValue) / 100;
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

