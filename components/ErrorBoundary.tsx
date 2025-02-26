import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
          <div className="text-center p-8 bg-slate-800 rounded-lg shadow-lg max-w-md">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="mb-4">We're sorry for the inconvenience. An unexpected error has occurred.</p>
            <p className="text-sm text-slate-400 mb-4">Error: {this.state.error && this.state.error.toString()}</p>
            <Button onClick={this.handleReload} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Reload Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

