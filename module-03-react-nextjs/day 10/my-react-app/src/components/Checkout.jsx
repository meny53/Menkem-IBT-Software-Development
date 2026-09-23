import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartProvider";
import { useCartStore } from "../store/cartStore";

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
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const zustandItems = useCartStore((state) => state.items);
  const zustandClear = useCartStore((state) => state.clear);

  const items = (cartContext?.items && cartContext.items.length > 0)
    ? cartContext.items
    : (zustandItems || []);

  const total = cartContext?.total !== undefined && cartContext.total > 0
    ? cartContext.total
    : items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const dispatch = cartContext?.dispatch;
  const orderTotal = total > 0 ? total : 450;

  const [form, setForm] = useState({
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [simulateFailure, setSimulateFailure] = useState(false);

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
        }, 900);
      });

      const orderData = {
        orderId: "AE-" + Math.floor(100000 + Math.random() * 900000),
        customerName: form.name,
        phone: form.phone,
        area: form.area,
        notes: form.notes,
        items: items.length > 0 ? items : [{ id: 1, name: "Doro Wot", price: 350 }],
        total: orderTotal,
        timestamp: new Date().toLocaleString(),
        paymentMethod: "TeleBirr",
        paymentStatus: "Completed",
      };

      if (dispatch) {
        dispatch({ type: "clear" });
      }
      if (zustandClear) {
        zustandClear();
      }

      navigate("/receipt", { state: orderData });
    } catch (err) {
      setServerError(err.message);
      phoneRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout with TeleBirr</h2>

      {items.length > 0 ? (
        <div className="cart-summary">
          <h3>Order Items</h3>
          {items.map((dish, idx) => (
            <div key={`${dish.id}-${idx}`} className="cart-item">
              <span>
                {dish.name} - {dish.price} ETB
              </span>
              <button
                type="button"
                onClick={() => {
                  if (dispatch) {
                    dispatch({ type: "remove", id: dish.id });
                  }
                  useCartStore.getState().remove(dish.id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-summary-total">Total: {total} ETB</div>
        </div>
      ) : (
        <div className="cart-empty-notice">
          <p>Your cart is empty. A minimum default order of 450 ETB will be prepared.</p>
        </div>
      )}

      {serverError && (
        <div role="alert" className="alert-banner error-banner">
          <strong>Error: </strong>
          {serverError}
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
          <label htmlFor="phone">TeleBirr Phone Number</label>
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
          <label htmlFor="area">Delivery Area (Addis Ababa)</label>
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
            <option value="Sarbet">Sarbet</option>
            <option value="CMC">CMC</option>
          </select>
          {show("area") && (
            <span id="area-error" role="alert" className="error">
              {errors.area}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Delivery Instructions (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            ref={notesRef}
            placeholder="Building name, landmark, gate code..."
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
            Simulate TeleBirr network timeout failure
          </label>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? `Processing ETB ${orderTotal}...`
            : `Pay ETB ${orderTotal} with TeleBirr`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;