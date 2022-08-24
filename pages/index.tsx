import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useAuth } from '@/hooks/index';
import { Input } from '@/components/index';

interface FormValues {
  email: string;
  password: string;
}

const initialFormValues = {
  email: '',
  password: '',
};

const LogIn: NextPage = () => {
  const { onLogIn } = useAuth();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onLogIn(formValues.email, formValues.password);
  };

  return (
    <>
      <Head>
        <title>Sign in | Classroom</title>
      </Head>
      <div className='container mx-auto flex justify-center items-center h-screen'>
        <div className='border py-16 px-12 rounded-md max-w-full md:max-w-none'>
          <h1 className='text-3xl text-center mb-6'>Classroom</h1>
          <h2 className='text-2xl text-center mb-16'>Sign in</h2>

          <form className='flex flex-col' onSubmit={handleSubmit}>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              className='mb-4'
              onChange={handleChange}
              required
            />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              className='mb-8'
              minLength={6}
            />
            <Input type='submit' />
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
