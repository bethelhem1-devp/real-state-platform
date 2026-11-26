import { Link } from "react-router-dom";
import { properties } from "../../data/properties";

const areas = [
  { name: "Bole", img: "photo-1512917774080-9991f1c4c750" },
  { name: "CMC", img: "photo-1545324418-cc1a3fa10c00" },
  { name: "Summit", img: "photo-1613490493576-7fde63acd811" },
  { name: "Kazanchis", img: "photo-1502672260266-1c1ef2d93688" },
  { name: "Sarbet", img: "photo-1564013799919-ab600027ffc6" },
  { name: "Old Airport", img: "photo-1600607687939-ce8a6c25118c" },
];

export default function BrowseByArea() {
  const countFor = (name) =>
    properties.filter((p) => p.location === name).length;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">
            Explore the city
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Browse by Area
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {areas.map((a) => (
            <Link
              key={a.name}
              to={`/listings?location=${encodeURIComponent(a.name)}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink"
            >
              <img
                src={`https://images.unsplash.com/${a.img}?auto=format&fit=crop&w=800&q=80`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-display text-2xl">{a.name}</h3>
                <p className="text-sm text-white/80">
                  {countFor(a.name)} {countFor(a.name) === 1 ? "property" : "properties"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}