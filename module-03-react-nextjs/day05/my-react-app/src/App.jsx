import Deepcomponent from "./component/Deepcomponent";
import Menu from "./component/Menu";
import Dishlist from "./component/Dishlist";
import OrderForm from "./component/OrderForm";
import Cart from "./component/Cart";

function App() {
  return (
    <>
      <h1>Week 1 Project</h1>
      <Deepcomponent />
      <Menu />
      <Dishlist />
      <Cart />
      <OrderForm />
    </>
  );
}

export default App;