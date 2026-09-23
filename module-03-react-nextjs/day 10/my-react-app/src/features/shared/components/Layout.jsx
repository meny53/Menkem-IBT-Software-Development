import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import ThemeButton from "./ThemeButton";
import CartPanel from "./CartPanel";
import ErrorBoundary from "./ErrorBoundary";
import CartUnavailable from "./CartUnavailable";
import { useTheme } from "../context/ThemeContext";

function Layout() {
  const { theme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartResetKey, setCartResetKey] = useState(0);

  return (
    <div className={`app ${theme || "light"}`}>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="brand-logo">
            <span className="brand-icon">🇪🇹</span>
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

            <NavLink
              to="/receipt"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Receipt
            </NavLink>
          </nav>

          <div className="header-actions">
            <CartBadge onClick={() => setIsCartOpen((prev) => !prev)} />
            <ThemeButton />
          </div>
        </div>
      </header>

      <ErrorBoundary
        key={cartResetKey}
        fallback={
          <div className="cart-panel-error-wrapper">
            <CartUnavailable
              onReset={() => {
                setCartResetKey((k) => k + 1);
                setIsCartOpen(false);
              }}
            />
          </div>
        }
      >
        <CartPanel
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </ErrorBoundary>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 Addis Eats · Authentic Ethiopian Flavors in Bole & Beyond.</p>
          <p className="footer-links">
            <span>Powered by React 19 & Vite</span> · <span>TeleBirr Verified</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;