function Dish({ name, price, catagory, isSpicy, onAdd, onItem }) {
  function handleClick() {
    onAdd(price);
    onItem();
  }

  return (
    <div className="dish-card">
      <h2>{name}</h2>

      <p>Price: {price} ETB</p>

      <p>Category: {catagory}</p>

      {isSpicy && <p>🌶️ Spicy</p>}

      <button onClick={handleClick}>Add to Order</button>
    </div>
  );
}

export default Dish;