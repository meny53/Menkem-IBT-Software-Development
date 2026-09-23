import { useState, useContext, useRef } from "react";
import { CartContext } from "./CartProvider";

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!form.phone.trim()) {
    errors.phone = "TeleBirr phone number is required";
  } else if (!/^(?:\+251|0)?[97]\d{8}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid TeleBirr number (e.g. 0911223344 or 0711223344)";
  }

  if (!form.area) {
    errors.area = "Delivery area is required";
  }

  return errors;
}

function Checkout() {
  const cartContext = useContext(CartContext);
  const items = cartContext?.items || [];
  const total = cartContext?.total || 0;
  const dispatch = cartContext?.dispatch;

  const orderTotal = total > 0 ? total : 450;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [simulateFailure, setSimulateFailure] = useState(true);

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);
  const notesRef = useRef(null);

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  const show = (field) => Boolean(touched[field] && errors[field]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (hasErrors) {
      setTouched({
        name: true,
        phone: true,
        area: true,
        notes: true,
      });

      if (errors.name) {
        nameRef.current?.focus();
      } else if (errors.phone) {
        phoneRef.current?.focus();
      } else if (errors.area) {
        areaRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setServerError("");
    setSuccessMessage("");

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (simulateFailure) {
            reject(
              new Error(
                "Payment failed: TeleBirr service timed out. Please verify your phone number and retry."
              )
            );
          } else {
            resolve({
              orderId: "AE-" + Math.floor(100000 + Math.random() * 900000),
            });
          }
        }, 1200);
      });

      setSuccessMessage(
        `Order confirmed! Delivering to ${form.area}. Thank you, ${form.name}!`
      );
    } catch (err) {
      setServerError(err.message);
      phoneRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      {items.length > 0 && (
        <div className="cart-summary">
          {items.map((dish) => (
            <div key={dish.id} className="cart-item">
              <span>
                {dish.name} - {dish.price} ETB
              </span>
              <button
                type="button"
                onClick={() =>
                  dispatch &&
                  dispatch({
                    type: "remove",
                    id: dish.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
          <h3>Total: {total} ETB</h3>
        </div>
      )}

      {serverError && (
        <div role="alert" className="alert-banner error-banner">
          <strong>Error: </strong>
          {serverError}
        </div>
      )}

      {successMessage && (
        <div role="status" className="alert-banner success-banner">
          <strong>Success: </strong>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            ref={nameRef}
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!show("name")}
            aria-describedby={show("name") ? "name-error" : undefined}
          />
          {show("name") && (
            <span id="name-error" role="alert" className="error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">TeleBirr Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            ref={phoneRef}
            placeholder="0911223344"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!show("phone")}
            aria-describedby={show("phone") ? "phone-error" : undefined}
          />
          {show("phone") && (
            <span id="phone-error" role="alert" className="error">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="area">Delivery Area</label>
          <select
            id="area"
            name="area"
            ref={areaRef}
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!show("area")}
            aria-describedby={show("area") ? "area-error" : undefined}
          >
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
          </select>
          {show("area") && (
            <span id="area-error" role="alert" className="error">
              {errors.area}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Delivery Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            ref={notesRef}
            placeholder="Gate code, specific building, or landmarks..."
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!show("notes")}
            aria-describedby={show("notes") ? "notes-error" : undefined}
          />
        </div>

        <div className="simulation-box">
          <label htmlFor="simulateFailure">
            <input
              type="checkbox"
              id="simulateFailure"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
            />
            Simulate failed network request
          </label>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? `Submitting (ETB ${orderTotal})...`
            : `Pay ETB ${orderTotal} with TeleBirr`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;