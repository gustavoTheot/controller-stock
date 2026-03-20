import { useState } from 'react';
import { ProductService } from '../services/productService';
import { Product } from '../types/productDto';

export function useProducts() {
  const productService = new ProductService();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (data: Product) => {
    try {
      setError(null);
      const response = await productService.create(data);
      setProducts((prevProducts) => [...prevProducts, response]);
    } catch (err) {
      setError('Erro ao criar o produto.');
      throw err;
    }
  };

  const updateProduct = async (data: Product) => {
    try {
      setError(null);
      const response = await productService.update(data);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === response.id ? response : product)),
      );
    } catch (err) {
      setError('Erro ao atualizar o produto.');
      throw err;
    }
  };

  const saveProduct = async (data: Product) => {
    if (data.id) {
      await updateProduct(data);
    } else {
      await addProduct(data);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setError(null);
      await productService.delete(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (err) {
      setError('Erro ao deletar o produto.');
      throw err;
    }
  };

  return {
    products,
    isLoading,
    error,
    getProducts,
    saveProduct,
    deleteProduct,
  };
}
