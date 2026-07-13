import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../Util/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  return (
    <Modal className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly>Close</Button>
        <Button>Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
