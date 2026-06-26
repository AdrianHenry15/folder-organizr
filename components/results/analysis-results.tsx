import type { FolderAnalysisResult } from "@/types/folder"
import { OverviewCards } from "./overview-cards"
import { SuggestionsList } from "./suggestions-list"

type AnalysisResultsProps = {
  result: FolderAnalysisResult
}

/**
 * Main results panel displayed after a folder is analyzed.
 */
export function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <section className="rounded-card border border-border bg-card p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Analysis Summary</h2>
        <p className="text-sm text-muted-foreground">{result.rootName}</p>
      </div>

      <div className="mt-6">
        <OverviewCards result={result} />
      </div>

      <div className="mt-8">
        <h3 className="mb-3 font-semibold">Suggestions</h3>
        <SuggestionsList suggestions={result.suggestions} />
      </div>
    </section>
  )
}
