import { SearchInput } from './SearchInput';
import { SearchedBreeds } from './SearchedBreeds';

const imgBgStyles = [
  "bg-[url('/images/hero-image-sm.png')]",
  "xs:bg-[url('/images/hero-image-md.png')]",
  "lg:bg-[url('/images/hero-image-lg.png')]",
  'min-h-[160px]',
  'xs:min-h-[200px]',
  'sm:min-h-[300px]',
  'md:min-h-[420px]',
  'lg:min-h-[500px]',
  'xl:min-h-[600px]',
  'rounded-t-[36px]',
  'p-6',
  'sm:p-8',
  'md:p-12',
  'lg:p-20',
  'bg-cover',
  'bg-no-repeat',
  'bg-right',
  'text-white',
  'flex',
  'items-center',
].join(' ');

const textStyles = [
  'text-xs',
  'sm:text-sm',
  'md:text-lg',
  'lg:text-2xl',
  'max-w-[130px]',
  'sm:max-w-[180px]',
  'md:max-w-[200px]',
  'lg:max-w-[370px]',
  'mt-2',
  'md:mt-4',
  'mb-4',
  'md:mb-8',
  'lg:mb-10',
].join(' ');

export const Homebanner = () => {
  return (
    <div className="container mx-auto px-4 md:px-2">
      <div className={imgBgStyles}>
        <div>
          <img
            src="/images/catwiki-logo-white.svg"
            className="w-[100px] sm:w-[200px] lg:w-[300px]"
          />
          <h1 className={textStyles}>Get to know more about your cat breed</h1>
          <SearchInput />
        </div>
      </div>
      <SearchedBreeds />
    </div>
  );
};
