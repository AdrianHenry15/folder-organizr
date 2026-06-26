import { folderRules } from "@/lib/folder-rules"
import type { FolderAnalysisResult, FolderSuggestion } from "@/types/folder"

/**
 * Converts raw browser file paths into analysis data
 * used throughout the application.
 */
export function analyzeFolderPaths(paths: string[]): FolderAnalysisResult {
  const folderPaths = getUniqueFolderPaths(paths)
  const folderNames = folderPaths.map(getLastPathSegment)

  const duplicateFolderNames = getDuplicateFolderNames(folderNames)

  const suggestions = [
    ...buildDuplicateSuggestions(folderPaths),
    ...buildRuleBasedSuggestions(folderPaths),
  ]

  return {
    rootName: getRootFolderName(paths),
    totalFolders: folderPaths.length,
    totalFiles: paths.length,
    duplicateFolderNames,
    suggestions: dedupeSuggestions(suggestions),
  }
}

function getRootFolderName(paths: string[]) {
  return paths[0]?.split("/")[0] ?? "Selected Folder"
}

function getUniqueFolderPaths(paths: string[]) {
  const folders = new Set<string>()

  for (const path of paths) {
    const segments = path.split("/")

    // Remove file name.
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
    const normalizedName = normalizeFolderName(name)

    counts.set(normalizedName, (counts.get(normalizedName) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([name]) => name)
}

/**
 * Generates merge recommendations for exact duplicate folder names.
 */
function buildDuplicateSuggestions(folderPaths: string[]): FolderSuggestion[] {
  const groups = new Map<string, string[]>()

  for (const path of folderPaths) {
    const folderName = getLastPathSegment(path)
    const normalizedName = normalizeFolderName(folderName)

    const currentGroup = groups.get(normalizedName) ?? []
    groups.set(normalizedName, [...currentGroup, path])
  }

  return Array.from(groups.entries())
    .filter(([, paths]) => paths.length > 1)
    .map(([folderName, paths], index) => ({
      id: `duplicate-${folderName}-${index}`,
      type: "merge",
      from: paths,
      to: titleCase(folderName),
      confidence: 80,
      reason: "Multiple folders use the same name in different locations.",
    }))
}

/**
 * Generates move/rename recommendations from known folder naming patterns.
 */
function buildRuleBasedSuggestions(folderPaths: string[]): FolderSuggestion[] {
  const suggestions: FolderSuggestion[] = []

  for (const path of folderPaths) {
    const folderName = getLastPathSegment(path)
    const normalizedName = normalizeFolderName(folderName)

    const matchedRule = folderRules.find((rule) =>
      rule.keywords.some((keyword) => {
        const normalizedKeyword = normalizeFolderName(keyword)

        return (
          normalizedName === normalizedKeyword ||
          normalizedName.includes(normalizedKeyword)
        )
      }),
    )

    if (!matchedRule) continue

    if (path.endsWith(matchedRule.targetPath)) continue

    suggestions.push({
      id: `rule-${path}-${matchedRule.targetPath}`,
      type: "move",
      from: [path],
      to: matchedRule.targetPath,
      confidence: 85,
      reason: `"${folderName}" looks like it belongs in ${matchedRule.targetPath}.`,
    })
  }

  return suggestions
}

function dedupeSuggestions(suggestions: FolderSuggestion[]) {
  const seen = new Set<string>()

  return suggestions.filter((suggestion) => {
    const key = `${suggestion.type}-${suggestion.from.join("|")}-${suggestion.to}`

    if (seen.has(key)) return false

    seen.add(key)
    return true
  })
}

function normalizeFolderName(value: string) {
  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replaceAll(".", " ")
    .replace(/\s+/g, " ")
    .trim()
}

function titleCase(value: string) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
