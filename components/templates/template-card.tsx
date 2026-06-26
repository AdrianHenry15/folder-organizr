import type { FolderTemplate } from "@/types/folder"

/**
 * Preview card for a folder structure template.
 */

type TemplateCardProps = {
  template: FolderTemplate
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="rounded-card border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {template.category}
          </p>

          <h2 className="mt-2 text-xl font-semibold">{template.name}</h2>
        </div>

        {template.isPro && (
          <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
            Pro
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {template.description}
      </p>

      <div className="mt-5 rounded-lg bg-muted p-4">
        <p className="text-sm font-medium">{template.folders.length} folders</p>

        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {template.folders.slice(0, 5).map((folder) => (
            <li key={folder}>{folder}</li>
          ))}
        </ul>

        {template.folders.length > 5 && (
          <p className="mt-3 text-sm text-muted-foreground">
            +{template.folders.length - 5} more
          </p>
        )}
      </div>
    </article>
  )
}
