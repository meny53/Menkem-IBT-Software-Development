function CategoryBar({ categorys, selected, onSelect }) {
  return (
    <div className="category-map">
      {categorys.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={selected === category ? "active" : ""}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;