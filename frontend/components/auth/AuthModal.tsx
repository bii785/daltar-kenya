"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

interface AuthModalProps {
  onClose: () => void;
  initialMode?: "login" | "register";
}

// Rebuilds the original auth.css/auth.js modal — same tab structure and the
// "Company Legal Name" field that only appears on register — but now wired
// to real endpoints instead of just toggling CSS classes.
export default function AuthModal({ onClose, initialMode = "login" }: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        await register({
          email,
          password,
          full_name: fullName,
          company_name: companyName || undefined
        });
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-xl border border-daltar-border bg-daltar-bg-card p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-xl leading-none text-daltar-text-muted transition hover:text-daltar-text-bright"
        >
          &times;
        </button>

        <div className="mb-6 flex gap-4 border-b border-daltar-border">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`pb-2.5 text-base font-semibold transition ${
              mode === "login"
                ? "border-b-2 border-daltar-accent-blue text-daltar-text-bright"
                : "text-daltar-text-muted hover:text-daltar-text-bright"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`pb-2.5 text-base font-semibold transition ${
              mode === "register"
                ? "border-b-2 border-daltar-accent-blue text-daltar-text-bright"
                : "text-daltar-text-muted hover:text-daltar-text-bright"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-daltar-text-muted">
                Full name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-md border border-daltar-border bg-daltar-bg-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/30"
              />
            </div>
          )}

          {mode === "register" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-daltar-text-muted">
                Company legal name (optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                className="w-full rounded-md border border-daltar-border bg-daltar-bg-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/30"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-daltar-text-muted">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-daltar-border bg-daltar-bg-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-daltar-text-muted">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-daltar-border bg-daltar-bg-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/30"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-md bg-daltar-accent-blue px-5 py-2.5 text-sm font-semibold text-daltar-bg-deep transition hover:bg-daltar-accent-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
