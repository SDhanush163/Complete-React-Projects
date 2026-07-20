import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgressContext";

const App = () => {
  return (
    <UserProgressProvider>
      <CartProvider>
        <Header />
        <Meals />
        <Cart />
      </CartProvider>
    </UserProgressProvider>
  );
};

export default App;
