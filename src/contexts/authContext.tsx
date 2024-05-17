import { createContext } from 'react';
import { AuthContextType } from '../types';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const authContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: Props) {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      <Loading loading={auth.status === 'saving'}>{children}</Loading>
    </authContext.Provider>
  );
}

export { AuthProvider, authContext };
