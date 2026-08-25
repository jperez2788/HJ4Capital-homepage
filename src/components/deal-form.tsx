import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { ROLES, SITE } from "@/lib/site";

type Status = "idle" | "error" | "sent";

export function DealForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const market = String(data.get("market") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) {
      setError("Please enter your name.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      setStatus("error");
      return;
    }
    if (message.length < 12) {
      setError("Please include a short note or offering summary.");
      setStatus("error");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      role,
      market,
      message,
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("hj4-inquiries") ?? "[]") as unknown[];
      localStorage.setItem("hj4-inquiries", JSON.stringify([payload, ...prev].slice(0, 25)));
    } catch {
      /* ignore quota */
    }

    setError("");
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-hairline-dark bg-ink-soft p-8">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-steel">Received</p>
        <h3 className="mt-3 font-display text-3xl tracking-tight text-paper">
          Thank you. We will review it.
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
          For a faster conversation, call{" "}
          <a href={SITE.phoneHref} className="text-paper underline-offset-4 hover:underline">
            {SITE.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" autoComplete="name" required placeholder="Your name" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@firm.com"
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(000) 000-0000"
          />
        </Field>
        <Field label="I am a" htmlFor="role">
          <Select id="role" name="role" defaultValue="Broker">
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Market or city" htmlFor="market">
        <Input id="market" name="market" placeholder="Tampa, Orlando, DFW…" />
      </Field>
      <Field label="Opportunity" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Property, unit count, basis, and anything we should see first."
        />
      </Field>
      {status === "error" ? (
        <p className="text-sm text-stone" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary">
          Send to HJ4
        </Button>
        <p className="text-xs text-muted">We typically reply within two business days.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
