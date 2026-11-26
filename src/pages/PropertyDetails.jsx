import { Link, useParams } from "react-router-dom";
import ImageGallery from "../components/details/ImageGallery";
import AgentContactCard from "../components/details/AgentContactCard";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";
import { formatPrice } from "../utils/format";

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));

  // Wrong or unknown id -> friendly message instead of a crash
  if (!property) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Property not found</h1>
        <p className="mt-3 text-ink/60">
          This listing may have been sold or the link is wrong.
        </p>
        <Link
          to="/listings"
          className="mt-6 inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light"
        >
          Browse all properties
        </Link>
      </div>
    );
  }

  const {
    title, status, type, price, location, address, bedrooms,
    bathrooms, area, images, description, amenities, agent,
  } = property;

  // Same area or same type, but not this property
  const similar = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.location === location || p.type === type) &&
        p.status === status
    )
    .slice(0, 3);

  const specs = [
    bedrooms > 0 && { icon: "🛏", label: "Bedrooms", value: bedrooms },
    { icon: "🛁", label: "Bathrooms", value: bathrooms },
    { icon: "📐", label: "Area", value: `${area} m²` },
    { icon: "🏠", label: "Type", value: type },
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink/60">
        <Link to="/" className="hover:text-gold">Home</Link> /{" "}
        <Link to="/listings" className="hover:text-gold">Properties</Link> /{" "}
        <span className="text-ink">{title}</span>
      </nav>

      {/* Title + price */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              status === "sale" ? "bg-gold text-ink" : "bg-ink text-white"
            }`}
          >
            For {status}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {title}
          </h1>
          <p className="mt-1 text-ink/60">📍 {address}</p>
        </div>
        <p className="font-display text-3xl font-semibold text-gold">
          {formatPrice(price, status)}
        </p>
      </div>

      {/* key={id} resets the gallery when you open a different property */}
      <ImageGallery key={property.id} images={images} title={title} />

      {/* Content + sidebar */}
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* Specs */}
          <section aria-label="Key facts">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-gold/30 bg-white p-4 text-center"
                >
                  <p className="text-2xl">{s.icon}</p>
                  <p className="mt-1 font-semibold">{s.value}</p>
                  <p className="text-xs text-ink/60">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="font-display text-2xl">About this property</h2>
            <p className="mt-3 leading-relaxed text-ink/80">{description}</p>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="font-display text-2xl">Amenities</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-ink/80">
                  <span className="text-gold">✔</span> {a}
                </li>
              ))}
            </ul>
          </section>

          {/* Map comes in a later stage */}
        </div>

        <AgentContactCard agent={agent} propertyTitle={title} />
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-3xl">Similar properties</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}