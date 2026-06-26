export type FolderPath = string
export type FolderTemplateCategory =
  | "music"
  | "photo"
  | "video"
  | "design"
  | "general"
export type SuggestionType = "merge" | "rename" | "move" | "delete-empty"

/**
 * Recursive folder tree structure.
 */
export type FolderNode = {
  name: string
  path: string
  children: FolderNode[]
  fileCount?: number
}

/**
 * Saved template definition used by the template browser.
 */
export type FolderTemplate = {
  id: string
  name: string
  category: FolderTemplateCategory
  description: string
  folders: string[]
  isPro?: boolean
}

/**
 * Recommendation produced by the analysis engine.
 */
export type FolderSuggestion = {
  id: string
  type: SuggestionType
  from: string[]
  to: string
  confidence: number
  reason: string
}

/**
 * High-level analysis results displayed in the dashboard.
 */
export type FolderAnalysisResult = {
  rootName: string
  totalFolders: number
  totalFiles: number
  duplicateFolderNames: string[]
  suggestions: FolderSuggestion[]
}
