import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

function FeaturedDishes() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p className="loading">Loading featured dishes...</p>;
  }

  if (error) {
    return <p className="error">Error: {error.message}</p>;
  }

  const featured = Array.isArray(data) ? data.slice(0, 3) : [];

  return (
    <div className="featured-section">
      <div className="section-header-row">
        <h2>Featured Dishes</h2>
        <Link to="/menu" className="view-all-link">
          View full menu →
        </Link>
      </div>

      <div className="card-container">
        {featured.map((dish) => (
          <article key={dish.id} className="dish-card">
            <div className="dish-image-container">
              <img
                src={dish.image}
                alt={dish.name}
                className="dish-image"
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
                <Link to={`/menu/${dish.id}`} className="details-link">
                  Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FeaturedDishes;