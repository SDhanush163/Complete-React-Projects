import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";

// Displays the application header
const Header = () => {
  // Access cart and UI state from context
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate the total number of items in the cart
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  // Open the cart modal
  const handleShowCart = () => userProgressCtx.showCart();

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="" />
        <h1>Food Order</h1>
      </div>
      <nav>
        {/* Display cart button with item count */}
        <Button textOnly={true} onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
