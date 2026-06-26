import type { FolderNode } from "@/types/folder"
import { ChevronRight, Folder } from "lucide-react"

type FolderTreePreviewProps = {
  tree: FolderNode
}

/**
 * Displays a compact recursive preview of the selected folder structure.
 */
export function FolderTreePreview({ tree }: FolderTreePreviewProps) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <h3 className="font-semibold">Folder Preview</h3>

      <div className="mt-4 max-h-80 overflow-auto text-sm">
        <FolderTreeNode node={tree} depth={0} />
      </div>
    </div>
  )
}

type FolderTreeNodeProps = {
  node: FolderNode
  depth: number
}

function FolderTreeNode({ node, depth }: FolderTreeNodeProps) {
  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-md py-1.5 pr-2 text-muted-foreground"
        style={{ paddingLeft: `${depth * 16}px` }}>
        {node.children.length > 0 ? (
          <ChevronRight className="size-3" />
        ) : (
          <span className="size-3" />
        )}

        <Folder className="size-4" />

        <span className="truncate">{node.name}</span>

        {node.fileCount ? (
          <span className="ml-auto text-xs">{node.fileCount} files</span>
        ) : null}
      </div>

      {node.children.map((child) => (
        <FolderTreeNode key={child.path} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}
