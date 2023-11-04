import deliveryTruck from '../../../delivery-truck.svg'

function Title() {
  return (
    <h2>
      <img src={deliveryTruck} alt="Caminhão de Entrega" />
      Pedido Finalizado
    </h2>
  );
}

export default Title;