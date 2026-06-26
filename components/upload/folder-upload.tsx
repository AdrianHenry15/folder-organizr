"use client"

import { FolderAnalysisResult } from "@/types/folder"
import { Upload } from "lucide-react"
import { useRef, useState } from "react"
import { analyzeFolderPaths } from "@/lib/analyze-folder"

/**
 * Browser-only folder picker.
 * Reads folder/file paths locally and never uploads file contents.
 */

type FolderUploadProps = {
  onAnalyzed?: (result: FolderAnalysisResult, paths: string[]) => void
}

export function FolderUpload({ onAnalyzed }: FolderUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [folderName, setFolderName] = useState("")
  const [paths, setPaths] = useState<string[]>([])

  function handleSelectFolder() {
    inputRef.current?.click()
  }

  /**
   * Extracts relative paths from the selected directory
   * and triggers analysis.
   */
  function handleFolderChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? [])

    if (files.length === 0) return

    const relativePaths = files
      .map((file) => file.webkitRelativePath)
      .filter(Boolean)

    const rootFolderName = relativePaths[0]?.split("/")[0] ?? "Selected Folder"

    setFolderName(rootFolderName)
    setPaths(relativePaths)

    const analysisResult = analyzeFolderPaths(relativePaths)
    onAnalyzed?.(analysisResult, relativePaths)
  }

  return (
    <section className="rounded-card border border-border bg-card p-6">
      {/* Hidden native folder picker triggered by the upload button */}
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        // @ts-expect-error webkitdirectory is supported in Chromium-based browsers.
        webkitdirectory=""
        onChange={handleFolderChange}
      />

      <button
        type="button"
        onClick={handleSelectFolder}
        className="flex w-full flex-col items-center justify-center rounded-card border border-dashed border-border bg-background px-6 py-12 text-center transition hover:bg-muted">
        <span className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Upload className="size-5" />
        </span>

        <span className="mt-4 text-lg font-semibold">Choose a folder</span>

        <span className="mt-2 max-w-md text-sm text-muted-foreground">
          FolderOrganizr reads folder and file paths from your browser. It does
          not move, rename, or upload your files.
        </span>
      </button>

      {paths.length > 0 && (
        <div className="mt-6 rounded-lg border border-border bg-background p-4">
          <p className="font-medium">{folderName}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            {paths.length} items detected
          </p>

          <ul className="mt-4 max-h-48 space-y-1 overflow-auto text-sm text-muted-foreground">
            {paths.slice(0, 20).map((path) => (
              <li key={path} className="truncate">
                {path}
              </li>
            ))}
          </ul>

          {paths.length > 20 && (
            <p className="mt-3 text-sm text-muted-foreground">
              +{paths.length - 20} more items
            </p>
          )}
        </div>
      )}
    </section>
  )
}
