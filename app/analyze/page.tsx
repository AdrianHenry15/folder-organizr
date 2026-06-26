import { ClientErrorBoundary } from "@/components/error-boundary/client-error-boundary"
import { Container } from "@/components/layout/container"
import { AnalyzeFolderClient } from "@/components/upload/analyze-folder-client"

export const metadata = {
  title: "Analyze | FolderOrganizr",
  description: "Analyze a folder structure and get organization suggestions.",
}

export default function AnalyzePage() {
  return (
    <main className="py-12">
      <Container>
        <h1 className="text-3xl font-bold">Analyze Folder</h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Choose a folder from your computer and FolderOrganizr will inspect the
          structure locally in your browser.
        </p>

        <div className="mt-8">
          <ClientErrorBoundary>
            <AnalyzeFolderClient />
          </ClientErrorBoundary>
        </div>
      </Container>
    </main>
  )
}
