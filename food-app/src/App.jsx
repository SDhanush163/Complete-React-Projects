import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgressContext";

const App = () => {
  return (
    // Provides User progress state to all child components
    <UserProgressProvider>
      {/* Provides cart state and actions throughout the app */}
      <CartProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartProvider>
    </UserProgressProvider>
  );
};

export default App;
