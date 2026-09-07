import { memo, useCallback, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../contexts/CartContext";

const Dish = memo(function Dish({ dish, onAdd }) {
  return (
    <div>
      <span>
        {dish.name} - {dish.price} ETB
      </span>

      <button onClick={() => onAdd(dish)}>
        Add
      </button>
    </div>
  );
});

function DishList() {
  const { data, loading, error } = useFetch("/dishes.json");
  const { dispatch } = useContext(CartContext);

  const handleAdd = useCallback(
    (dish) => {
      dispatch({
        type: "add",
        item: dish,
      });
    },
    [dispatch]
  );

  if (loading) return <p>Loading dishes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Dishes</h2>

      {data.map((dish) => (
        <Dish
          key={dish.id}
          dish={dish}
          onAdd={handleAdd}
        />
      ))}
    </div>
  );
}

export default DishList;