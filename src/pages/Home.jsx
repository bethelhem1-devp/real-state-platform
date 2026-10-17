import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

export default function Home() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 font-display text-4xl">Featured Properties</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 6).map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}