import Link from "next/link"
import { ThemeToggle } from "../theme/theme-toggle"

// Centralized navigation configuration.
const navLinks = [
  { href: "/analyze", label: "Analyze" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
]

export function Navbar() {
  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          FolderOrganizr
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              {link.label}
            </Link>
          ))}

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
