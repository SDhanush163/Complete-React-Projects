import { currencyFormatter } from "../Util/formatting";

// Displays a single item in the shopping cart
const CartItem = ({ name, quantity, price, onIncrease, onDecrease }) => {
  return (
    <li className="cart-item">
      {/* Display item name, quantity, and price */}
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>

      {/* Buttons to update item quantity */}
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
