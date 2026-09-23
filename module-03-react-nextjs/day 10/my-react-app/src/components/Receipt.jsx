import { Link, useLocation } from "react-router-dom";

function Receipt() {
  const location = useLocation();
  const orderData = location.state || {
    orderId: "AE-928412",
    customerName: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    items: [
      { id: 1, name: "Doro Wot", price: 350 },
      { id: 4, name: "Shiro Tegabino", price: 180 },
    ],
    total: 530,
    timestamp: new Date().toLocaleString(),
    paymentMethod: "TeleBirr",
    paymentStatus: "Completed",
  };

  return (
    <section className="receipt-section">
      <div className="receipt-card">
        <div className="receipt-header">
          <div className="receipt-status-badge">✓ Order Confirmed</div>
          <h2>Addis Eats Receipt</h2>
          <p className="receipt-order-id">Order Reference: <strong>{orderData.orderId}</strong></p>
          <span className="receipt-timestamp">{orderData.timestamp || new Date().toLocaleString()}</span>
        </div>

        <div className="receipt-divider" />

        <div className="receipt-info-grid">
          <div className="receipt-info-item">
            <span className="info-label">Customer Name:</span>
            <span className="info-val">{orderData.customerName || "Addis Eats Guest"}</span>
          </div>
          <div className="receipt-info-item">
            <span className="info-label">TeleBirr Phone:</span>
            <span className="info-val">{orderData.phone || "0911223344"}</span>
          </div>
          <div className="receipt-info-item">
            <span className="info-label">Delivery Destination:</span>
            <span className="info-val">{orderData.area || "Bole, Addis Ababa"}</span>
          </div>
          <div className="receipt-info-item">
            <span className="info-label">Payment Method:</span>
            <span className="info-val info-payment">📱 TeleBirr (Paid)</span>
          </div>
        </div>

        <div className="receipt-divider" />

        <div className="receipt-items">
          <h3>Dishes Ordered</h3>
          <ul className="receipt-items-list">
            {(orderData.items && orderData.items.length > 0
              ? orderData.items
              : [{ id: 1, name: "Doro Wot", price: 350 }]
            ).map((dish, idx) => (
              <li key={`${dish.id}-${idx}`} className="receipt-item-row">
                <span className="dish-name">{dish.name}</span>
                <span className="dish-price">{dish.price} ETB</span>
              </li>
            ))}
          </ul>

          <div className="receipt-total-row">
            <span>Total Paid:</span>
            <strong className="total-amount">{orderData.total || 350} ETB</strong>
          </div>
        </div>

        <div className="receipt-actions">
          <button
            type="button"
            className="btn-print"
            onClick={() => window.print()}
          >
            🖨️ Print Receipt
          </button>
          <Link to="/menu" className="btn-return-menu">
            🍽️ Order More Food
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Receipt;
