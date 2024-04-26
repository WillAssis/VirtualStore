import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import styles from './Order.module.scss';

const deliveryTruck = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M.75 7.5H10.5L11.25 9H1.5L.75 7.5M1.75 10.5H11.5L12.25 12H2.5L1.75 10.5M18 18.5C18.83 18.5 19.5 17.83 19.5 17C19.5 16.17 18.83 15.5 18 15.5C17.17 15.5 16.5 16.17 16.5 17C16.5 17.83 17.17 18.5 18 18.5M19.5 9.5H17V12H21.46L19.5 9.5M8 18.5C8.83 18.5 9.5 17.83 9.5 17C9.5 16.17 8.83 15.5 8 15.5C7.17 15.5 6.5 16.17 6.5 17C6.5 17.83 7.17 18.5 8 18.5M20 8L23 12V17H21C21 18.66 19.66 20 18 20C16.34 20 15 18.66 15 17H11C11 18.66 9.65 20 8 20C6.34 20 5 18.66 5 17H3V13.5 13.5H5V15H5.76C6.31 14.39 7.11 14 8 14C8.89 14 9.69 14.39 10.24 15H15V6H3V6C3 4.89 3.89 4 5 4H17V8H20Z" />
  </svg>
);

const sadFace = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" />
  </svg>
);

let headerMessage: string;
let headerIcon: JSX.Element;
let bodyDescription: string;
let orderDetail: string;

function defineTitleProps(orderResult: any) {
  if (orderResult?._id) {
    const { _id } = orderResult;
    headerMessage = 'Pedido Finalizado com Sucesso';
    headerIcon = deliveryTruck;
    bodyDescription = 'Seu pedido foi concluído e logo será entregue.';
    orderDetail = `Id do pedido: #${_id}`;
  } else {
    headerMessage = 'Ops! Tivemos um problema com o pedido';
    headerIcon = sadFace;
    bodyDescription =
      'Lamentamos, mas houve algum erro em nossos servidores e o pedido não foi concluído';
    orderDetail = 'Tente novamente mais tarde ou fale com a gente';
  }
}

function Order() {
  const lastOrder = JSON.parse(sessionStorage.getItem('lastOrder') || '{}');
  defineTitleProps(lastOrder);

  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.content}>
          <Title icon={headerIcon} text={headerMessage} />
          <div className={styles.description}>
            <p>{bodyDescription}</p>
            <br />
            <p>{orderDetail}</p>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Order;
