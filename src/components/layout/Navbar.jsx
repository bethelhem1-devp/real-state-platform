import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Properties" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
      isActive ? "text-gold" : "text-white/80 hover:text-gold-light"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-semibold text-white">
          Dream <span className="text-gold">Builder</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === "/"} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="ml-2 rounded-full border border-gold px-5 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              List Your Property
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="p-2 text-2xl text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul
          id="mobile-menu"
          className="border-t border-gold/20 bg-ink px-4 pb-4 md:hidden"
        >
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}