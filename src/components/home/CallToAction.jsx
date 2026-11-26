import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="rounded-3xl bg-gradient-to-br from-ink to-ink-soft px-6 py-14 text-center text-white sm:px-12">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          Ready to List Your <span className="text-gold">Property</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Reach serious buyers and tenants across Addis Ababa. Talk to our team
          today for a free valuation.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}