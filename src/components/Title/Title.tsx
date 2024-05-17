import styles from './Title.module.scss';

interface Props {
  icon: JSX.Element;
  text: string;
}

function Title({ icon, text }: Props) {
  return (
    <h2 className={styles.title}>
      {icon}
      {text}
    </h2>
  );
}
export default Title;
