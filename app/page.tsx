import { Container } from "@/components/layout/container"
import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      <section className="py-24 text-center">
        <Container className="flex flex-col items-center">
          <p className="mb-4 rounded-full border border-border px-4 py-1 text-sm text-muted-foreground">
            FolderOrganizr v1
          </p>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight">
            Organize the folders on your computer and everything inside them.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Upload a folder, analyze its structure, and get a cleaner
            organization plan. Nothing moves unless you decide.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/analyze"
              className="rounded-button bg-primary px-5 py-3 text-primary-foreground">
              Analyze Folder
            </Link>

            <Link
              href="/templates"
              className="rounded-button border border-border px-5 py-3">
              Browse Templates
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}
