import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");
    const from = location.state?.from?.pathname || "/checkout";
    navigate(from, { replace: true });
  }

  return (
    <section className="login-section">
      <div className="login-card">
        <div className="login-icon">🇪🇹</div>
        <h2>Sign In to Addis Eats</h2>
        <p className="login-subtitle">
          Please sign in to proceed to TeleBirr checkout and complete your order.
        </p>

        <div className="login-form-dummy">
          <div className="form-group">
            <label htmlFor="login-phone">Registered TeleBirr Phone</label>
            <input
              id="login-phone"
              type="tel"
              defaultValue="0911223344"
              readOnly
              className="login-input"
            />
          </div>
        </div>

        <button
          type="button"
          className="submit-btn login-btn"
          onClick={handleLogin}
        >
          Sign In & Continue to Checkout
        </button>
      </div>
    </section>
  );
}

export default Login;