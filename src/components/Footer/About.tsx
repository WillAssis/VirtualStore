import styles from './Footer.module.scss';

function About() {
  return (
    <>
      <h3 className={styles.title}>Sobre nós</h3>
      <p className={styles.paragraph}>
        Oferecemos artigos personalizados para bodas e casamentos
      </p>
    </>
  );
}

export default About;
