export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btn =
    "min-w-10 rounded-lg border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        className={`${btn} border-ink/20 hover:border-gold`}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        ← Prev
      </button>

      {pages.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={`${btn} ${
            n === page
              ? "border-ink bg-ink text-white"
              : "border-ink/20 hover:border-gold"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        className={`${btn} border-ink/20 hover:border-gold`}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </nav>
  );
}