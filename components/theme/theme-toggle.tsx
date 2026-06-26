"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="cursor-pointer inline-flex size-9 items-center justify-center rounded-button border border-border bg-background transition hover:bg-muted">
      <Sun className="absolute size-4 scale-0 opacity-0 transition dark:scale-100 dark:opacity-100" />
      <Moon className="absolute size-4 scale-100 opacity-100 transition dark:scale-0 dark:opacity-0" />
    </button>
  )
}
