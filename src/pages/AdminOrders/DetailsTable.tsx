import { Order, User } from '../../types';
import Tabs from '../../components/Tab/Tabs';
import convertDate from '../../utils/convertDate';
import getStatusColor from '../../utils/getStatusColor';
import styles from './Table.module.scss';

interface Props {
  order: Order;
}

function DetailsTable({ order }: Props) {
  const { _id, orderedBy, products, status, createdAt, updatedAt } = order;
  const createdDate = convertDate(new Date(createdAt));
  const updatedDate = convertDate(new Date(updatedAt));
  const totalPrice = products.reduce(
    (acc: number, { product, quantity }) => acc + product.price * quantity,
    0,
  );

  const orderTable = (
    <table>
      <thead>
        <tr className={styles.header}>
          <th>ID</th>
          <th>Status</th>
          <th>Total</th>
          <th>Criado em</th>
          <th>Atualizado em</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.row}>
          <td>{_id}</td>
          <td style={{ color: getStatusColor(status) }}>{status}</td>
          <td>{totalPrice}</td>
          <td>{createdDate}</td>
          <td>{updatedDate}</td>
        </tr>
      </tbody>
    </table>
  );

  const clientTable = (
    <table>
      <thead>
        <tr className={styles.header}>
          <th>ID</th>
          <th>Usuário</th>
          <th>Email</th>
          <th>Data da compra</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.row}>
          <td>{(orderedBy as User)._id}</td>
          <td>{(orderedBy as User).username}</td>
          <td>{(orderedBy as User).email}</td>
          <td>{createdDate}</td>
        </tr>
      </tbody>
    </table>
  );

  const productsTable = (
    <table>
      <thead>
        <tr className={styles.header}>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ product, quantity }) => (
          <tr key={product._id} className={styles.row}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price.toFixed(2)}</td>
            <td>{quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Tabs
      labels={['Pedido', 'Cliente', 'Produtos']}
      elements={[orderTable, clientTable, productsTable]}
    />
  );
}

export default DetailsTable;
