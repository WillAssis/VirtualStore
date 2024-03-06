import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsernameInput from '../../components/Inputs/UsernameInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import EmailInput from '../../components/Inputs/EmailInput';
import Loading from '../../components/Loading/Loading';
import register from '../../utils/register';
import { User } from '../../types';
import './Register.css';

interface Params {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Register({ setUser }: Params) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    setLoadingMessage('Aguarde');
    event.preventDefault();
    const registerAttempt = await register(username, email, password);
    const { success, user, errors } = { ...registerAttempt };

    if (success) {
      setUser(user);
      setLoadingMessage(
        'Usuário cadastrado com sucesso. Redirecionando para a página inicial',
      );
      await new Promise((resolve) => setTimeout(resolve, 2500)); // delay
      navigate('/');
    } else {
      setUsernameError(errors.usernameError);
      setPasswordError(errors.passwordError);
      setEmailError(errors.emailError);
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      {loading ? <Loading error={loadingMessage} /> : null}
      <form className="register-form" noValidate onSubmit={registerUser}>
        <h2>Criar conta</h2>
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
        <EmailInput
          value={email}
          setValue={setEmail}
          error={emailError}
          setError={setEmailError}
        />
        <button>Cadastrar</button>
      </form>
    </main>
  );
}

export default Register;
