function Skeleton({ type = "default", count = 1 }) {
  if (type === "checkout") {
    return (
      <div className="skeleton-container skeleton-checkout" aria-busy="true" aria-live="polite">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-box skeleton-summary" />
        <div className="skeleton-line skeleton-label" />
        <div className="skeleton-input" />
        <div className="skeleton-line skeleton-label" />
        <div className="skeleton-input" />
        <div className="skeleton-line skeleton-label" />
        <div className="skeleton-input" />
        <div className="skeleton-btn" />
      </div>
    );
  }

  if (type === "receipt") {
    return (
      <div className="skeleton-container skeleton-receipt" aria-busy="true" aria-live="polite">
        <div className="skeleton-line skeleton-badge" />
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-box skeleton-receipt-card">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
        <div className="skeleton-btn" />
      </div>
    );
  }

  if (type === "menu") {
    return (
      <div className="skeleton-container skeleton-menu-grid" aria-busy="true" aria-live="polite">
        {Array.from({ length: count || 4 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-line skeleton-card-title" />
            <div className="skeleton-line skeleton-card-desc" />
            <div className="skeleton-line skeleton-card-price" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-container skeleton-default" aria-busy="true" aria-live="polite">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-box" />
    </div>
  );
}

export default Skeleton;
