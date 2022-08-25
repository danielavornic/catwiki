import type { NextPage } from 'next';

import { Homebanner, Layout } from '@/components/index';

const Home: NextPage = () => {
  return (
    <Layout>
      <Homebanner />
    </Layout>
  );
};

export default Home;
