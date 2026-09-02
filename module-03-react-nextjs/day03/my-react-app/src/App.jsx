import { useState } from "react";

import Dish from "./component/Dish";
import CategoryBar from "./component/Category";


const menu = [
  {
    id: 1,
    name: "Doro Wet",
    price: 250,
    catagory: "main",
    isSpicy: true,
  },
  {
    id: 2,
    name: "Kitfo",
    price: 350,
    catagory: "main",
    isSpicy: true,
  },
  {
    id: 3,
    name: "Shiro",
    price: 150,
    catagory: "side",
    isSpicy: false,
  },
  {
    id: 4,
    name: "Injera",
    price: 50,
    catagory: "side",
    isSpicy: false,
  },
  {
    id: 5,
    name: "Ayib",
    price: 100,
    catagory: "side",
    isSpicy: false,
  },
  {
    id: 6,
    name: "Gomen",
    price: 100,
    catagory: "side",
    isSpicy: false,
  },
  {
    id: 7,
    name: "Tibs",
    price: 300,
    catagory: "main",
    isSpicy: true,
  },
  {
    id: 8,
    name: "Beyainetu",
    price: 250,
    catagory: "main",
    isSpicy: false,
  },
];

const categories = ["All", "main", "side"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  function handleAdd(price) {
    setTotalPrice((prevTotal) => prevTotal + price);
  }

  function handleTotalItems() {
    setTotalItems((prevItems) => prevItems + 1);
  }

  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter((dish) => dish.catagory === selectedCategory);

  return (
    <main className="menu-container">
      <h1>Restaurant Menu</h1>

      <h3>Number of Selected Items: {totalItems}</h3>

      <h2>Total Price: {totalPrice} ETB</h2>

      <CategoryBar
        categorys={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <p>Selected Category: {selectedCategory}</p>

      <div className="menu-list">
        {filteredMenu.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            catagory={dish.catagory}
            isSpicy={dish.isSpicy}
            onAdd={handleAdd}
            onItem={handleTotalItems}
          />
        ))}
      </div>

    
    </main>
  );
}

export default App;