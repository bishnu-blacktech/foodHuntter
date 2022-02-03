import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import { useLocalStorage } from '@utils/use-local-storage';

export const fetchCategories = async (id: string) => {
  return { categories: { data: [] } };
};

export const useCategoriesQuery = () => {
  const [restaurant, setRestaurant] = useLocalStorage<string>('restaurant');
  return useQuery<{ categories: { data: any[] } }, Error>(
    [API_ENDPOINTS.CATEGORIES],
    () => fetchCategories(restaurant ? restaurant : '')
  );
};
