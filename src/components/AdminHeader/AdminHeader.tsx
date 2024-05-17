import { useState, useEffect, useRef } from 'react';
import { Navbar, MenuButton } from './Navbar';
import Container from '../Container/Container';
import Button from '../Buttons/Button';
import ThemeButton from '../Buttons/ThemeButton';
import styles from './AdminHeader.module.scss';

function AdminHeader() {
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
          <Button path="/">Voltar</Button>
          <Navbar isHidden={hideNavbar} />
          <div className={styles.buttonsWrapper}>
            <ThemeButton />
            <MenuButton toggleNavbar={toggleNavbar} />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default AdminHeader;
