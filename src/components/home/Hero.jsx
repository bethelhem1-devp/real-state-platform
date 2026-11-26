import { useState } from "react";
import { useNavigate } from "react-router-dom";

const locations = ["Bole", "CMC", "Summit", "Kazanchis", "Sarbet", "Old Airport"];
const types = ["Villa", "Apartment", "Penthouse", "Condominium", "Commercial"];

const selectClass =
  "w-full rounded-lg border border-ink/10 bg-white px-3 py-3 text-sm text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

export default function Hero() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    status: "sale",
    location: "",
    type: "",
    beds: "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative bg-ink">
      {/* Background photo + dark overlay */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/90" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-24 text-center sm:pt-32">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold-light">
          Luxury Real Estate · Addis Ababa
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
          Find the Home Where Dreams Take Shape
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-white/80">
          Villas, apartments, and penthouses in Bole, CMC, Summit, and the best
          neighbourhoods in the capital.
        </p>

        {/* Search box */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white/95 p-4 text-left shadow-2xl backdrop-blur"
        >
          {/* Buy / Rent tabs */}
          <div className="mb-4 inline-flex rounded-full bg-ivory p-1">
            {["sale", "rent"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm({ ...form, status: s })}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${
                  form.status === s
                    ? "bg-ink text-white"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                {s === "sale" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="sr-only">Location</span>
              <select name="location" value={form.location} onChange={update} className={selectClass}>
                <option value="">All locations</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="sr-only">Property type</span>
              <select name="type" value={form.type} onChange={update} className={selectClass}>
                <option value="">All types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="sr-only">Bedrooms</span>
              <select name="beds" value={form.beds} onChange={update} className={selectClass}>
                <option value="">Any bedrooms</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}+ bedrooms</option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}