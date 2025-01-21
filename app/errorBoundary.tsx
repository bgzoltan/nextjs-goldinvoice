"use client";

import React, { ReactNode } from "react";
import CustomButton from "./ui/custom-button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(
    error: Error & { digest?: string }
  ): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    return (
      <>
        {this.state.hasError && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-center bg-red-500 p-6 rounded-lg shadow-lg">
              <h1 className="text-xl font-bold text-white">
                Something went wrong
              </h1>
              <p className="text-white">
                {this.state.error?.message || "Unknown error"}
              </p>
              <CustomButton
                onClick={() => this.setState({ hasError: false, error: null })}
                buttonType=""
              >
                Try again
              </CustomButton>
            </div>
          </div>
        )}
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
