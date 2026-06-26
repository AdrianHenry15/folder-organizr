import type { FolderAnalysisResult, FolderSuggestion } from "@/types/folder"

/**
 * Converts raw browser file paths into analysis data
 * used throughout the application.
 */

export function analyzeFolderPaths(paths: string[]): FolderAnalysisResult {
  const folderPaths = getUniqueFolderPaths(paths)
  const folderNames = folderPaths.map(getLastPathSegment)
  const duplicateFolderNames = getDuplicateFolderNames(folderNames)
  const suggestions = buildBasicSuggestions(duplicateFolderNames)

  return {
    rootName: getRootFolderName(paths),
    totalFolders: folderPaths.length,
    totalFiles: paths.length,
    duplicateFolderNames,
    suggestions,
  }
}

function getRootFolderName(paths: string[]) {
  return paths[0]?.split("/")[0] ?? "Selected Folder"
}

/**
 * Builds a unique folder list from all uploaded file paths.
 */
function getUniqueFolderPaths(paths: string[]) {
  const folders = new Set<string>()

  for (const path of paths) {
    const segments = path.split("/")

    // Remove file name
    segments.pop()

    for (let index = 1; index <= segments.length; index++) {
      folders.add(segments.slice(0, index).join("/"))
    }
  }

  return Array.from(folders)
}

function getLastPathSegment(path: string) {
  return path.split("/").at(-1) ?? path
}

/**
 * Finds folder names that appear multiple times
 * regardless of location in the directory tree.
 */
function getDuplicateFolderNames(folderNames: string[]) {
  const counts = new Map<string, number>()

  for (const name of folderNames) {
    const normalizedName = name.trim().toLowerCase()

    counts.set(normalizedName, (counts.get(normalizedName) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([name]) => name)
}

/**
 * Generates initial merge recommendations.
 * V1 focuses on duplicate folder detection.
 */
function buildBasicSuggestions(
  duplicateFolderNames: string[],
): FolderSuggestion[] {
  return duplicateFolderNames.map((folderName, index) => ({
    id: `duplicate-${folderName}-${index}`,
    type: "merge",
    from: [folderName],
    to: titleCase(folderName),
    confidence: 80,
    reason: "Multiple folders use the same name in different locations.",
  }))
}

function titleCase(value: string) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
