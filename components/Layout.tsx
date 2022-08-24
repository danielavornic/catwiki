import Head from 'next/head';
import { PropsWithChildren } from 'react';

import { Footer, Header } from '.';

interface LayoutProps {
  title?: string;
  description?: string;
}

export const Layout = ({
  title = 'Catwiki',
  description = 'Explore kittens with CatWiki',
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />
      <main className="min-h-[80vh] sm:min-h-[85vh]">{children}</main>
      <Footer />
    </>
  );
};
