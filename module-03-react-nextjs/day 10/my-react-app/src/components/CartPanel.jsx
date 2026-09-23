import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartProvider";
import { useCartStore } from "../store/cartStore";

function CartPanel({ isOpen, onClose }) {
  const [shouldCrash, setShouldCrash] = useState(false);

  const cartContext = useContext(CartContext);
  const zustandItems = useCartStore((state) => state.items);
  const zustandRemove = useCartStore((state) => state.remove);
  const zustandClear = useCartStore((state) => state.clear);

  const items = (cartContext?.items && cartContext.items.length > 0)
    ? cartContext.items
    : (zustandItems || []);

  const total = cartContext?.total !== undefined && cartContext.total > 0
    ? cartContext.total
    : items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleRemove = (id) => {
    if (cartContext?.dispatch) {
      cartContext.dispatch({ type: "remove", id });
    }
    if (zustandRemove) {
      zustandRemove(id);
    }
  };

  const handleClear = () => {
    if (cartContext?.dispatch) {
      cartContext.dispatch({ type: "clear" });
    }
    if (zustandClear) {
      zustandClear();
    }
  };

  if (shouldCrash) {
    throw new Error("Deliberate cart panel crash: Failed to calculate live TeleBirr cart items.");
  }

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      className="cart-panel"
      role="dialog"
      aria-label="Shopping Cart Panel"
      aria-modal="false"
    >
      <div className="cart-panel-header">
        <h3>Your Order ({items.length} {items.length === 1 ? "dish" : "dishes"})</h3>
        <button
          type="button"
          className="cart-close-btn"
          onClick={onClose}
          aria-label="Close cart panel"
        >
          ✕
        </button>
      </div>

      <div className="cart-panel-body">
        {items.length === 0 ? (
          <div className="cart-empty-state">
            <p>Your cart is empty.</p>
            <p className="cart-empty-hint">Add authentic dishes from the menu to start your order.</p>
          </div>
        ) : (
          <ul className="cart-items-list">
            {items.map((dish, index) => (
              <li key={`${dish.id}-${index}`} className="cart-panel-item">
                <div className="cart-item-details">
                  <span className="cart-item-name">{dish.name}</span>
                  <span className="cart-item-price">{dish.price} ETB</span>
                </div>
                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() => handleRemove(dish.id)}
                  aria-label={`Remove ${dish.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cart-panel-footer">
        <div className="cart-total-row">
          <span>Subtotal:</span>
          <strong>{total} ETB</strong>
        </div>

        {items.length > 0 && (
          <div className="cart-actions-group">
            <Link
              to="/checkout"
              className="btn-checkout-link"
              onClick={onClose}
            >
              Proceed to TeleBirr Checkout →
            </Link>
            <button
              type="button"
              className="btn-clear-cart"
              onClick={handleClear}
            >
              Clear Cart
            </button>
          </div>
        )}

        <div className="cart-boundary-test">
          <button
            type="button"
            className="btn-test-crash cart-crash-btn"
            onClick={() => setShouldCrash(true)}
            title="Throw deliberate error to test Cart ErrorBoundary"
          >
            💥 Test Cart Crash
          </button>
        </div>
      </div>
    </aside>
  );
}

export default CartPanel;
