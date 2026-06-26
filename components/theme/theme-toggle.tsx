"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

/**
 * Button for switching between light and dark themes.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="cursor-pointer inline-flex size-9 items-center justify-center rounded-button border border-border bg-background transition hover:bg-muted">
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
