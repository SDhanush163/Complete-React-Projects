import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const exsitingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    const updatedItems = [...state.items]; // Update the state immutably by creating a new object in memory
    if (exsitingCartItemIdx > -1) {
      const existingItem = state.items[exsitingCartItemIdx];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[exsitingCartItemIdx] = updatedItem;
    } else updatedItems.push({ ...action.item, quantity: 1 });

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const exsitingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const existingItem = state.items[exsitingCartItemIdx];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1)
      updatedItems.splice(exsitingCartItemIdx, 1);
    else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[exsitingCartItemIdx] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
};

export const CartProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatchCartAction({ type: "ADD_ITEM", item });
  const removeItem = (id) => dispatchCartAction({ type: "REMOVE_ITEM", id });

  const cartContext = { items: cart.items, addItem, removeItem };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
