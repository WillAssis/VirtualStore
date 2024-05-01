import { Order, User } from '../../types';
import convertDate from '../../utils/convertDate';
import getStatusColor from '../../utils/getStatusColor';
import styles from './Table.module.scss';

interface Props {
  order: Order;
  deleteOrder: () => void;
  updateOrder: () => void;
  showOrderDetails: () => void;
}

function TableRow({
  order,
  deleteOrder,
  updateOrder,
  showOrderDetails,
}: Props) {
  const { orderedBy, products, status, createdAt } = order;
  const totalPrice = products.reduce(
    (acc: number, { product, quantity }) => acc + product.price * quantity,
    0,
  );
  const statusColor = getStatusColor(status);
  const date = convertDate(new Date(createdAt));

  return (
    <tr className={styles.row}>
      <td>{(orderedBy as User).username}</td>
      <td>R$ {totalPrice.toFixed(2)}</td>
      <td style={{ color: statusColor }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </td>
      <td>{date}</td>
      <td>
        <nav>
          <ul className={styles.buttonList}>
            <li>
              <button
                className={`${styles.button} ${styles.detailsButton}`}
                onClick={showOrderDetails}
              >
                Detalhes
              </button>
            </li>
            <li>
              <button
                className={`${styles.button} ${styles.statusButton}`}
                onClick={updateOrder}
              >
                Status
              </button>
            </li>
            <li>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={deleteOrder}
              >
                Deletar
              </button>
            </li>
          </ul>
        </nav>
      </td>
    </tr>
  );
}

export default TableRow;
