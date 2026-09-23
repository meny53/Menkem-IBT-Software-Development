import { useEffect, useState, useCallback, useMemo, useContext, Profiler } from "react";
import { useSearchParams } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { CartContext } from "./CartProvider";
import DishCard from "./DishCard";
import DishModal from "./DishModal";

function onRenderMenu(id, phase, actualDuration, baseDuration) {
  if (typeof window !== "undefined" && window.__ADDIS_PROFILER_LOG__) {
    window.__ADDIS_PROFILER_LOG__.push({
      id,
      phase,
      actualDuration: Number(actualDuration.toFixed(2)),
      baseDuration: Number(baseDuration.toFixed(2)),
      timestamp: Date.now(),
    });
  }
}

function Menu({ shouldCrashDishId = null }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [globalCrashSimulated, setGlobalCrashSimulated] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const zustandAddItem = useCartStore((state) => state.addItem);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    fetch("/dishes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dishes");
        }
        return response.json();
      })
      .then((data) => {
        const dishList = Array.isArray(data) ? data : data.items || [];
        setDishes(dishList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load the menu.");
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (value === "All") {
        setSearchParams({});
      } else {
        setSearchParams({ category: value });
      }
    },
    [setSearchParams]
  );

  const handleAddToCart = useCallback(
    (dish) => {
      if (zustandAddItem) {
        zustandAddItem(dish);
      }
      if (cartContext?.dispatch) {
        cartContext.dispatch({ type: "add", dish });
      }
    },
    [zustandAddItem, cartContext]
  );

  const handleQuickView = useCallback((dish) => {
    setSelectedDish(dish);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedDish(null);
  }, []);

  const filteredDishes = useMemo(() => {
    return category
      ? dishes.filter((dish) => dish.category === category)
      : dishes;
  }, [category, dishes]);

  if (loading) {
    return <p className="loading">Loading menu...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <Profiler id="Menu" onRender={onRenderMenu}>
      <section className="menu-section">
        <div className="menu-header-bar">
          <div className="menu-header-left">
            <h2>Authentic Addis Menu</h2>
            <span className="dish-count-badge">
              {filteredDishes.length} {filteredDishes.length === 1 ? "dish" : "dishes"}
            </span>
          </div>

          <div className="menu-header-controls">
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

            <button
              type="button"
              className="btn-test-crash menu-crash-toggle"
              onClick={() => setGlobalCrashSimulated(true)}
              title="Throw deliberate error to test Menu ErrorBoundary"
            >
              💥 Crash Dish #1
            </button>
          </div>
        </div>

        {filteredDishes.length === 0 ? (
          <p className="no-dishes">No dishes found in this category.</p>
        ) : (
          <div className="card-container">
            {filteredDishes.map((dish, index) => {
              const shouldCrash =
                (globalCrashSimulated && index === 0) ||
                shouldCrashDishId === dish.id;

              return (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onAdd={handleAddToCart}
                  onQuickView={handleQuickView}
                  isCrashing={shouldCrash}
                />
              );
            })}
          </div>
        )}

        <DishModal
          dish={selectedDish}
          isOpen={Boolean(selectedDish)}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      </section>
    </Profiler>
  );
}

export default Menu;