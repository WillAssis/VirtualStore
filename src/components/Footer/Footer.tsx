import About from './subcomponents/About';
import Contact from './subcomponents/Contact';
import Content from './subcomponents/Content';
import LegalInformations from './subcomponents/LegalInformations';
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
