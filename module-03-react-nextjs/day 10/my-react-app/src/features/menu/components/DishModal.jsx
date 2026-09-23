import { useState } from "react";
import Modal from "./ui/Modal";

function DishModal({ dish, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!dish) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(dish);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={dish.name}
      ariaDescribedBy="dish-modal-description"
    >
      <div className="dish-modal-layout">
        <div className="dish-modal-media">
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-modal-img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/food-placeholder.svg";
            }}
          />
        </div>

        <div className="dish-modal-details">
          <div className="dish-modal-badges">
            <span className="dish-badge">{dish.category}</span>
            {dish.spicy && <span className="spicy-tag">🌶️ Spicy</span>}
          </div>

          <p id="dish-modal-description" className="dish-modal-desc">
            {dish.description || "Authentic traditional Ethiopian dish made with fresh ingredients and signature spices."}
          </p>

          <div className="dish-modal-notes">
            <strong>Traditional Pairing:</strong> Served fresh with warm gluten-free teff Injera.
          </div>

          <div className="dish-modal-price-row">
            <span className="dish-modal-price">{dish.price} ETB</span>

            <div className="quantity-control" aria-label="Adjust order quantity">
              <button
                type="button"
                className="btn-qty"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-value" aria-live="polite">{quantity}</span>
              <button
                type="button"
                className="btn-qty"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="dish-modal-actions">
            <button
              type="button"
              className="btn-add-modal"
              onClick={handleAdd}
            >
              Add {quantity} to Order ({dish.price * quantity} ETB)
            </button>
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DishModal;
