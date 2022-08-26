import { $axiosCat, $axiosFirebase } from 'lib';
import { BreedSearch } from 'types/breeds';

export const breeds = {
  search: async (query: string) => {
    const { data } = await $axiosCat.get(`/breeds/search?q=${query}`);
    return data;
  },

  getSearches: async () => {
    const { data } = await $axiosFirebase.get('/searches.json?orderBy="searches"&limitToLast=4');
    const dataArray = Object.keys(data)
      .map((key) => ({ id: key, ...data[key] }))
      .filter((obj) => !!obj?.img);

    for (const breed of dataArray) {
      const img = await breeds.getImageById(breed.img);
      dataArray[dataArray.indexOf(breed)].imgUrl = img.url;
    }

    return dataArray;
  },

  registerSearches: async (breedsList: BreedSearch[]) => {
    const { data } = await $axiosFirebase.put('/searches.json', breedsList);
    return data;
  },

  list: async () => {
    const { data } = await $axiosCat.get('/breeds');
    return data;
  },

  getImagesByBreed: async (breedId: string, limit: number = 9) => {
    const { data } = await $axiosCat.get(`/images/search?breed_id=${breedId}&limit=${limit}`);
    return data.slice(1, limit);
  },

  getImageById: async (id: string) => {
    const { data } = await $axiosCat.get(`/images/${id}`);
    return data;
  },
};
