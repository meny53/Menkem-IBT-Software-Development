import Header from "./components/Header";
import Dish from "./components/Dish";

function App() {
  const dishes = [
    {
      id: 1,
      name: "Doro Wot",
      price: 250,
    },
    {
      id: 2,
      name: "Tibs",
      price: 300,
    },
    {
      id: 3,
      name: "Shiro Wot",
      price: 180,
    },
    {
      id: 4,
      name: "Kitfo",
      price: 350,
    },
  ];

  return (
    <>
      <Header />

      <main>
        <h2>Our Menu</h2>

        <section className="menu">
          {dishes.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;