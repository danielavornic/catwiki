import { $axiosCat, $axiosFirebase } from 'lib';
import { BreedSearch } from 'types/breeds';

export const breeds = {
  search: async (query: string) => {
    const { data } = await $axiosCat.get(`/breeds/search?q=${query}`);
    return data;
  },

  getSearches: async () => {
    const { data } = await $axiosFirebase.get('/searches.json');
    const dataArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    return dataArray;
  },

  registerSearches: async (breedsList: BreedSearch[]) => {
    const { data } = await $axiosFirebase.put('/searches.json', breedsList);
    return data;
  },
};
