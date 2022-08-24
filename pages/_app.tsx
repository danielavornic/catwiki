import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import UserProvider from './../context/User';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
