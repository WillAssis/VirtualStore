import Button from '../../components/Buttons/Button';
import styles from './NoResult.module.scss';

function NoResult() {
  return (
    <div className={styles.contentWrapper}>
      <p className={styles.paragraph}>
        Não encontramos resultados para a sua busca
      </p>
      <Button path="/produtos">Voltar</Button>
    </div>
  );
}

export default NoResult;
