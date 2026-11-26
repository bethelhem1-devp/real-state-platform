const reasons = [
  {
    icon: "✔️",
    title: "Verified Listings",
    text: "Every property is checked by our team, so what you see is what you get.",
  },
  {
    icon: "🤝",
    title: "Trusted Agents",
    text: "Experienced local agents guide you from the first viewing to the final signature.",
  },
  {
    icon: "🔒",
    title: "Secure Deals",
    text: "Clear paperwork and transparent pricing protect you at every step.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">
          Why Dream Builder
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          A Better Way to Find Your Home
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {reasons.map((r) => (
          <div
            key={r.title}
            className="rounded-2xl border border-gold/30 bg-white p-8 text-center transition hover:shadow-lg"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-2xl">
              {r.icon}
            </div>
            <h3 className="mt-5 font-display text-xl">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}