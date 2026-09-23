import { Link } from "react-router-dom";

function RouteErrorFallback({ error, onReset }) {
  return (
    <div className="route-fallback-card" role="alert" aria-live="assertive">
      <div className="fallback-icon">📡⚠️</div>
      <h2>Failed to Load Page</h2>
      <p className="fallback-description">
        We could not load this section of Addis Eats. This usually happens if your connection was interrupted while fetching application resources.
      </p>

      {error && (
        <div className="fallback-error-details">
          <code>{error.message || String(error)}</code>
        </div>
      )}

      <div className="fallback-actions">
        {onReset ? (
          <button
            type="button"
            className="btn-retry"
            onClick={onReset}
          >
            🔄 Retry Loading
          </button>
        ) : (
          <button
            type="button"
            className="btn-retry"
            onClick={() => window.location.reload()}
          >
            🔄 Reload Page
          </button>
        )}
        <Link to="/" className="btn-secondary">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default RouteErrorFallback;
