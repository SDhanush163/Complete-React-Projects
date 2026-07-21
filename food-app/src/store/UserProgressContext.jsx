import { createContext, useState } from "react";

// Context to manage the current user interface state
const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export const UserProgressProvider = ({ children }) => {
  // Stores the current UI state (cart, checkout, or none)
  const [userProgress, setUserProgress] = useState("");

  // Show the cart modal
  const showCart = () => setUserProgress("cart");

  // Hide the cart modal
  const hideCart = () => setUserProgress("");

  // Show the checkout modal
  const showCheckout = () => setUserProgress("checkout");

  // Hide the checkout modal
  const hideCheckout = () => setUserProgress("");

  // Context value shared across the application
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
