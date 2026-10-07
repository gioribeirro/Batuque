import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getSongs, type Song } from "@/lib/songs.functions";

const songsQuery = queryOptions({ queryKey: ["songs"], queryFn: () => getSongs() });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Batuque — Músicas do YouTube" },
      { name: "description", content: "Ouça os maiores hits do YouTube num player colorido." },
      { property: "og:title", content: "Batuque — Músicas do YouTube" },
      { property: "og:description", content: "Ouça os maiores hits do YouTube num player colorido." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(songsQuery),
  component: Index,
});

const CARD_TONES = ["tone-1", "tone-2", "tone-3", "tone-4", "tone-5"];

function Index() {
  const { data: songs } = useSuspenseQuery(songsQuery);
  const [current, setCurrent] = useState<Song>(songs[0]!);
  const [filter, setFilter] = useState("Todos");
  const genres = ["Todos", ...Array.from(new Set(songs.map((s) => s.genre)))];
  const list = filter === "Todos" ? songs : songs.filter((s) => s.genre === filter);

  return (
    <main className="min-h-screen bg-hero px-4 py-10 md:px-10">
      <header className="mx-auto max-w-6xl text-center">
        <h1 className="font-display text-6xl md:text-8xl text-foreground drop-shadow-pop">BATUQUE</h1>
        <p className="mt-2 text-lg text-foreground/80">Os hits do YouTube, num só lugar 🎶</p>
      </header>

      <section className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-card p-4 shadow-pop">
          <div className="aspect-video overflow-hidden rounded-2xl">
            <iframe
              key={current.id}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${current.id}?autoplay=1`}
              title={current.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4 px-2">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{current.genre}</span>
            <h2 className="mt-2 font-display text-3xl">{current.title}</h2>
            <p className="text-muted-foreground">{current.artist}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-card p-4 shadow-pop">
          <div className="mb-4 flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={`rounded-full px-3 py-1 text-sm font-bold transition ${filter === g ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
              >
                {g}
              </button>
            ))}
          </div>
          <ul className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
            {list.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => setCurrent(s)}
                  className={`flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:scale-[1.02] ${CARD_TONES[i % 5]} ${current.id === s.id ? "ring-4 ring-ring" : ""}`}
                >
                  <img src={`https://i.ytimg.com/vi/${s.id}/mqdefault.jpg`} alt={s.title} className="h-14 w-24 rounded-xl object-cover" loading="lazy" />
                  <div className="min-w-0">
                    <p className="truncate font-bold">{s.title}</p>
                    <p className="truncate text-sm opacity-80">{s.artist}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
