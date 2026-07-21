import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../Util/formatting";
import CartItem from "./CartItem";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

// Displays the shopping cart modal
const Cart = () => {
  // Access cart data and UI state
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate the total cart value
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  // Close the cart modal
  const handleCloseCart = () => userProgressCtx.hideCart();

  // Open the checkout modal
  const handleGoToCheckout = () => userProgressCtx.showCheckout();

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>

      {/* Display all items in the cart */}
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>

      {/* Display the total cart price */}
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>

        {/* Show checkout button only if cart has items */}
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
