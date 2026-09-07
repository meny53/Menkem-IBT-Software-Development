import useFetch from "../hooks/useFetch";

function Menu() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Menu</h2>

      {data.map((dish) => (
        <p key={dish.id}>{dish.name}</p>
      ))}
    </div>
  );
}

export default Menu;