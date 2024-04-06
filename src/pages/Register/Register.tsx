import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import validateUsername from '../../utils/validateUsername';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import TextInput from '../../components/Inputs/TextInput';
import Container from '../../components/Container/Container';
import OverlayLoading from '../../components/Loading/OverlayLoading';
import Button from '../../components/Buttons/Button';
import styles from './Register.module.scss';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const { status, register } = useContext(authContext);
  const loading = status === 'fetching';

  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { success, errors } = await register(username, email, password);

    if (success) {
      navigate('/');
    } else {
      setUsernameError(errors.usernameError);
      setPasswordError(errors.passwordError);
      setEmailError(errors.emailError);
    }
  }

  return (
    <main className={styles.main}>
      <OverlayLoading loading={loading} />
      <Container>
        <div className={styles.contentWrapper}>
          <form className={styles.form} noValidate onSubmit={registerUser}>
            <h2>Criar conta</h2>
            <TextInput
              label="Usuário"
              name="username"
              value={username}
              setValue={setUsername}
              error={usernameError}
              setError={setUsernameError}
              validateInput={validateUsername}
            />
            <TextInput
              label="Senha"
              name="password"
              value={password}
              setValue={setPassword}
              error={passwordError}
              setError={setPasswordError}
              validateInput={validatePassword}
              type="password"
            />
            <TextInput
              label="Email"
              name="email"
              value={email}
              setValue={setEmail}
              error={emailError}
              setError={setEmailError}
              validateInput={validateEmail}
              type="email"
            />
            <Button>Cadastrar</Button>
          </form>
        </div>
      </Container>
    </main>
  );
}

export default Register;
