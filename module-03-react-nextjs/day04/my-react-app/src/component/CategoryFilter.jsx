function CategoryFilter({ category, setCategory }) {
  const categories = ["All", "Pizza", "Burger", "Pasta", "Salad"];

  return (
    <div className="category-filter">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={category === item ? "active" : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;