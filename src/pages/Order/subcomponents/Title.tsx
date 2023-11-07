import { OrderPageTitle } from "../../../types";

function Title( props: OrderPageTitle ) {
  return (
    <h2>
      <img src={ props.icon } alt={ props.alt } />
      { props.message }
    </h2>
  );
}

export default Title;