import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { breeds } from '@/pages/api/breeds';
import { Breed, BreedSearch } from '@/types/breeds';

const groupStyles = [
  'bg-white',
  'rounded-full',
  'py-2',
  'px-4',
  'md:py-4',
  'md:px-6',
  'flex',
  'items-center',
  'justify-between',
  'w-[170px]',
  'sm:w-[220px]',
  'lg:w-[400px]',
].join(' ');

const inputStyles = [
  'text-xs',
  'md:text-sm',
  'lg:text-base',
  'focus:outline-none',
  'text-black',
  'max-w-[110px]',
  'sm:max-w-[160px]',
  'lg:max-w-none',
  'lg:w-full',
  'lg:mr-2',
  'placeholder:text-black',
].join(' ');

const listContainerStyles = [
  'text-xs',
  'md:text-sm',
  'lg:text-base',
  'focus:outline-none',
  'text-black',
  'w-[170px]',
  'sm:w-[220px]',
  'lg:w-[400px]',
  'lg:max-w-none',
  'text-black',
  'bg-white',
  'rounded-xl',
  'md:rounded-3xl',
  'top-12',
  'md:top-20',
  'absolute',
  'py-2',
  'px-2',
  'md:py-5',
  'md:px-2',
  'shadow-sm',
].join(' ');

const listStyles = [
  'max-h-[220px]',
  'overflow-auto',
  'scrollbar-thin',
  'scrollbar-thumb-gray-400',
  'scrollbar-track-gray-50',
  'scrollbar-thumb-rounded-full',
  'scrollbar-track-rounded-full',
].join(' ');

export const SearchInput = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState('');
  const [breed, setBreed] = useState<Breed | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery(['breeds', searchValue], () => breeds.search(searchValue), {
    enabled: searchValue !== '',
  });

  const { data: searches } = useQuery(['breed-searches'], breeds.getSearches);
  const { mutate } = useMutation(breeds.registerSearches, {
    onSuccess: () => {
      queryClient.invalidateQueries(['breed-searches']);
      router.push(`/breeds/${breed?.id}`);
      setBreed(null);
    },
  });

  useEffect(() => {
    if (breed) {
      const existingBreed = searches?.find(({ id }) => id === breed.id);
      const newSearches = existingBreed
        ? searches?.map((b) => (b.id === breed.id ? { ...b, searches: b.searches + 1 } : b))
        : [
            ...(searches || []),
            {
              name: breed.name,
              id: breed.id,
              img: breed.reference_image_id,
              searches: 1,
            },
          ];

      mutate(newSearches as BreedSearch[]);
    }
  }, [breed]);

  useEffect(() => {
    const handleClickOutside = (event: any) =>
      ref.current && !ref.current.contains(event.target) && setSearchValue('');
    document.addEventListener('click', handleClickOutside, true);

    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className={groupStyles}>
        <input
          type="text"
          name="breed-search"
          placeholder="Search"
          value={searchValue}
          className={inputStyles}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <span className="material-symbols-outlined text-black text-sm md:text-lg lg:text-xl">
          search
        </span>
      </div>
      {searchValue && (
        <div className={listContainerStyles}>
          <ul className={listStyles}>
            {data?.length > 0 ? (
              data.map((breed: Breed) => (
                <li
                  key={breed.id}
                  className="py-2 md:py-3 px-1 md:px-2 cursor-pointer hover:bg-gray-50 rounded-md mr-3"
                  onClick={() => setBreed(breed)}
                >
                  {breed.name}
                </li>
              ))
            ) : (
              <li className="px-1 md:px-2 text-center">
                {isLoading ? 'Loading...' : 'No breeds found 😿'}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
