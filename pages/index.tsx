import { ArticlePreview, Homebanner, Layout } from '@/components/index';
import classNames from 'classnames';

const sectionStyles = 'container mx-auto px-4 md:px-2';

const Home = () => {
  return (
    <Layout>
      <section className={sectionStyles}>
        <Homebanner />
      </section>
      <section className={classNames(sectionStyles, 'mt-14 lg:mt-20 xl:mt-24')}>
        <ArticlePreview />
      </section>
    </Layout>
  );
};

export default Home;
