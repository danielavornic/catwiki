import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { breeds } from '@/pages/api/breeds';
import { BreedSearch } from '@/types/breeds';

const imgStyles = [
  'bg-cover',
  'bg-center',
  'bg-no-repeat',
  'w-full',
  'aspect-square',
  'rounded-2xl',
  'xl:rounded-3xl',
  'mb-2',
  'lg:mb-4',
  'transition',
  'group-hover:shadow-md',
].join(' ');

const formatData = (data: any[]) =>
  data?.sort((a, b) => (a.searches < b.searches ? 1 : -1)).slice(0, 4);

export const SearchedBreeds = () => {
  const { data } = useQuery(['searched-breeds'], breeds.getSearches);

  return (
    <div className="bg-stone-200 py-4 pb-10 md:pt-6 xl:pt-10 px-6 sm:px-8 md:px-12 lg:px-20 rounded-b-[36px]">
      <h2 className="text-xs md:text-md lg:text-lg mb-1 text-amber-900">Most searched breeds</h2>
      <div className="w-10 h-[2px] bg-amber-900"></div>
      <h2 className="mt-8 lg:mt-12 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-amber-900 mb-6 lg:mb-8">
        66+ breeds for you to discover
      </h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 lg:gap-8 xl:gap-12"
        data-testid="breeds-grid"
      >
        {data?.length &&
          formatData(data).map((breed: BreedSearch) => (
            <Link href={`/breeds/${breed.id}`} key={breed.id}>
              <a className="group" data-testid="searched-breed">
                <div
                  style={{
                    backgroundImage: `url(${breed.img})`,
                  }}
                  className={imgStyles}
                />
                <p className="text-amber-900 text-xs md:text-sm lg:text-lg font-medium transition group-hover:text-orange-900">
                  {breed.name}
                </p>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};
