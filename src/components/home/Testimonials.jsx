const testimonials = [
  {
    name: "Mulugeta Haile",
    role: "Bought a villa in Bole",
    photo: "https://i.pravatar.cc/150?img=15",
    quote:
      "Dream Builder made buying our first home simple. Dawit was patient and honest from the first viewing to the final contract.",
  },
  {
    name: "Rahel Abebe",
    role: "Rented an apartment in CMC",
    photo: "https://i.pravatar.cc/150?img=45",
    quote:
      "I found a furnished apartment within a week. The listing was accurate and the agent answered every question.",
  },
  {
    name: "Yonas Girma",
    role: "Sold a house in Summit",
    photo: "https://i.pravatar.cc/150?img=33",
    quote:
      "Professional photos, serious buyers, and a fair price. I would recommend them to anyone selling in Addis.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">
            Testimonials
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-white/10 bg-ink-soft p-8"
            >
              <p className="font-display text-5xl leading-none text-gold">“</p>
              <blockquote className="mt-2 text-sm leading-relaxed text-white/80">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.photo}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-white/60">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}