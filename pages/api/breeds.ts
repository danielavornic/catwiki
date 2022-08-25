import { $axios } from 'lib';

export const breeds = {
  search: async (query: string) => {
    const { data } = await $axios.get(`/breeds/search?q=${query}`);

    return data;
  },
};
