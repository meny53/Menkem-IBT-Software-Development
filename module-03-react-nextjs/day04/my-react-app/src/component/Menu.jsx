import { useEffect, useRef, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import DishCard from "./Dishcard";
import SearchBar from "./SearchBar";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchInputRef = useRef(null);

  // Focus search input when the component mounts
  useEffect(() => {
  if (!loading && searchInputRef.current) {
    searchInputRef.current.focus();
  }
}, [loading]);

  // Fetch dishes whenever the category changes
  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/dishes.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Unable to load dishes. Server returned ${response.status}.`
          );
        }

        const data = await response.json();

        const filteredDishes =
          category === "All"
            ? data
            : data.filter((dish) => dish.category === category);

        setDishes(filteredDishes);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();

    return () => {
      controller.abort();
    };
  }, [category]);

  // Update document title whenever the dish list changes
  useEffect(() => {
    document.title = `${dishes.length} dishes`;
  }, [dishes]);

  // Filter dishes based on search term
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return <p>Loading dishes...</p>;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>Our Menu</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        inputRef={searchInputRef}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      {filteredDishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <div className="dish-list">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Menu;