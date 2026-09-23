import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Narrow Zustand selector:
  // Menu only subscribes to addItem
  const addItem = useCartStore((state) => state.addItem);

  const category = searchParams.get("category");

  useEffect(() => {
    fetch("/dishes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dishes");
        }

        return response.json();
      })
      .then((data) => {
        const dishList = Array.isArray(data)
          ? data
          : data.items || [];

        setDishes(dishList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load the menu.");
        setLoading(false);
      });
  }, []);

  function handleCategoryChange(event) {
    const value = event.target.value;

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  }

  const filteredDishes = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;

  if (loading) {
    return <p className="loading">Loading menu...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section className="menu-section">
      <div className="menu-header-bar">
        <h2>Our Menu</h2>

        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category || "All"}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="All">All Categories</option>
            <option value="Main Course">Main Course</option>
            <option value="Side Dish">Side Dish</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>
      </div>

      {filteredDishes.length === 0 ? (
        <p className="no-dishes">No dishes found in this category.</p>
      ) : (
        <div className="card-container">
          {filteredDishes.map((dish) => (
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

                  <div className="dish-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addItem(dish)}
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
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;