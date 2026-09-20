import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

import logoImg from './assets/logo.svg';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("InnoBridge ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B1120] text-white flex flex-col items-center justify-center p-6 text-center">
          <img src={logoImg} alt="InnoBridge Logo" className="w-12 h-12 object-contain rounded-md mb-4" />
          <h1 className="text-2xl font-bold mb-2">InnoBridge Workspace</h1>
          <p className="text-xs text-slate-400 max-w-md mb-6">
            An update was applied to your workspace session. Click below to reload and restore active state.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('innobridge_demo_user');
              window.location.href = '/';
            }}
            className="px-6 py-2.5 rounded-md bg-brandBlue hover:bg-brandBlueBright text-white font-bold text-xs shadow-sm transition-all"
          >
            Reload InnoBridge Workspace
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
