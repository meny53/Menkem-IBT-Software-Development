# Addis Eats · Authentic Ethiopian Food Delivery

A full-stack client web application built with React 19, React Router v7, Zustand, and Vite for ordering authentic Ethiopian cuisine in Addis Ababa.

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Execution
```bash
# Clone the repository
git clone https://github.com/meny53/Menkem-IBT-Software-Development.git

# Navigate to the Addis Eats application directory
cd module-03-react-nextjs/day07/my-react-app

# Install project dependencies
npm install

# Start local development server
npm run dev

# Build production bundle with code-split chunks
npm run build

# Preview production build locally
npm run preview
```

---

## Route Map & Cold Load Verification

The application features 6 core routes plus a catch-all route, all configured to load cold directly from the browser address bar:

| Route Path | View / Component | Guard / Access | Loading Mechanism | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `Home` | Public | Eager | Welcome hero banner with Ethiopian branding and featured dishes carousel. |
| `/menu` | `MenuPage` / `Menu` | Public | Eager (`ErrorBoundary`) | Full catalog with category filtering synced to URL query strings. |
| `/menu/:id` | `MenuDetail` | Public | Eager (`ErrorBoundary`) | Dynamic route reading `:id` param with dish image, tags, and Add-to-Cart. |
| `/login` | `Login` | Public | Eager | Authentication gateway allowing quick sign-in with TeleBirr phone number. |
| `/checkout` | `CheckoutPage` | **Guarded** (`RequireAuth`) | **Lazy Loaded** (`Suspense`) | TeleBirr order submission form with pure validation and touched tracking. |
| `/receipt` | `ReceiptPage` | Public | **Lazy Loaded** (`Suspense`) | Confirmed TeleBirr payment receipt with print and re-order controls. |
| `*` | `NotFound` | Public | Eager | Accessible 404 catch-all view with direct navigation back to home. |

---

## Architectural Highlights

### 1. Catalog Fetching & States
- **Asynchronous Fetching**: Dispatches `fetch('/dishes.json')` with handled loading spinner, network error banner, and empty result view.
- **URL Query Synchronization**: Category selector updates `useSearchParams` (`/menu?category=Main+Course`), making filtered views shareable and reloadable.
- **Dynamic Param Routing**: Dish detail route reads `useParams()` (`/menu/2`) to render specific culinary profiles with fallback for non-existent IDs.

### 2. Multi-Screen Cart Synchronization
- **Zustand + React Context Hybrid**: Cart state is readable and mutable simultaneously from:
  1. The persistent header badge displaying live item counts.
  2. The slide-over `CartPanel` drawer with item removal, quantity controls, and live ETB calculations.
  3. The `/checkout` view displaying order summary lines before payment.
  4. The confirmed `/receipt` view rendering itemized summaries.
- **Persistence**: Zustand `persist` middleware caches cart items in browser `localStorage`.

### 3. Guarded Checkout & Form Validation
- **Route Guard**: Direct access to `/checkout` redirects unauthenticated users to `/login`. Upon successful sign-in, the user is redirected back to `/checkout`.
- **Pure Validation**: Pure `validate(form)` function runs on render; errors are displayed only after field `onBlur` touch.
- **Accessibility**: Includes `aria-invalid`, `aria-describedby`, and `role="alert"` for real-time assistive technology announcements.
- **Auto-Focus on Failure**: Submitting an invalid form programmatically shifts focus to the first invalid input.
- **TeleBirr Network Failure Simulation**: Interactive checkbox allows testing payment gateway timeouts while keeping customer inputs intact.

### 4. Error Boundaries & Performance
- **Subtree Isolation**: Independent `ErrorBoundary` class components wrap the `MenuPage` catalog and `CartPanel` slide-over drawer. A failure inside one dish card renders an isolated fallback without unmounting the header or navigation.
- **Code Splitting**: Heavy transactional pages (`CheckoutPage` and `ReceiptPage`) are split into independent chunks via `React.lazy()` and rendered under `<Suspense fallback={<Skeleton />}>`.
- **Render Stabilization**: `DishCard` is wrapped in `React.memo`, with click handlers stabilized through `useCallback` to prevent cascading re-renders across the grid during cart additions.

---

## Verification & Audits Conducted

- **Cold Address Bar Refresh**: Verified cold loads on `/`, `/menu`, `/menu/1`, `/login`, `/checkout`, `/receipt`, and `/invalid-route`.
- **TeleBirr Phone Validation**: Enforces Ethiopian mobile format rules (`09xxxxxxxx` or `07xxxxxxxx`).
- **Keyboard Trapping**: Modals trap Tab focus, permit Escape key dismissals, and return focus to the opening trigger button.
- **Greyscale Accessibility**: Color contrast ratios exceed WCAG AA standards across light and dark themes.
