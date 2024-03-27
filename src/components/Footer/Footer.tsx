import About from './About';
import Contact from './Contact';
import Content from './Content';
import LegalInformations from './LegalInformations';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="informations">
        <About />
        <div className="links">
          <Content />
          <Contact />
        </div>
      </div>
      <LegalInformations />
    </footer>
  );
}

export default Footer;
