import styles from './Footer.module.scss';

function LegalInformations() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      <p className={`${styles.paragraph} ${styles.bottomParagraph}`}>
        Copyright © {year} SOLUS Personalizados
      </p>
      <p className={`${styles.paragraph} ${styles.bottomParagraph}`}>
        CNPJ nº 55.555.555/5555-55
      </p>
    </>
  );
}

export default LegalInformations;
