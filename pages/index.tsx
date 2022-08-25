import type { GetServerSideProps, NextPage } from 'next';

import { Homebanner, Layout } from '@/components/index';
import { breeds } from './api/breeds';

const Home = () => {
  return (
    <Layout>
      <Homebanner />
    </Layout>
  );
};

// Home.getInitialProps = async (context) => {
//   const query = context.query.searchBreeds;
//   const breedsList = await breeds.search(query as string);

//   return {
//     props: { breedsList },
//   };
// };

export default Home;
