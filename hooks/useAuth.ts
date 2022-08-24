import { useContext } from 'react';
import { UserContext } from '@/context/User';

export const useAuth = () => useContext(UserContext);
