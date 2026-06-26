import type { FolderAnalysisResult } from "@/types/folder"

type OverviewCardsProps = {
  result: FolderAnalysisResult
}

/**
 * Displays high-level analysis metrics.
 */
export function OverviewCards({ result }: OverviewCardsProps) {
  const cards = [
    {
      label: "Folders",
      value: result.totalFolders,
    },
    {
      label: "Files",
      value: result.totalFiles,
    },
    {
      label: "Duplicates",
      value: result.duplicateFolderNames.length,
    },
    {
      label: "Suggestions",
      value: result.suggestions.length,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="mt-1 text-2xl font-bold">{card.value}</p>
        </article>
      ))}
    </div>
  )
}
