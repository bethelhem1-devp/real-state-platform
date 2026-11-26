import { Link } from "react-router-dom";
import PropertyCard from "../PropertyCard";
import { properties } from "../../data/properties";

export default function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">
            Hand-picked for you
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Featured Properties
          </h2>
        </div>
        <Link
          to="/listings"
          className="text-sm font-medium text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-gold"
        >
          View all properties →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}