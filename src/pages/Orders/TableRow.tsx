import { Order } from '../../types';
import convertDate from '../../utils/convertDate';
import getStatusColor from '../../utils/getStatusColor';
import styles from './Table.module.scss';

interface Props {
  order: Order;
  deleteOrder: () => void;
}

function TableRow({ order, deleteOrder }: Props) {
  const { products, status, createdAt } = order;
  const totalProducts = products.length;
  const totalPrice = products.reduce(
    (acc: number, { product, quantity }) => acc + product.price * quantity,
    0,
  );
  const statusColor = getStatusColor(status);
  const date = convertDate(new Date(createdAt));

  return (
    <tr className={styles.row}>
      <td colSpan={2}>
        <details>
          <summary className={styles.summary}>{totalProducts} produtos</summary>
          <ul className={styles.list}>
            {products.map(({ _id, product, quantity }) => (
              <li key={_id}>
                {product.name} - {quantity}
              </li>
            ))}
          </ul>
        </details>
      </td>
      <td>R$ {totalPrice.toFixed(2)}</td>
      <td style={{ color: statusColor }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </td>
      <td>{date}</td>
      <td>
        {/pendente/i.test(status) && (
          <button className={styles.cancelButton} onClick={deleteOrder}>
            Cancelar
          </button>
        )}
      </td>
    </tr>
  );
}

export default TableRow;
