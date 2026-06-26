"use client"

import { analyzeFolderPaths } from "@/lib/analyze-folder"
import { ignoredFolderNames } from "@/lib/ignored-folders"
import type { FolderAnalysisResult } from "@/types/folder"
import { AlertCircle, Loader2, RotateCcw, Upload } from "lucide-react"
import { useRef, useState } from "react"

const MAX_ITEMS = 25_000

type FolderUploadProps = {
  onAnalyzed?: (result: FolderAnalysisResult, paths: string[]) => void
}

/**
 * Browser-only folder picker.
 * Reads folder/file paths locally and never uploads file contents.
 */
export function FolderUpload({ onAnalyzed }: FolderUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [folderName, setFolderName] = useState("")
  const [paths, setPaths] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")

  function resetUpload() {
    setFolderName("")
    setPaths([])
    setError("")
    setIsAnalyzing(false)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  function handleSelectFolder() {
    if (isAnalyzing) return

    setError("")

    if (inputRef.current) {
      inputRef.current.value = ""
    }

    inputRef.current?.click()
  }

  /**
   * Extracts relative paths from the selected directory
   * and triggers analysis.
   */
  function handleFolderChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget

    setIsAnalyzing(true)
    setError("")
    setPaths([])
    setFolderName("")

    try {
      const files = Array.from(input.files ?? [])

      if (files.length === 0) {
        return
      }

      if (files.length > MAX_ITEMS) {
        setError(
          `The selected folder contains too many items (${files.length.toLocaleString()}). Try a smaller folder or avoid large development folders like node_modules, .next, .git, dist, and build.`,
        )
        return
      }

      const relativePaths = files
        .map((file) => file.webkitRelativePath)
        .filter(Boolean)
        .filter((path) => !shouldIgnorePath(path))

      if (relativePaths.length === 0) {
        setError(
          "No usable folder paths were detected. Try selecting another folder.",
        )
        return
      }

      const rootFolderName =
        relativePaths[0]?.split("/")[0] ?? "Selected Folder"

      const analysisResult = analyzeFolderPaths(relativePaths)

      setFolderName(rootFolderName)
      setPaths(relativePaths)

      onAnalyzed?.(analysisResult, relativePaths)
    } catch (error) {
      console.error(error)

      setError("Something went wrong while analyzing this folder.")
    } finally {
      setIsAnalyzing(false)

      // Allows selecting another folder, including the same folder again.
      input.value = ""
    }
  }

  return (
    <section className="rounded-card border border-border bg-card p-6">
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
        disabled={isAnalyzing}
        className="flex w-full flex-col items-center justify-center rounded-card border border-dashed border-border bg-background px-6 py-12 text-center transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60">
        <span className="flex size-12 items-center justify-center rounded-full bg-muted">
          {isAnalyzing ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Upload className="size-5" />
          )}
        </span>

        <span className="mt-4 text-lg font-semibold">
          {isAnalyzing ? "Analyzing folder..." : "Choose a folder"}
        </span>

        <span className="mt-2 max-w-md text-sm text-muted-foreground">
          FolderOrganizr reads folder and file paths from your browser. It does
          not move, rename, or upload your files.
        </span>

        <span className="mt-3 max-w-md text-xs text-muted-foreground">
          Large development folders may be slow. Avoid folders containing
          node_modules, .git, .next, dist, build, or coverage.
        </span>
      </button>

      {(error || paths.length > 0) && (
        <button
          type="button"
          onClick={resetUpload}
          className="mt-4 inline-flex items-center gap-2 rounded-button border border-border px-4 py-2 text-sm transition hover:bg-muted">
          <RotateCcw className="size-4" />
          Reset upload
        </button>
      )}

      {error && (
        <div className="mt-4 flex gap-2 rounded-lg border border-destructive bg-background p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {paths.length > 0 && (
        <div className="mt-6 rounded-lg border border-border bg-background p-4">
          <p className="font-medium">{folderName}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            {paths.length.toLocaleString()} usable items detected
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
              +{(paths.length - 20).toLocaleString()} more items
            </p>
          )}
        </div>
      )}
    </section>
  )
}

function shouldIgnorePath(path: string) {
  const segments = path.split("/").map((segment) => segment.toLowerCase())

  return segments.some((segment) => ignoredFolderNames.has(segment))
}
