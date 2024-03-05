import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsernameInput from '../../components/Inputs/UsernameInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import Loading from '../../components/Loading/Loading';
import login from '../../utils/login';
import { User } from '../../types';
import './Login.css';

interface Params {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Login({ setUser }: Params) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  async function authUser(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    setLoadingMessage('Aguarde');
    event.preventDefault();
    const loginAttempt = await login(username, password);
    const { success, user, errors } = { ...loginAttempt };

    if (success) {
      setUser(user);
      setLoadingMessage(
        'Logado com sucesso. Redirecionando para a página inicial',
      );
      await new Promise((resolve) => setTimeout(resolve, 2500)); // delay
      navigate('/');
    } else {
      setUsernameError(errors.usernameError);
      setPasswordError(errors.passwordError);
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      {loading ? <Loading error={loadingMessage} /> : null}
      <section aria-labelledby="login-page-title">
        <form className="login-form" noValidate onSubmit={authUser}>
          <h2 id="login-page-title">Fazer Login</h2>
          <UsernameInput
            value={username}
            setValue={setUsername}
            error={usernameError}
            setError={setUsernameError}
          />
          <PasswordInput
            value={password}
            setValue={setPassword}
            error={passwordError}
            setError={setPasswordError}
          />
          <button>Entrar</button>
        </form>
        <div className="login-page-links">
          <Link to="/cadastro">Não tenho conta</Link>
          <Link to="/">Esqueci minha senha</Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
