import { useState } from "react";
import { Loader2 } from "lucide-react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full border border-line bg-ink/60 px-3.5 py-3 text-base text-silver outline-none transition-colors placeholder:text-steel focus:border-cobalt/70";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = "Please add your name.";
    if (!EMAIL.test(values.email.trim())) next.email = "Add an email address I can reply to.";
    if (values.message.trim().length < 12) next.message = "A little more detail helps (12+ characters).";
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    // Honeypot: real visitors never fill this field.
    if (values.website) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setSubmitError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.status !== 201) throw new Error("Delivery failed");
      setStatus("sent");
      setValues({ name: "", email: "", message: "", website: "" });
    } catch (error) {
      setStatus("idle");
      setSubmitError("This message could not be sent. Please try again in a moment.");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[320px] flex-col justify-center border border-line/70 bg-surface/40 p-8">
        <p className="eyebrow">Message received</p>
        <p className="mt-4 font-display text-2xl tracking-tight text-silver">
          Thanks — it's in the inbox.
        </p>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-steel">
          Replies go to the address you left. If you want to add context, send another message.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-7 self-start border border-line px-5 py-2.5 type-control text-silver transition-colors hover:border-cobalt/50 hover:text-white"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line/70 bg-surface/40 p-6 sm:p-8">
      <p className="eyebrow">Direct message</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-2 block type-control text-steel">
            Name
          </label>
          <input
            id="contact-name"
            value={values.name}
            onChange={update("name")}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass}
            placeholder="How should I address you?"
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 type-control text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block type-control text-steel">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={values.email}
            onChange={update("email")}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 type-control text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block type-control text-steel">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={values.message}
            onChange={update("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${inputClass} resize-none`}
            placeholder="What are you building?"
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 type-control text-red-300">
              {errors.message}
            </p>
          )}
        </div>

        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update("website")}
          />
        </div>

        {submitError && (
          <p role="alert" className="type-control leading-relaxed tracking-[0.1em] text-red-300">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 bg-cobalt px-6 py-3.5 type-control text-white transition-colors hover:bg-[#1F49E0] disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </button>
        <p className="type-control leading-relaxed tracking-[0.14em] text-steel">
          Messages are stored privately and reviewed by the site owner.
        </p>
      </div>
    </form>
  );
}