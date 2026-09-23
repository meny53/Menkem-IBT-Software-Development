import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (typeof fallback === "function") {
        return fallback({
          error,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      }

      if (fallback && React.isValidElement(fallback)) {
        return React.cloneElement(fallback, {
          error,
          onReset: this.resetErrorBoundary,
        });
      }

      if (fallback) {
        return fallback;
      }

      return (
        <div role="alert" className="error-boundary-card">
          <div className="error-boundary-header">
            <h3>⚠️ Something went wrong in this section</h3>
          </div>
          <p className="error-boundary-message">
            {error?.message || "An unexpected rendering error occurred."}
          </p>
          <div className="error-boundary-actions">
            <button
              type="button"
              className="btn-retry"
              onClick={this.resetErrorBoundary}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
