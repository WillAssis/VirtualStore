import { Order } from '../../types';
import TableRow from './TableRow';
import styles from './Table.module.scss';

interface Props {
  orders: Order[];
  deleteOrder: (id: string) => void;
}

function Table({ orders, deleteOrder }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          <th colSpan={2}>Produtos</th>
          <th>Total</th>
          <th>Status</th>
          <th>Dia</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <TableRow
            key={order._id}
            order={order}
            deleteOrder={() => deleteOrder(order._id)}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
