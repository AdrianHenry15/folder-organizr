"use client"

import { AlertCircle } from "lucide-react"
import React from "react"

type ClientErrorBoundaryProps = {
  children: React.ReactNode
}

type ClientErrorBoundaryState = {
  hasError: boolean
}

/**
 * Catches client-rendering errors so one broken component
 * does not take down the whole page.
 */
export class ClientErrorBoundary extends React.Component<
  ClientErrorBoundaryProps,
  ClientErrorBoundaryState
> {
  state: ClientErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-card border border-destructive bg-card p-6">
          <div className="flex gap-3">
            <AlertCircle className="mt-0.5 size-5 text-destructive" />

            <div>
              <h2 className="font-semibold">Something went wrong</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Refresh the page and try analyzing the folder again.
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
