import { createContext, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { NextShield } from 'next-shield';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import app from '@/utils/firebase';
import { Loader } from '@/components/index';

interface UserContextProps {
  user: any;
  logged: boolean;
  idToken?: string;
  isLoading?: boolean;
  setLogged: (logged: boolean) => void;
  onLogIn: (email: string, password: string) => void;
  onLogOut: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  logged: false,
  isLoading: true,
  idToken: undefined,
  setLogged: () => {},
  onLogIn: () => {},
  onLogOut: () => {},
});

const auth = getAuth(app);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [idToken, setIdToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const errorToast = (message: string) =>
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });

  const onLogIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIdToken(idToken);
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  const onLogOut = async () => {
    try {
      await auth.signOut();
      setIdToken(undefined);
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  onAuthStateChanged(auth, async (user) => {
    setLogged(!!user);
    setUser(user);
    setIsLoading(false);

    if (user) {
      const idToken = await auth.currentUser?.getIdToken();
      setIdToken(idToken);
    }
  });

  return (
    <UserContext.Provider
      value={{ logged, user, isLoading, idToken, setLogged, onLogIn, onLogOut }}
    >
      <NextShield
        isAuth={logged}
        isLoading={isLoading as boolean}
        router={router}
        privateRoutes={['/dashboard']}
        publicRoutes={['/login', '/']}
        accessRoute='/dashboard'
        loginRoute='/'
        LoadingComponent={<Loader />}
      >
        {children}
        <ToastContainer />
      </NextShield>
    </UserContext.Provider>
  );
};

export default UserProvider;
