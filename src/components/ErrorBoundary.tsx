import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121316] text-[#F4F0E8] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md p-8 rounded-3xl bg-[#181A1F] border border-[#2A2D35] shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/30 mx-auto flex items-center justify-center text-[#C5A880]">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                Vantage Luxury Realty
              </span>
              <h2 className="font-serif text-2xl font-bold text-white">Experience Refresh Required</h2>
              <p className="text-xs text-[#A0A4B0] leading-relaxed">
                The application encountered a transient cache state while updating assets. Please reload to restore full connectivity.
              </p>
            </div>

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-[#C5A880] text-[#121316] font-semibold text-xs hover:bg-[#D4AF37] transition-all"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
