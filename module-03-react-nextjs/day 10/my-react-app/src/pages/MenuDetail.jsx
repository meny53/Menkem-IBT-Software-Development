import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";

function MenuDetail() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error.message}</p>;
  }

  const dish = data?.find((item) => item.id === Number(id));

  if (!dish) {
    return (
      <section className="card not-found-card">
        <h2>Dish not found</h2>
        <Link to="/menu" className="btn-secondary">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section className="card detail-card">
      <div className="detail-image-wrapper">
        <img
          src={dish.image}
          alt={dish.name}
          className="detail-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/food-placeholder.svg";
          }}
        />
      </div>

      <div className="detail-content">
        <h2>{dish.name}</h2>
        <div className="detail-tags">
          <span className="dish-badge">{dish.category}</span>
          {dish.spicy && <span className="spicy-tag">🌶️ Spicy</span>}
        </div>

        {dish.description && <p className="dish-description">{dish.description}</p>}

        <p className="detail-price">
          <strong>{dish.price} ETB</strong>
        </p>

        <div className="detail-actions">
          <button
            className="add-to-cart-btn"
            onClick={() => addItem(dish)}
          >
            Add to Cart
          </button>
          <Link to="/menu" className="btn-secondary">
            Back to Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MenuDetail;