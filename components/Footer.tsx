import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="container mx-auto px-4 w-full md:px-2 mt-10 lg:mt-14 xl:mt-[100px] 2xl:mt[120px]">
      <div className="bg-black text-white rounded-t-[36px] pt-8 pb-6 px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <Link href="/">
            <a>
              <img src="/images/catwiki-logo-white.svg" width="80px" />
            </a>
          </Link>
          <p className="text-sm mt-4 sm:mt-0">
            © created by <b>Daniela Vornic</b>
          </p>
        </div>
      </div>
    </footer>
  );
};
