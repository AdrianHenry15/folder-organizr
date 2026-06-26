import { Container } from "@/components/layout/container"
import { TemplateCard } from "@/components/templates/template-card"
import { folderTemplates } from "@/data/templates/templates"

export const metadata = {
  title: "Templates | FolderOrganizr",
  description: "Browse premade folder structures for different workflows.",
}

export default function TemplatesPage() {
  return (
    <main className="py-12">
      <Container>
        <h1 className="text-3xl font-bold">Templates</h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Browse premade folder structures for music production, photography,
          video editing, design, and general computer organization.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {folderTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </Container>
    </main>
  )
}
