import styles from './Loading.module.scss';

interface Props {
  loading: boolean;
  error: string;
  children: string | JSX.Element | JSX.Element[];
}

function Loading({ loading, error, children }: Props) {
  if (loading || error) {
    return (
      <section className={styles.loading}>
        <div
          className={styles.spinner}
          role="alert"
          aria-busy={loading}
          aria-label="Loading"
        ></div>
        <p className={styles.error}>{error}</p>
      </section>
    );
  }

  return children;
}

export default Loading;
