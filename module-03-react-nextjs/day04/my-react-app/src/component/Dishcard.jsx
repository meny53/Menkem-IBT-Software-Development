function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <img
        src={dish.image}
        alt={dish.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "contain"
        }}
      />

      <div className="dish-info">
        <h3>{dish.name}</h3>

        <p>{dish.description}</p>

        <div className="dish-bottom">
          <span>${dish.price.toFixed(2)}</span>
          <button>Favorite</button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;