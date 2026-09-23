import { memo, useState } from "react";
import { Link } from "react-router-dom";

function DishCard({ dish, onAdd, onQuickView, isCrashing = false }) {
  const [localCrash, setLocalCrash] = useState(false);

  if (isCrashing || localCrash || dish.shouldCrash) {
    throw new Error(`Deliberate error in dish [${dish.name}]: Failed to calculate traditional spice ratio.`);
  }

  return (
    <article className="dish-card" data-dish-id={dish.id}>
      <div className="dish-image-container">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/food-placeholder.svg";
          }}
        />
        {dish.spicy && <span className="spicy-tag">🌶️ Spicy</span>}
      </div>

      <div className="dish-content">
        <div className="dish-header">
          <h3 className="dish-name">{dish.name}</h3>
          <span className="dish-badge">{dish.category}</span>
        </div>

        {dish.description && (
          <p className="dish-description">{dish.description}</p>
        )}

        <div className="dish-bottom">
          <span className="dish-price">{dish.price} ETB</span>

          <div className="dish-actions">
            <button
              type="button"
              className="quick-view-btn"
              onClick={() => onQuickView(dish)}
              aria-label={`Quick view ${dish.name}`}
            >
              👁️ Quick View
            </button>

            <button
              type="button"
              className="add-to-cart-btn"
              onClick={() => onAdd(dish)}
              aria-label={`Add ${dish.name} to cart`}
            >
              Add to Cart
            </button>

            <Link
              to={`/menu/${dish.id}`}
              className="details-link"
            >
              Details
            </Link>
          </div>
        </div>

        <div className="dish-card-footer-test">
          <button
            type="button"
            className="btn-test-crash dish-crash-btn"
            onClick={() => setLocalCrash(true)}
            title="Throw deliberate error to test Menu ErrorBoundary"
          >
            💥 Test Dish Crash
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(DishCard);
