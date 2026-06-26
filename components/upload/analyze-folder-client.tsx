"use client"

import type { FolderAnalysisResult } from "@/types/folder"
import { useState } from "react"
import { FolderUpload } from "./folder-upload"

/**
 * Client-side analysis state wrapper.
 * Receives upload results and displays analysis summaries.
 */

export function AnalyzeFolderClient() {
  // Current analysis generated from the selected folder.
  const [analysisResult, setAnalysisResult] =
    useState<FolderAnalysisResult | null>(null)

  return (
    <div>
      <FolderUpload onAnalyzed={setAnalysisResult} />

      {analysisResult && (
        <section className="mt-8 rounded-card border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Analysis Summary</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Folders</p>
              <p className="mt-1 text-2xl font-bold">
                {analysisResult.totalFolders}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Files</p>
              <p className="mt-1 text-2xl font-bold">
                {analysisResult.totalFiles}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Duplicates</p>
              <p className="mt-1 text-2xl font-bold">
                {analysisResult.duplicateFolderNames.length}
              </p>
            </div>
          </div>

          {analysisResult.suggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">Suggestions</h3>

              <ul className="mt-3 space-y-3">
                {analysisResult.suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="rounded-lg border border-border bg-background p-4">
                    <p className="font-medium">{suggestion.to}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {suggestion.reason}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Confidence: {suggestion.confidence}%
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
