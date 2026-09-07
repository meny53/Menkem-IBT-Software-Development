import { useMemo, useReducer } from "react";
import { CartContext } from "./CartContext";
import cartReducer from "../reducers/cartReducer";

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const value = useMemo(
    () => ({
      items,
      dispatch,
      total,
    }),
    [items, total]
  );

  // useMemo prevents the provider value object from being recreated
  // on every render when its contents have not changed.

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}