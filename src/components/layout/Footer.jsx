import { Link } from "react-router-dom";

const areas = ["Bole", "CMC", "Summit", "Kazanchis", "Sarbet", "Old Airport"];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            Dream <span className="text-gold">Builder</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Luxury homes, apartments, and villas across Addis Ababa. Find the
            place where your dreams take shape.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/listings" className="hover:text-gold-light">Properties</Link></li>
          
            <li><Link to="/contact" className="hover:text-gold-light">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gold">Popular Areas</h3>
          <ul className="space-y-2 text-sm">
            {areas.map((a) => (
              <li key={a}>
                <Link to={`/listings?location=${a}`} className="hover:text-gold-light">
                  {a}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gold">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Bole Road, Addis Ababa, Ethiopia</li>
            <li>+251 911 000 000</li>
            <li>info@dreambuilder.et</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} Dream Builder. All rights reserved.
      </div>
    </footer>
  );
}