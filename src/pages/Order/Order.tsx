import Title from "./subcomponents/Title";
import deliveryTruck from '../../delivery-truck.svg'
import sadFace from '../../sad-face.svg'
import './Order.css';

let headerMessage: string;
let headerIcon: string;
let altIcon: string;
let bodyDescription: string;
let orderDetail: string;

function defineTitleProps(orderResult: any) {
    if(orderResult?.id) {
        const { id } = orderResult;
        headerMessage = 'Pedido Finalizado com Sucesso';
        headerIcon = deliveryTruck;
        altIcon = 'Ícone de caminhão de entrega';
        bodyDescription = "Seu pedido foi concluído e logo será entregue.";
        orderDetail = `Id do pedido: #${id}`;
    } else {
        headerMessage = 'Ops! Tivemos um problema com o pedido';
        headerIcon = sadFace;
        altIcon = 'Ícone de um rosto triste';
        bodyDescription = 'Lamentamos, mas houve algum erro em nossos servidores e o pedido não foi concluído';
        orderDetail = 'Tente novamente mais tarde ou fale com a gente';
    }
}
function Order() {
    const orderResult = JSON.parse(sessionStorage.getItem('orderResult') || '{}');
    defineTitleProps(orderResult);

    return (
        <main className="order-page">
            <Title message={ headerMessage } icon={ headerIcon } alt={ altIcon }/>
            <div className="order-description">
                <p>{ bodyDescription }</p>
                <br />
                <p>{ orderDetail }</p>
            </div>
        </main>
    )
}

export default Order;
