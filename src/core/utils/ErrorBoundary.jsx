import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] p-6 text-center text-white">
          <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-red-400">Something went wrong</h2>
            <p className="mb-6 text-sm text-muted">
              The 3D context failed to load or encountered a rendering exception. Please try refreshing or switching off hardware acceleration toggles.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 font-medium text-white transition-transform hover:scale-105"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
