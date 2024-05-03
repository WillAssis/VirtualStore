import { useRef, useState } from 'react';
import useOrders from '../../hooks/useOrders';
import Title from '../../components/Title/Title';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';
import Popup from '../../components/Popup/Popup';
import Table from './Table';
import DetailsTable from './DetailsTable';
import SelectInput from '../../components/Inputs/SelectInput';
import styles from './AdminOrders.module.scss';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M11.97,19.88C10.93,20.26 9.78,19.72 9.4,18.69C9,17.65 9.55,16.5 10.59,16.13C11.63,15.75 12.78,16.28 13.16,17.31C13.54,18.35 13,19.5 11.97,19.88M9.9,14.25C7.83,15 6.76,17.3 7.5,19.38C8.28,21.45 10.58,22.5 12.66,21.75C14.73,21 15.79,18.7 15.04,16.63C14.28,14.55 11.97,13.5 9.9,14.25M15.94,4.58L9.37,7L10.75,10.74L17.32,8.33M20.32,13.62L15.54,15.37C15.71,15.66 15.85,15.96 15.97,16.28C16.09,16.6 16.17,16.93 16.22,17.25L21,15.5M19.54,8.58L11.09,11.68L11.58,13C12.83,13.09 14,13.64 14.89,14.55L20.92,12.34M2,2V4H5.09L8.66,13.75C8.94,13.57 9.24,13.43 9.56,13.31C9.88,13.19 10.21,13.11 10.53,13.06L6.5,2" />
  </svg>
);

type StatusValue = 'pendente' | 'aceito' | 'entregue' | 'cancelado';

function AdminOrders() {
  const deletePopupRef = useRef<HTMLDialogElement>(null);
  const updatePopupRef = useRef<HTMLDialogElement>(null);
  const detailsPopupRef = useRef<HTMLDialogElement>(null);

  const [statusValue, setStatusValue] = useState<StatusValue>('pendente');
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);
  const { orders, loading, error, updateOrder, deleteOrder } =
    useOrders('admin');

  const selectedOrder = orders[selectedOrderIndex];

  const popupForDeletion = (index: number) => {
    setSelectedOrderIndex(index);
    deletePopupRef.current?.showModal();
  };

  const popupForUpdate = (index: number) => {
    setSelectedOrderIndex(index);
    updatePopupRef.current?.showModal();
  };

  const popupForDetails = (index: number) => {
    setSelectedOrderIndex(index);
    detailsPopupRef.current?.showModal();
  };

  const deleteSelectedOrder = async () => {
    await deleteOrder(selectedOrder._id);
    setSelectedOrderIndex(0);
  };

  const updateSelectedOrder = async () => {
    await updateOrder(selectedOrder._id, statusValue);
    setSelectedOrderIndex(0);
  };

  return (
    <main className={styles.main}>
      <Loading loading={loading} error={error}>
        <Container>
          <div className={styles.contentWrapper}>
            <Title icon={icon} text="Mostrando pedidos" />
            <div className={styles.ordersWrapper}>
              {orders.length > 0 ? (
                <>
                  <Table
                    orders={orders}
                    deleteOrder={popupForDeletion}
                    updateOrder={popupForUpdate}
                    showOrderDetails={popupForDetails}
                  />
                  <Popup ref={detailsPopupRef}>
                    <DetailsTable order={orders[selectedOrderIndex]} />
                  </Popup>
                  <Popup ref={updatePopupRef} onAccept={updateSelectedOrder}>
                    <SelectInput
                      name="status"
                      label="Alterar status do pedido"
                      values={['pendente', 'aceito', 'entregue', 'cancelado']}
                      labels={['Pendente', 'Aceito', 'Entregue', 'Cancelado']}
                      setValue={setStatusValue}
                    />
                  </Popup>
                  <Popup ref={deletePopupRef} onAccept={deleteSelectedOrder}>
                    Tem certeza que deseja deletar o pedido
                  </Popup>
                </>
              ) : (
                <p className={styles.noOrdersParagraph}>
                  Nenhum pedido encontrado
                </p>
              )}
            </div>
          </div>
        </Container>
      </Loading>
    </main>
  );
}

export default AdminOrders;
