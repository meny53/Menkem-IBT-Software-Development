import { useMemo, useReducer } from "react";
import { CartContext } from "../context/CartContext";
import { cartReducer } from "../cartReducer";

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  const total = useMemo(
    () => state.items.reduce((sum, dish) => sum + dish.price, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
    }),
    [state.items, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;