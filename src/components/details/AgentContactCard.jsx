import { useState } from "react";

const fieldClass =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-gold/30";

export default function AgentContactCard({ agent, propertyTitle }) {
  const [values, setValues] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const update = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (values.name.trim().length < 2) e.name = "Please enter your name.";
    // Ethiopian-style numbers: 09xxxxxxxx, 07xxxxxxxx or +2519xxxxxxxx
    if (!/^(\+251|0)[79]\d{8}$/.test(values.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid phone, e.g. 0911 000 000.";
    if (values.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    // Fake network request
    setTimeout(() => {
      setStatus("sent");
      setValues({ name: "", phone: "", message: "" });
    }, 1200);
  };

  const whatsappNumber = agent.phone.replace("+", "");
  const whatsappText = encodeURIComponent(
    `Hello ${agent.name}, I'm interested in "${propertyTitle}".`
  );

  return (
    <aside className="rounded-2xl bg-white p-6 shadow-lg lg:sticky lg:top-24">
      {/* Agent info */}
      <div className="flex items-center gap-4">
        <img
          src={agent.photo}
          alt={agent.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <p className="font-display text-xl">{agent.name}</p>
          <p className="text-sm font-medium text-gold">{agent.role}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <a
          href={`tel:${agent.phone}`}
          className="rounded-full bg-ink py-2.5 text-center text-sm font-medium text-white transition hover:bg-ink-soft"
        >
          Call
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-gold py-2.5 text-center text-sm font-medium text-gold transition hover:bg-gold hover:text-ink"
        >
          WhatsApp
        </a>
      </div>

      <hr className="my-6 border-ink/10" />

      <h3 className="font-display text-lg">Request a viewing</h3>

      {status === "sent" ? (
        <div role="status" className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-800">
          ✅ Thank you! {agent.name.split(" ")[0]} will contact you shortly.
          <button
            onClick={() => setStatus("idle")}
            className="mt-3 block font-medium underline"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
          <div>
            <label htmlFor="name" className="sr-only">Your name</label>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={update}
              placeholder="Your name"
              aria-invalid={!!errors.name}
              className={`${fieldClass} ${errors.name ? "border-red-400" : "border-ink/10"}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={update}
              placeholder="Phone (e.g. 0911 000 000)"
              aria-invalid={!!errors.phone}
              className={`${fieldClass} ${errors.phone ? "border-red-400" : "border-ink/10"}`}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={values.message}
              onChange={update}
              placeholder="I'd like to visit this property on..."
              aria-invalid={!!errors.message}
              className={`${fieldClass} ${errors.message ? "border-red-400" : "border-ink/10"}`}
            />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Request"}
          </button>
        </form>
      )}
    </aside>
  );
}