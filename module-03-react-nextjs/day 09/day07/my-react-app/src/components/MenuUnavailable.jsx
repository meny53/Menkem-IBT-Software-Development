import { Link } from "react-router-dom";

function MenuUnavailable({ error, onReset }) {
  return (
    <section className="menu-fallback-card" role="alert" aria-live="assertive">
      <div className="fallback-icon">🍲⚠️</div>
      <h2>Menu Currently Unavailable</h2>
      <p className="fallback-description">
        Our kitchen catalog service encountered an unexpected error while preparing the menu list.
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
            🔄 Try Again / Reload Menu
          </button>
        )}

        <Link to="/" className="btn-secondary">
          Return to Home
        </Link>
      </div>

      <div className="fallback-help">
        <small>
          Need urgent ordering assistance? Call Addis Eats kitchen at{" "}
          <a href="tel:+251911223344">+251 911 223344</a>
        </small>
      </div>
    </section>
  );
}

export default MenuUnavailable;
