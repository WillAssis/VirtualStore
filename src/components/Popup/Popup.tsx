import { forwardRef } from 'react';
import styles from './Popup.module.scss';

interface Props {
  children: string | JSX.Element | JSX.Element[];
  onAccept?: () => void;
  onRefuse?: () => void;
}

const Popup = forwardRef<HTMLDialogElement, Props>(
  ({ children, onAccept, onRefuse }, ref) => {
    return (
      <dialog ref={ref} className={styles.popup}>
        <div className={styles.content}>
          {children}
          <form method="dialog" className={styles.buttons}>
            {onAccept && (
              <button
                onClick={onAccept}
                className={`${styles.button} ${styles.buttonAccept}`}
              >
                Confirmar
              </button>
            )}
            {onRefuse && (
              <button
                onClick={onRefuse}
                className={`${styles.button} ${styles.buttonRefuse}`}
              >
                Cancelar
              </button>
            )}
            <button aria-label="Fechar" className={styles.buttonClose}>
              X
            </button>
          </form>
        </div>
      </dialog>
    );
  },
);

export default Popup;
