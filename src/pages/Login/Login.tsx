import { useState } from 'react';
import { Link } from 'react-router-dom';
import UsernameInput from '../../components/Inputs/UsernameInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import login from '../../utils/login';
import { User } from '../../types';
import './Login.css';

interface Params {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Login({ setUser }: Params) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function authUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const loginAttempt = await login(username, password);
    const { success, user, errors } = { ...loginAttempt };

    if (success) {
      setUser(user);
    }

    setUsernameError(errors.usernameError);
    setPasswordError(errors.passwordError);
  }

  return (
    <main className="login-page">
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
