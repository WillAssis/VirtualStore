import { useState, useEffect } from 'react';
import { User, HTTPLoginResponse, HTTPRegisterResponse } from '../types';
import loginRequest from '../utils/loginRequest';
import registerRequest from '../utils/registerRequest';

const LOGOUT_URL = 'http://localhost:3333/logout';
const SESSION_URL = 'http://localhost:3333/profile';
const SAVE_DELAY = 750;

/**
 * Utilização dos status do hook:
 *    "idle" = nenhum ação sendo realizada
 *    "fetching" = executando uma requisição (para ativar loading em forms)
 *    "saving" = salvando dados após uma requisição (para ativar loading na página)
 */

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'idle' | 'fetching' | 'saving'>(
    'saving',
  );

  const login = async (
    username: string,
    password: string,
  ): Promise<HTTPLoginResponse> => {
    setStatus('fetching');
    const response = await loginRequest(username, password);
    const { success, user } = response;

    if (success) {
      setStatus('saving');
      setUser(user);
      setTimeout(() => setStatus('idle'), SAVE_DELAY);
    } else {
      setStatus('idle');
    }

    return response;
  };

  const logout = async () => {
    setStatus('saving');
    await fetch(LOGOUT_URL, { credentials: 'include', method: 'POST' });
    setUser(null);
    setTimeout(() => setStatus('idle'), SAVE_DELAY);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<HTTPRegisterResponse> => {
    setStatus('fetching');
    const response = await registerRequest(username, email, password);
    const { success, user } = response;

    if (success) {
      setStatus('saving');
      setUser(user);
      setTimeout(() => setStatus('idle'), SAVE_DELAY);
    } else {
      setStatus('idle');
    }

    return response;
  };

  // Verifica o token da sessão anterior
  useEffect(() => {
    const abortController = new AbortController();
    setStatus('saving');

    fetch(SESSION_URL, {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch((error) => {
        console.error(error);
        setUser(null);
      })
      .finally(() => setTimeout(() => setStatus('idle'), SAVE_DELAY));

    return () => abortController.abort();
  }, []);

  return { user, status, login, logout, register };
}

export default useAuth;
