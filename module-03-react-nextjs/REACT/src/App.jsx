import Dish from "./components/Dish";
import Header from "./components/Header";

function App() {
  const dishes = [
    { id: 1, name: "Pizza", price: 200 },
    { id: 2, name: "Burger", price: 150 },
    { id: 3, name: "Pasta", price: 180 },
  ];

  return (
    <>
      <Header />

      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
        />
      ))}
    </>
  );
}

export default App;