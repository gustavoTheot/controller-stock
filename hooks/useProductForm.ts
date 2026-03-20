import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useProductStore } from '../store/productStore';
import { Product } from '../types/productDto';
import { formatCurrency, parseCurrencyToNumber } from '../util/formarMoney';

export const DEFAULT_CATEGORIES = [
  'Eletrônicos',
  'Informática',
  'Acessórios',
  'Móveis',
  'Vestuário',
  'Alimentação',
];

export function useProductForm() {
  const router = useRouter();

  const {
    productId,
    storeId,
    productName,
    category: paramCategory,
    price: paramPrice,
    quantity: paramQuantity,
  } = useLocalSearchParams<{
    productId: string;
    storeId: string;
    productName?: string;
    category?: string;
    price?: string;
    quantity?: string;
  }>();

  const isEditing = !!productId;
  const { saveProduct } = useProductStore();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [hasStock, setHasStock] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryText, setCustomCategoryText] = useState('');
  const [isLoadingSaving, setIsLoadingSaving] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    category?: string;
    quantity?: string;
    general?: string;
  }>({});

  useEffect(() => {
    if (isEditing) {
      if (productName) setName(productName);
      if (paramPrice) {
        const rawValue = (Number(paramPrice) * 100).toFixed(0);
        setPrice(formatCurrency(rawValue));
      }
      if (paramCategory) {
        if (!DEFAULT_CATEGORIES.includes(paramCategory)) {
          setIsCustomCategory(true);
          setCustomCategoryText(paramCategory);
          setCategory(paramCategory);
        } else {
          setCategory(paramCategory);
        }
      }
      if (paramQuantity && Number(paramQuantity) > 0) {
        setHasStock(true);
        setQuantity(paramQuantity);
      }
    }
  }, [isEditing, productName, paramCategory, paramPrice, paramQuantity]);

  const handlePriceChange = (text: string) => {
    setPrice(formatCurrency(text));
    if (errors.price) setErrors((prev) => ({ ...prev, price: undefined }));
  };

  const validate = () => {
    let newErrors: any = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'O nome do produto é obrigatório.';
      isValid = false;
    }
    if (!price.trim() || parseCurrencyToNumber(price) <= 0) {
      newErrors.price = 'Insira um valor maior que zero.';
      isValid = false;
    }
    if (isCustomCategory && !customCategoryText.trim()) {
      newErrors.category = 'Defina o nome da nova categoria.';
      isValid = false;
    }
    if (hasStock && (!quantity.trim() || Number(quantity) < 0)) {
      newErrors.quantity = 'Insira uma quantidade válida.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const finalCategory = isCustomCategory ? customCategoryText.trim() : category;
    const finalPrice = parseCurrencyToNumber(price);
    const finalQuantity = hasStock ? Number(quantity) : 0;

    try {
      setIsLoadingSaving(true);
      setErrors({});
      const productPayload: Product = {
        id: productId || '',
        storeId: storeId,
        name: name.trim(),
        category: finalCategory,
        price: finalPrice,
        quantity: finalQuantity,
      };
      await saveProduct(productPayload);
      router.back();
    } catch (err) {
      setErrors({ general: 'Ocorreu um erro ao salvar. Tente novamente.' });
    } finally {
      setIsLoadingSaving(false);
    }
  };

  const handleCancel = () => router.back();

  return {
    isEditing,
    name,
    setName,
    price,
    setPrice,
    handlePriceChange,
    hasStock,
    setHasStock,
    quantity,
    setQuantity,
    category,
    setCategory,
    isCustomCategory,
    setIsCustomCategory,
    customCategoryText,
    setCustomCategoryText,
    isLoadingSaving,
    errors,
    setErrors,
    handleSave,
    handleCancel,
  };
}
