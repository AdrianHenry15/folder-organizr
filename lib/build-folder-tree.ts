import type { FolderNode } from "@/types/folder"

/**
 * Converts flat browser paths into a recursive folder tree.
 */
export function buildFolderTree(paths: string[]): FolderNode | null {
  if (paths.length === 0) return null

  const rootName = paths[0]?.split("/")[0] ?? "Selected Folder"

  const root: FolderNode = {
    name: rootName,
    path: rootName,
    children: [],
    fileCount: 0,
  }

  for (const path of paths) {
    const segments = path.split("/").filter(Boolean)

    if (segments.length === 0) continue

    let currentNode = root

    for (let index = 1; index < segments.length; index++) {
      const segment = segments[index]
      const isFile = index === segments.length - 1

      if (isFile) {
        currentNode.fileCount = (currentNode.fileCount ?? 0) + 1
        continue
      }

      const childPath = segments.slice(0, index + 1).join("/")

      let childNode = currentNode.children.find(
        (child) => child.path === childPath,
      )

      if (!childNode) {
        childNode = {
          name: segment,
          path: childPath,
          children: [],
          fileCount: 0,
        }

        currentNode.children.push(childNode)
      }

      currentNode = childNode
    }
  }

  return sortFolderTree(root)
}

function sortFolderTree(node: FolderNode): FolderNode {
  return {
    ...node,
    children: node.children
      .map(sortFolderTree)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }
}
