import { Button, Heading, Card, Text } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

export class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Logowanie błędu — w produkcji możesz wysłać do Sentry / LogRocket
    if (import.meta.env.DEV) {
      console.error("Global error boundary caught an error:", error, info);
    }
  }

  handleReset = () => {
    // Resetuje stan ErrorBoundary
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card>
          <Heading size="4">Coś poszło nie tak</Heading>
          <Text>
            Wystąpił nieoczekiwany błąd. Możesz wrócić do strony głównej lub
            spróbować ponownie.
          </Text>

          {/* <div style={{ marginTop: "2rem" }}> */}
            {/* <button
              onClick={this.handleReset}
              style={{
                padding: "0.6rem 1.2rem",
                marginRight: "1rem",
                cursor: "pointer"
              }}
            >
              Spróbuj ponownie
            </button> */}

            <Link to="/" onClick={this.handleReset}>
              <Button>
                Wróć do strony głównej
              </Button>
            </Link>
          {/* </div> */}
        </Card>
      );
    }

    return this.props.children;
  }
}
