import { cn } from "@/lib/utils"

/**
 * Shared content width wrapper used across pages.
 */

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      {children}
    </div>
  )
}
