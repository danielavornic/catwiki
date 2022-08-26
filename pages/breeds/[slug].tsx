import { GetStaticPaths, GetStaticProps } from 'next';
import classNames from 'classnames';

import { Breed } from '@/types/breeds';
import { breeds } from '@/pages/api/breeds';
import { Layout } from '@/components/Layout';

interface PropertyProps {
  title: string;
  mb?: boolean;
}
interface TextPropertyProps extends PropertyProps {
  content: string;
}

interface ChartPropertyProps extends PropertyProps {
  level?: number;
}

const sectionStyles = 'container mx-auto px-4 md:px-2';

const TextProperty = ({ title, content, mb = true }: TextPropertyProps) => (
  <p
    className={classNames('lg:text-lg', {
      'mb-6': mb,
    })}
  >
    <b>{title}: </b>
    {content}
  </p>
);

const ChartProperty = ({ title, level, mb = true }: ChartPropertyProps) => (
  <div
    className={classNames('flex items-center lg:text-lg', {
      'mb-6': mb,
    })}
  >
    <p className="font-bold w-[170px] lg:w-[200px]">{title}:</p>
    <div className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={classNames('w-[24px] md:w-[48px] h-[8px] mr-2 rounded', {
            'bg-stone-200': Number(level) <= i,
            'bg-amber-900': Number(level) > i,
          })}
        ></div>
      ))}
    </div>
  </div>
);

const Breed = ({ breed }: { breed: Breed }) => (
  <Layout title={`${breed.name} | CatWiki`} description={breed.description}>
    <section className={classNames(sectionStyles, 'lg:px-14')}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:max-w-[350px] lg:mr-12">
          <img
            src={breed.image?.url}
            alt={breed.name}
            className="rounded-2xl xl:rounded-3xl shadow-sm"
          />
        </div>
        <div className="mt-12 lg:mt-0">
          <h1 className="text-2xl md:text-3xl xl:text-4xl text-amber-900 mb-4">{breed.name}</h1>
          <p className="mb-10 lg:text-lg">{breed.description}</p>

          <TextProperty title="Temperament" content={breed.temperament} />
          <TextProperty title="Origin" content={breed.origin} />
          <TextProperty title="Life Span" content={`${breed.life_span} years`} />
          <ChartProperty title="Adaptibility" level={breed.adaptability} />
          <ChartProperty title="Affection level" level={breed.affection_level} />
          <ChartProperty title="Child Friendly" level={breed.child_friendly} />
          <ChartProperty title="Grooming" level={breed.grooming} />
          <ChartProperty title="Intelligence" level={breed.intelligence} />
          <ChartProperty title="Health issues" level={breed.health_issues} />
          <ChartProperty title="Social needs" level={breed.social_needs} />
          <ChartProperty title="Stranger friendly" level={breed.stranger_friendly} mb={false} />
        </div>
      </div>
    </section>

    <section className={classNames(sectionStyles, 'mt-16')}>
      <h1 className="text-xl md:text-2xl xl:text-3xl text-amber-900 mb-4">Other photos</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {breed?.images &&
          breed.images.map((url, index) => (
            <div
              key={index}
              className="w-full aspect-square bg-cover bg-center rounded-2xl xl:rounded-3xl"
              style={{ backgroundImage: `url(${url})` }}
            />
          ))}
      </div>
    </section>
  </Layout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.slug;
  const list = await breeds.list();
  const images = await breeds.getImagesByBreed(id as string);
  const breed = {
    ...list.find((breed: Breed) => breed.id === id),
    images: images.map((img: any) => img.url),
  };

  return {
    props: { breed },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const list = await breeds.list();
  const paths = list.map((breed: Breed) => ({
    params: { slug: breed.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Breed;
