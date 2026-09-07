import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Deepcomponent() {
  const { theme } = useContext(ThemeContext);

  return <p>Current theme: {theme}</p>;
}

export default Deepcomponent;