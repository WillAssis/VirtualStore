import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import validateUsername from '../../utils/validateUsername';
import validatePassword from '../../utils/validatePassword';
import TextInput from '../../components/Inputs/TextInput';
import OverlayLoading from '../../components/Loading/OverlayLoading';
import Container from '../../components/Container/Container';
import Button from '../../components/Buttons/Button';
import styles from './Login.module.scss';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { status, login } = useContext(authContext);
  const loading = status === 'fetching';

  async function authUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { success, errors } = await login(username, password);

    if (success) {
      navigate('/');
    } else {
      setUsernameError(errors.usernameError);
      setPasswordError(errors.passwordError);
    }
  }

  return (
    <main className={styles.main}>
      <OverlayLoading loading={loading} />
      <Container>
        <div className={styles.contentWrapper}>
          <form className={styles.form} noValidate onSubmit={authUser}>
            <h2>Fazer Login</h2>
            <TextInput
              name="username"
              value={username}
              setValue={setUsername}
              error={usernameError}
              setError={setUsernameError}
              validateInput={validateUsername}
            />
            <TextInput
              name="password"
              value={password}
              setValue={setPassword}
              error={passwordError}
              setError={setPasswordError}
              validateInput={validatePassword}
              type="password"
            />
            <Button>Entrar</Button>
          </form>
          <aside className={styles.linksWrapper} aria-label="Links">
            <Link className={styles.link} to="/cadastro">
              Não tenho conta
            </Link>
            <Link className={styles.link} to="/">
              Esqueci minha senha
            </Link>
          </aside>
        </div>
      </Container>
    </main>
  );
}

export default Login;
