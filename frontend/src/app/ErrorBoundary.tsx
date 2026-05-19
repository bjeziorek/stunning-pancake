import { Button, Heading, Card, Text } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
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
      console.error("Error boundary caught an error:", error, info);
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
            Wystąpił nieoczekiwany błąd.
          </Text>
        </Card>
      );
    }

    return this.props.children;
  }
}
