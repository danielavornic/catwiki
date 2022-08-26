import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Loader } from '@/components/index';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleStart = () => setIsLoading(true);
  const handleStop = () => setIsLoading(false);

  useEffect(() => setIsLoading(false), []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </QueryClientProvider>
  );
}

export default MyApp;
