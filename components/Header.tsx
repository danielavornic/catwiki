import Link from 'next/link';

export const Header = () => {
  return (
    <header className="container mx-auto p-4 mb-4 lg:mb-10 md:px-2">
      <Link href="/">
        <a className="inline-block">
          <img src="/images/catwiki-logo.svg" />
        </a>
      </Link>
    </header>
  );
};
