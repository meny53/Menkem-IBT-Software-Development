import Dish from "./components/Dish";
import Card from "./components/Card";

const menu = [
  {
    id: 1,
    name: "Doro Wot",
    price: 350,
    spicy: true,
    category: "Main",
  },
  {
    id: 2,
    name: "Shiro",
    price: 200,
    spicy: false,
    category: "Main",
  },
  {
    id: 3,
    name: "Tibs",
    price: 400,
    spicy: true,
    category: "Main",
  },
  {
    id: 4,
    name: "Sambusa",
    price: 100,
    spicy: true,
    category: "Starter",
  },
];

function App() {
  const category = "Main";

  const filteredMenu = menu.filter(
    (dish) => dish.category === category
  );

  if (filteredMenu.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <div>
      <h1>Addis Eats</h1>

      <p>Category: {category}</p>

      {filteredMenu.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        </Card>
      ))}
    </div>
  );
}

export default App;