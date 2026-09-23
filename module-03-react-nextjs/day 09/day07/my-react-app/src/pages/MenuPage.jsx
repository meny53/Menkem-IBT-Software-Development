import { useState } from "react";
import Menu from "../components/Menu";
import ErrorBoundary from "../components/ErrorBoundary";
import MenuUnavailable from "../components/MenuUnavailable";

function MenuPage() {
  const [retryKey, setRetryKey] = useState(0);

  return (
    <ErrorBoundary
      key={retryKey}
      fallback={<MenuUnavailable onReset={() => setRetryKey((k) => k + 1)} />}
    >
      <Menu />
    </ErrorBoundary>
  );
}

export default MenuPage;