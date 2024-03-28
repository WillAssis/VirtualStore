import Loading from './Loading';
import styles from './OverlayLoading.module.scss';

interface Props {
  loading: boolean;
  error?: string;
}

/**
 * Cobre o conteúdo do parent com uma tela de loading opaca quando loading for true
 *  -> para o efeito funcionar o parent deve formar um stacking context (position: relative).
 *  -> ideal quando o conteúdo da página não sofre grandes alterações (ex: requisição em formulários).
 */
function OverlayLoading({ loading, error }: Props) {
  return (
    <div
      className={
        loading
          ? `${styles.wrapper} ${styles.wrapperVisible}`
          : `${styles.wrapper} ${styles.wrapperHidden}`
      }
    >
      <Loading loading={loading} error={error} />
    </div>
  );
}

export default OverlayLoading;
