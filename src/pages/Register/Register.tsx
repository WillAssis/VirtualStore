import { useState } from 'react';
import UsernameInput from '../../components/Inputs/UsernameInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import EmailInput from '../../components/Inputs/EmailInput';
import register from '../../utils/register';
import { User } from '../../types';
import './Register.css';

interface Params {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Register({ setUser }: Params) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const registerAttempt = await register(username, email, password);
    const { success, user, errors } = { ...registerAttempt };

    if (success) {
      setUser(user);
    }

    setUsernameError(errors.usernameError);
    setPasswordError(errors.passwordError);
    setEmailError(errors.emailError);
  }

  return (
    <main className="register-page">
      <form className="register-form" onSubmit={registerUser}>
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
