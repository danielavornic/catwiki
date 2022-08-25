import { ChangeEvent, useEffect, useState } from 'react';

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
  'max-w-[100px]',
  'sm:max-w-[180px]',
  'md:max-w-[220px]',
  'lg:max-w-[400px]',
].join(' ');

const inputStyles = [
  'text-xs',
  'md:text-sm',
  'lg:text-base',
  'focus:outline-none',
  'text-black',
  'max-w-[56px]',
  'sm:max-w-[120px]',
  'md:max-w-[160px]',
  'lg:max-w-none',
  'placeholder:text-black',
].join(' ');

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(1900);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  return (
    <div>
      <div className={groupStyles}>
        <input
          type="search"
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
    </div>
  );
};
