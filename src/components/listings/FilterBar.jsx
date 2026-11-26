const locations = ["Bole", "CMC", "Summit", "Kazanchis", "Sarbet", "Old Airport"];
const types = ["Villa", "Apartment", "Penthouse", "Condominium", "Commercial"];

const fieldClass =
  "w-full rounded-lg border border-ink/10 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

export default function FilterBar({ filters, sort, onChange, onClear }) {
  const handle = (e) => onChange(e.target.name, e.target.value);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      {/* Keyword search */}
      <label className="block">
        <span className="sr-only">Search properties</span>
        <input
          type="search"
          name="q"
          value={filters.q}
          onChange={handle}
          placeholder="Search by title, area or type..."
          className={fieldClass}
        />
      </label>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="sr-only">Status</span>
          <select name="status" value={filters.status} onChange={handle} className={fieldClass}>
            <option value="">Buy or Rent</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Location</span>
          <select name="location" value={filters.location} onChange={handle} className={fieldClass}>
            <option value="">All locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Property type</span>
          <select name="type" value={filters.type} onChange={handle} className={fieldClass}>
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Bedrooms</span>
          <select name="beds" value={filters.beds} onChange={handle} className={fieldClass}>
            <option value="">Any bedrooms</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}+ bedrooms</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Minimum price</span>
          <input
            type="number"
            min="0"
            name="minPrice"
            value={filters.minPrice}
            onChange={handle}
            placeholder="Min price (ETB)"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="sr-only">Maximum price</span>
          <input
            type="number"
            min="0"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handle}
            placeholder="Max price (ETB)"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="sr-only">Sort by</span>
          <select name="sort" value={sort} onChange={handle} className={fieldClass}>
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="area-desc">Largest area</option>
          </select>
        </label>

        <button
          type="button"
          onClick={onClear}
          className="rounded-lg border border-ink/20 px-4 py-2.5 text-sm font-medium text-ink transition hover:border-gold hover:text-gold"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}