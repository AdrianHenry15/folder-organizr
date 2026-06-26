import { Container } from "@/components/layout/container"

export const metadata = {
  title: "Pricing | FolderOrganizr",
  description: "Simple one-time pricing for FolderOrganizr Pro.",
}

export default function PricingPage() {
  return (
    <main className="py-12">
      <Container>
        <h1 className="text-3xl font-bold">Pricing</h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Start free. Upgrade when you want exports, premium templates, and
          unlimited analysis.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-card border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Free</h2>
            <p className="mt-2 text-4xl font-bold">$0</p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>Basic folder analysis</li>
              <li>Limited folder count</li>
              <li>Basic recommendations</li>
              <li>Free templates</li>
            </ul>
          </article>

          <article className="rounded-card border border-primary bg-card p-6">
            <h2 className="text-xl font-semibold">Pro</h2>
            <p className="mt-2 text-4xl font-bold">$9</p>
            <p className="mt-1 text-sm text-muted-foreground">one-time</p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>Unlimited analysis</li>
              <li>PDF export</li>
              <li>JSON export</li>
              <li>Premium templates</li>
              <li>Future V1 updates</li>
            </ul>
          </article>
        </div>
      </Container>
    </main>
  )
}
