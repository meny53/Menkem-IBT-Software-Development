import FeaturedDishes from "../components/FeaturedDishes";

function Home() {
  return (
    <section className="home-section">
      <div className="welcome-banner">
        <h2>Welcome to Addis Eats</h2>
        <p>
          Experience authentic Ethiopian cuisine cooked with traditional spices and fresh ingredients.
          Order online for quick delivery or browse our diverse menu.
        </p>
      </div>

      <FeaturedDishes />
    </section>
  );
}

export default Home;