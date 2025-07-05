import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error?.toString() };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to a service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
          Something went wrong.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
