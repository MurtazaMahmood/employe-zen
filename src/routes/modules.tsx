import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { modules, type Module } from "@/lib/modules";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "All 21 Modules — ByThawkHR" },
      { name: "description", content: "Browse all 21 ByThawkHR modules across Core HR, Operations, Finance, Talent, Engagement, and Governance — delivered across 4 phases." },
      { property: "og:title", content: "All 21 Modules — ByThawkHR" },
      { property: "og:description", content: "21 focused HR modules. Activate only what you need." },
    ],
  }),
  component: ModulesPage,
});

const categories = ["All", "Core HR", "Operations", "Finance", "Talent", "Engagement", "Governance"] as const;

function ModulesPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list: Module[] = cat === "All" ? modules : modules.filter((m) => m.category === cat);
  return (
    <>
      <section className="hero-bg border-b border-border">
        <div className="container-x py-20">
          <span className="eyebrow">The full suite</span>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
            21 modules. <span className="text-gradient">One platform.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Every module is built on the same data model, the same API, and the same design language.
            Switch one on and it just works — no integrations to maintain.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                cat === c
                  ? "border-transparent bg-[image:var(--gradient-primary)] text-primary-foreground"
                  : "border-border bg-surface-elevated text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <Link
              key={m.slug}
              to="/modules/$slug"
              params={{ slug: m.slug }}
              className="card-soft group relative flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${m.accentHex}, ${m.accentHex}cc)` }}>
                  <m.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  Phase {m.phase}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{m.name}</h3>
              <p className="mt-1 text-sm font-medium" style={{ color: m.accentHex }}>{m.tagline}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{m.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.category}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="card-soft flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Not sure where to start?</h2>
            <p className="mt-1 text-muted-foreground">We'll recommend a module mix based on your team size and goals.</p>
          </div>
          <Link to="/contact" className="btn-primary">
            Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
