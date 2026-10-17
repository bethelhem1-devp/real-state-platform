import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";

const FALLBACK_IMG =
  "https://placehold.co/800x600/151e30/c9a24b?text=Dream+Builder";

export default function PropertyCard({ property }) {
  const {
    id, title, status, price, location, bedrooms,
    bathrooms, area, images, agent, type,
  } = property;

  return (
    <Link
      to={`/properties/${id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null; // avoid infinite loop
            e.currentTarget.src = FALLBACK_IMG;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            status === "sale" ? "bg-gold text-ink" : "bg-ink text-white"
          }`}
        >
          For {status}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
          {type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-lg font-bold text-gold">{formatPrice(price, status)}</p>
        <h3 className="mt-1 font-display text-xl leading-snug">{title}</h3>
        <p className="mt-1 text-sm text-ink/60">📍 {location}, Addis Ababa</p>

        {/* Specs row */}
        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4 text-sm text-ink/70">
          {bedrooms > 0 && <span>🛏 {bedrooms} Beds</span>}
          <span>🛁 {bathrooms} Baths</span>
          <span>📐 {area} m²</span>
        </div>

        {/* Agent line */}
        <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-4">
          <img
            src={agent.photo}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
          <p className="text-xs text-ink/60">
            Listed by <span className="font-medium text-ink">{agent.name}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}