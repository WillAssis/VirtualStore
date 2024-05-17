import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, MenuButton } from './Navbar';
import Logo from '../Logo/Logo';
import Container from '../Container/Container';
import ThemeButton from '../Buttons/ThemeButton';
import AccountMenu from './AccountMenu';
import styles from './Header.module.scss';

function Header() {
  const [hideNavbar, setHideNavbar] = useState(true);
  const header = useRef<HTMLElement | null>(null);

  const toggleNavbar = () => setHideNavbar(!hideNavbar);

  function closeNavbarEvent(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const headerElement = header.current;

    if (headerElement && !headerElement.contains(target)) {
      setHideNavbar(true);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', closeNavbarEvent);
    return () => document.body.removeEventListener('click', closeNavbarEvent);
  }, []);

  return (
    <header ref={header} className={styles.header}>
      <Container>
        <div className={styles.contentWrapper}>
          <Link className={styles.logo} to="/">
            <Logo />
          </Link>
          <Navbar hidden={hideNavbar} />
          <div className={styles.buttonsWrapper}>
            <ThemeButton />
            <AccountMenu />
            <MenuButton toggleNavbar={toggleNavbar} />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
