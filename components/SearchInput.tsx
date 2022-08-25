import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { breeds } from '@/pages/api/breeds';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Breed } from 'types/breeds';

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

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(1900);

  const ref = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery(['breeds', searchValue], () => breeds.search(searchValue), {
    enabled: searchValue !== '',
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleClickOutside = (event: any) =>
      ref.current && !ref.current.contains(event.target) && setSearchValue('');

    handleResize();
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  return (
    <div className="relative" ref={ref}>
      <div className={groupStyles}>
        <input
          type="text"
          name="search"
          placeholder={windowWidth > 640 ? 'Enter your breed' : 'Search'}
          value={searchValue}
          className={inputStyles}
          onChange={handleChange}
        />
        <span className="material-symbols-outlined text-black text-sm md:text-lg lg:text-xl">
          search
        </span>
      </div>
      {searchValue && (
        <div className={listContainerStyles}>
          <ul className="max-h-[220px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {data?.length > 0 ? (
              data.map(({ id, name }: Breed) => (
                <li
                  key={id}
                  className="py-2 md:py-3 last:pb-0 first:pt-0 px-1 md:px-2 cursor-pointer hover:bg-gray-50 rounded-md mr-3"
                >
                  <Link href={`/breeds/${id}`}>
                    <a>{name}</a>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-1 md:px-2 text-center">
                {isLoading ? 'Loading...' : 'No breeds found :('}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
