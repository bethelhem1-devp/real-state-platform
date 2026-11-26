const stats = [
  { value: "500+", label: "Properties Listed" },
  { value: "320+", label: "Happy Clients" },
  { value: "10+", label: "Years of Experience" },
  { value: "6", label: "Prime Areas" },
];

export default function Stats() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 text-center lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-4xl font-semibold text-gold">{s.value}</p>
            <p className="mt-1 text-sm text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}