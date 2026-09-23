import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import MenuDetail from "./pages/MenuDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import ErrorBoundary from "./components/ErrorBoundary";
import MenuUnavailable from "./components/MenuUnavailable";
import RouteErrorFallback from "./components/RouteErrorFallback";
import Skeleton from "./components/ui/Skeleton";

const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ReceiptPage = lazy(() => import("./pages/ReceiptPage"));

function App() {
  return (
    <ErrorBoundary fallback={<RouteErrorFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="menu"
            element={
              <ErrorBoundary fallback={<MenuUnavailable />}>
                <MenuPage />
              </ErrorBoundary>
            }
          />

          <Route
            path="menu/:id"
            element={
              <ErrorBoundary fallback={<MenuUnavailable />}>
                <MenuDetail />
              </ErrorBoundary>
            }
          />

          <Route path="login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route
              path="checkout"
              element={
                <Suspense fallback={<Skeleton type="checkout" />}>
                  <CheckoutPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="receipt"
            element={
              <Suspense fallback={<Skeleton type="receipt" />}>
                <ReceiptPage />
              </Suspense>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;