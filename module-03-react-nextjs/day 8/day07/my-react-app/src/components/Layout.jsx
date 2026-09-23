import { NavLink, Outlet, Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import ThemeButton from "./ThemeButton";
import { useTheme } from "../context/ThemeContext";

function Layout() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme || "light"}`}>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="brand-logo">
            <h1>Addis Eats</h1>
          </Link>

          <nav className="navbar">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Menu
            </NavLink>

            <NavLink
              to="/checkout"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Checkout
            </NavLink>
          </nav>

          <div className="header-actions">
            <CartBadge />
            <ThemeButton />
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Addis Eats. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;