"use client"

import type { FolderAnalysisResult, FolderNode } from "@/types/folder"
import { useState } from "react"
import { FolderUpload } from "./folder-upload"
import { buildFolderTree } from "@/lib/build-folder-tree"
import { FolderTreePreview } from "./folder-tree-preview"
import { AnalysisResults } from "../results/analysis-results"

/**
 * Client-side analysis state wrapper.
 * Receives upload results and displays analysis summaries.
 */

export function AnalyzeFolderClient() {
  // Current analysis generated from the selected folder.
  const [analysisResult, setAnalysisResult] =
    useState<FolderAnalysisResult | null>(null)
  const [folderTree, setFolderTree] = useState<FolderNode | null>(null)

  function handleAnalyzed(result: FolderAnalysisResult, paths: string[]) {
    setAnalysisResult(result)
    setFolderTree(buildFolderTree(paths))
  }

  return (
    <div>
      {/* Upload component that handles folder selection and analysis */}
      <FolderUpload onAnalyzed={handleAnalyzed} />

      {/* Preview of the selected folder structure */}
      {folderTree && (
        <div className="mt-8">
          <FolderTreePreview tree={folderTree} />
        </div>
      )}

      {/* Summary of the selected folder will appear here after analysis */}
      {analysisResult && <AnalysisResults result={analysisResult} />}
    </div>
  )
}
