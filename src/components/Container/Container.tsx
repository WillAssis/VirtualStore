import styles from './Container.module.scss';

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

function Container({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
