import { useState } from 'react';
import styles from './Tabs.module.scss';

interface Props {
  labels: string[];
  elements: string[] | JSX.Element[];
}

function Tabs({ labels, elements }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <nav>
        <ul className={styles.list}>
          {labels.map((label, index) => (
            <li key={index}>
              <button
                onClick={() => setActiveIndex(index)}
                className={
                  activeIndex === index
                    ? `${styles.button} ${styles.buttonActive}`
                    : styles.button
                }
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {elements.map((element, index) => (
          <div
            key={index}
            className={
              activeIndex === index
                ? `${styles.tab} ${styles.tabActive}`
                : styles.tab
            }
          >
            {element}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
