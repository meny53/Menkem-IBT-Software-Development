import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function Cart() {
  const { items, dispatch, total } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id}>
              <span>
                {item.name} - {item.price} ETB
              </span>

              <button
                onClick={() =>
                  dispatch({
                    type: "remove",
                    id: item.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: {total} ETB</h3>

          <button onClick={() => dispatch({ type: "clear" })}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;