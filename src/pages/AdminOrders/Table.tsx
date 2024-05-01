import { Order } from '../../types';
import TableRow from './TableRow';
import styles from './Table.module.scss';

interface Props {
  orders: Order[];
  deleteOrder: (index: number) => void;
  updateOrder: (index: number) => void;
  showOrderDetails: (index: number) => void;
}

function Table({ orders, deleteOrder, updateOrder, showOrderDetails }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          <th>Usuário</th>
          <th>Total</th>
          <th>Status</th>
          <th>Dia</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <TableRow
            key={order._id}
            order={order}
            deleteOrder={() => deleteOrder(index)}
            updateOrder={() => updateOrder(index)}
            showOrderDetails={() => showOrderDetails(index)}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
