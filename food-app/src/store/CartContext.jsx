import { createContext, useReducer } from "react";

// Context to manage cart data and actions
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

// Handles all cart state updates
const cartReducer = (state, action) => {
  // Add an item to the cart
  if (action.type === "ADD_ITEM") {
    const exsitingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    const updatedItems = [...state.items]; // Update the state immutably by creating a new object in memory

    if (exsitingCartItemIdx > -1) {
      // Increase quantity if item already exists
      const existingItem = state.items[exsitingCartItemIdx];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[exsitingCartItemIdx] = updatedItem;
    } else updatedItems.push({ ...action.item, quantity: 1 }); // Add new item with initial quantity

    return { ...state, items: updatedItems };
  }

  // Remove an item from the cart
  if (action.type === "REMOVE_ITEM") {
    const exsitingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const existingItem = state.items[exsitingCartItemIdx];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1)
      updatedItems.splice(exsitingCartItemIdx, 1); // Remove item if quantity reaches zero
    else {
      // Decrease item quantity
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[exsitingCartItemIdx] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  // Clear all items from the cart
  if (action.type === "CLEAR_CART") return { ...state, items: [] };

  return state;
};

export const CartProvider = ({ children }) => {
  // Manage cart state using the reducer
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // Dispatch add item action
  const addItem = (item) => dispatchCartAction({ type: "ADD_ITEM", item });

  // Dispatch remove item action
  const removeItem = (id) => dispatchCartAction({ type: "REMOVE_ITEM", id });

  // Dispatch clear cart action
  const clearCart = () => dispatchCartAction({ type: "CLEAR_CART" });

  // Context value shared with all components
  const cartContext = { items: cart.items, addItem, removeItem, clearCart };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
