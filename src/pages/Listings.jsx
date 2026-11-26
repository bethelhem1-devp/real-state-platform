import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/listings/FilterBar";
import Pagination from "../components/listings/Pagination";
import { properties } from "../data/properties";
import { filterProperties } from "../utils/filterProperties";

const PAGE_SIZE = 6;

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read everything from the URL
  const filters = {
    status: searchParams.get("status") || "",
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    beds: searchParams.get("beds") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    q: searchParams.get("q") || "",
  };
  const sort = searchParams.get("sort") || "featured";
  const requestedPage = Math.max(1, Number(searchParams.get("page")) || 1);

  // 2. Filter, sort, and paginate
  const results = filterProperties(properties, filters, sort);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 3. Write changes back to the URL
  const handleChange = (name, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    next.delete("page"); // any filter change goes back to page 1
    setSearchParams(next, { replace: true });
  };

  const handlePage = (n) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", n);
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAll = () => setSearchParams({});

  return (
    <>
      {/* Page header */}
      <section className="bg-ink py-14 text-center text-white">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold-light">
          Dream Builder
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          Properties in Addis Ababa
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <FilterBar
          filters={filters}
          sort={sort}
          onChange={handleChange}
          onClear={clearAll}
        />

        <p className="mb-6 mt-8 text-sm text-ink/60" aria-live="polite">
          {results.length} {results.length === 1 ? "property" : "properties"} found
        </p>

        {results.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={handlePage} />
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-gold/50 bg-white py-16 text-center">
            <p className="font-display text-2xl">No properties match your search</p>
            <p className="mt-2 text-sm text-ink/60">
              Try removing a filter or widening your price range.
            </p>
            <button
              onClick={clearAll}
              className="mt-6 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}