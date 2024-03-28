import About from './About';
import Contacts from './Contacts';
import Content from './Content';
import LegalInformations from './LegalInformations';
import Container from '../Container/Container';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.topContentWrapper}>
          <div className={styles.aboutWrapper}>
            <About />
          </div>
          <div className={styles.linksWrapper}>
            <Content />
            <Contacts />
          </div>
        </div>
        <div className={styles.bottomContentWrapper}>
          <LegalInformations />
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
