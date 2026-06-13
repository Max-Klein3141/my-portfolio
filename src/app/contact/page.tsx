"use client";

import { useState, FormEvent } from "react";
import AmbientBackground from "@/components/ui/AmbientBackground";
import { Reveal } from "@/components/ui/Reveal";

/* ─────────────────────────────────────────────────────────────────────
   WEB3FORMS SETUP (one step):
   1. Go to https://web3forms.com, enter your email, and copy the free
      Access Key they send you (no account/login needed).
   2. Paste it below, replacing the placeholder. Save — that's it.

   This key is SAFE to be public: it can only send an email to YOU and is
   rate-limited. Submissions are delivered to the email you registered.
───────────────────────────────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = "63752e7a-9c60-43e3-904f-85575402c042";

/* Shared field styling — mirrors the site's input aesthetic. */
const FIELD =
  "w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3 " +
  "text-[14.5px] font-[350] text-white/75 placeholder:text-white/20 " +
  "outline-none transition-all duration-300 " +
  "focus:border-white/[0.16] focus:bg-white/[0.045] " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const LABEL =
  "block text-[10px] font-[500] tracking-[0.24em] uppercase text-white/30 mb-2.5";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    // Guard: key not pasted in yet.
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.startsWith("[")) {
      setErrorMsg(
        "This form isn't connected yet — add your Web3Forms access key in src/app/contact/page.tsx.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
          subject: `New message from ${name || "your website"}`,
          from_name: "Portfolio contact form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <main className="relative min-h-screen bg-black">

      {/* ── Fixed background ──────────────────────────────────────── */}
      <AmbientBackground />

      <div className="relative z-10 page-x max-w-site mx-auto page-top pb-44">
        <div className="max-w-[640px] mx-auto">

          {/* ── Header ────────────────────────────────────────────── */}
          <Reveal>
            <p className="section-label mb-5">Contact</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-[clamp(2.8rem,6.5vw,5.4rem)] font-[700]
                           tracking-[-0.04em] leading-[0.98] text-white mb-7">
              Let&apos;s <span className="text-gradient">talk.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-white/35 text-[16px] leading-[1.72] font-light
                          max-w-[460px] mb-14">
              [PLACEHOLDER — one sentence: what kinds of conversations you are open to]
            </p>
          </Reveal>

          {/* ── Form ──────────────────────────────────────────────── */}
          <Reveal delay={0.18}>
            {status === "sent" ? (
              <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03]
                              px-6 py-12 text-center">
                <p className="text-white/72 text-[16px] font-[360]">
                  Thanks — your message is on its way.
                </p>
                <p className="text-white/30 text-[13px] font-[340] mt-2.5 leading-[1.7]">
                  I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={LABEL}>Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={sending}
                    placeholder="Your name"
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={LABEL}>Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={sending}
                    placeholder="you@example.com"
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={LABEL}>Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={sending}
                    rows={5}
                    placeholder="Your message"
                    className={`${FIELD} resize-none leading-[1.7]`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-[13px] font-[380] text-red-400/70 leading-[1.7]">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 rounded-full
                             bg-white text-black px-7 py-[11px] text-[13px] font-semibold
                             tracking-[0.02em] shadow-cta-idle
                             transition-all duration-200
                             hover:bg-white/90 hover:shadow-cta-hover
                             hover:scale-[1.025] active:scale-[0.975]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             disabled:hover:scale-100"
                >
                  {sending ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </Reveal>

          {/* ── Direct contact ────────────────────────────────────── */}
          <Reveal delay={0.26} className="mt-12">
            <p className="text-white/30 text-[14px] font-[340] leading-[1.7]">
              Or reach me directly at{" "}
              <span className="text-white/55">[PLACEHOLDER — your email]</span>
            </p>
          </Reveal>

        </div>
      </div>
    </main>
  );
}
