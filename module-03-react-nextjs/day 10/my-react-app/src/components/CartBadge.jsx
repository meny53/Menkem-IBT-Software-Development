import { useContext } from "react";
import { CartContext } from "./CartProvider";
import { useCartStore } from "../store/cartStore";

function CartBadge({ onClick }) {
  const cartContext = useContext(CartContext);
  const zustandItems = useCartStore((state) => state.items);

  const items = (cartContext?.items && cartContext.items.length > 0)
    ? cartContext.items
    : (zustandItems || []);

  const totalCount = items.length;

  return (
    <button
      type="button"
      className="cart-badge-btn"
      onClick={onClick}
      aria-label={`Shopping cart with ${totalCount} items`}
    >
      <span className="cart-badge-icon" aria-hidden="true">🛒</span>
      <span className="cart-badge-text">Cart</span>
      <span className="cart-badge-count">{totalCount}</span>
    </button>
  );
}

export default CartBadge;