import type { NextPage } from 'next';
import Head from 'next/head';

import { useAuth } from '@/hooks/index';

const Dashboard: NextPage = () => {
  const { onLogOut } = useAuth();

  return (
    <>
      <Head>
        <title>Dashboard | Classroom</title>
      </Head>
      <div>you are logged in</div>
      <button onClick={onLogOut}>log out</button>
    </>
  );
};

export default Dashboard;
