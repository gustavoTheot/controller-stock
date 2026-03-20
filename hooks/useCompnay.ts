// src/hooks/useCompanies.ts
import { useState, useEffect, useCallback } from 'react';
import { Company } from '../types/companyDto';
import { CompanyService } from '../services/companyServer';

export function useCompany() {
  const companyService = new CompanyService();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCompanies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await companyService.getAll();
      setCompanies(data);
    } catch (err) {
      setError('Não foi possível carregar as empresas. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCompany = async (data: Company) => {
    try {
      setError(null);
      const response = await companyService.create(data);

      setCompanies((prevCompanies) => [...prevCompanies, response]);
    } catch (err) {
      setError('Erro ao criar a empresa.');
      throw err;
    }
  };

  const updateCompany = async (data: Company) => {
    try {
      setError(null);
      const response = await companyService.update(data);

      setCompanies((prevCompanies) =>
        prevCompanies.map((company) => (company.id === response.id ? response : company)),
      );
    } catch (err) {
      setError('Erro ao atualizar a empresa.');
      throw err;
    }
  };

  const saveCompany = async (data: Company) => {
    if (data.id) {
      await updateCompany(data);
    } else {
      await addCompany(data);
    }
  };

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return {
    companies,
    isLoading,
    error,
    getCompanies,
    saveCompany,
  };
}
