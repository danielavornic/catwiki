import type { NextPage } from 'next';
import Head from 'next/head';

import { Input } from '@/components/index';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in | Classroom</title>
      </Head>
      <div className='container mx-auto flex justify-center items-center h-screen'>
        <div className='border py-16 px-12 rounded-md max-w-full md:max-w-none'>
          <h1 className='text-3xl text-center mb-6'>Classroom</h1>
          <h2 className='text-2xl text-center mb-16'>Sign in</h2>
          <form className='flex flex-col'>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              className='mb-4'
            />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              className='mb-8'
            />
            <Input type='submit' />
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
