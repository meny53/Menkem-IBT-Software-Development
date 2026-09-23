import { Link } from "react-router-dom";

function CartUnavailable({ error, onReset }) {
  return (
    <div className="cart-fallback-card" role="alert" aria-live="assertive">
      <div className="fallback-icon">🛒⚠️</div>
      <h3>Cart Unavailable</h3>
      <p className="fallback-description">
        We encountered a problem calculating your order items.
      </p>

      {error && (
        <div className="fallback-error-details">
          <code>{error.message || String(error)}</code>
        </div>
      )}

      <div className="fallback-actions">
        {onReset && (
          <button
            type="button"
            className="btn-retry"
            onClick={onReset}
          >
            🔄 Reset Cart
          </button>
        )}
        <Link to="/menu" className="btn-secondary">
          Browse Menu
        </Link>
      </div>
    </div>
  );
}

export default CartUnavailable;
