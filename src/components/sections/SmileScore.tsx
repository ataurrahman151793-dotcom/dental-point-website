"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, CheckCircle } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { GlowCard } from "@/components/ui/GlowCard";
import { CLINIC } from "@/lib/constants";

const QUESTIONS = [
  {
    q: "How would you describe your main concern?",
    options: [
      { label: "Pain or toothache",           value: "pain"      },
      { label: "Missing or broken tooth",      value: "missing"   },
      { label: "Yellow or stained teeth",      value: "staining"  },
      { label: "Crooked or gapped smile",      value: "alignment" },
    ],
  },
  {
    q: "How long have you had this concern?",
    options: [
      { label: "Just started (under 1 week)",  value: "acute"     },
      { label: "A few months",                 value: "months"    },
      { label: "More than a year",             value: "chronic"   },
      { label: "As long as I can remember",    value: "always"    },
    ],
  },
  {
    q: "What matters most to you?",
    options: [
      { label: "No pain during treatment",     value: "painless"  },
      { label: "Quick results",                value: "fast"      },
      { label: "Long-lasting outcome",         value: "lasting"   },
      { label: "Affordable / EMI option",      value: "emi"       },
    ],
  },
  {
    q: "Have you visited a dentist in the last year?",
    options: [
      { label: "Yes, regularly",               value: "regular"   },
      { label: "Yes, once",                    value: "once"      },
      { label: "No, it has been 2+ years",     value: "overdue"   },
      { label: "Never / first time",           value: "never"     },
    ],
  },
];

type Result = {
  title:    string;
  body:     string;
  cta:      string;
  ctaHref:  string;
  urgency:  "low" | "medium" | "high";
};

function getResult(answers: string[]): Result {
  const [concern, duration, priority, lastVisit] = answers;

  if (concern === "pain" || (duration === "acute" && concern !== "alignment")) {
    return {
      title:   "You need urgent care",
      body:    "Based on your answers, we recommend an appointment within 48 hours. Pain is your body's signal — don't wait. Our team can often see emergency cases the same day.",
      cta:     "WhatsApp us now",
      ctaHref: CLINIC.whatsapp,
      urgency: "high",
    };
  }
  if (concern === "missing") {
    return {
      title:   "Dental implants could be your solution",
      body:    "A missing or broken tooth affects your bite, bone health, and confidence. Computer-guided implants at Dental Point offer a permanent, natural-looking solution — often in a single visit.",
      cta:     "Get a free implant quote",
      ctaHref: "#contact-form",
      urgency: "medium",
    };
  }
  if (concern === "staining") {
    return {
      title:   "A brighter smile is one visit away",
      body:    "Professional laser whitening at Dental Point delivers 4–6 shades brighter results in 60 minutes. Safe, effective, and zero sensitivity. Perfect for your schedule.",
      cta:     "Book whitening session",
      ctaHref: "#contact-form",
      urgency: "low",
    };
  }
  if (concern === "alignment") {
    return {
      title:   "Invisible aligners are a great fit for you",
      body:    "Clear aligners can straighten your smile discreetly in 12–18 months — no metal wires, no discomfort, no one even noticing. EMI plans available from ₹3,999/month.",
      cta:     "Explore aligner options",
      ctaHref: "#contact-form",
      urgency: "low",
    };
  }
  return {
    title:   "You are overdue for a check-up",
    body:    "It sounds like a routine cleaning and check-up would be the perfect starting point. Most problems caught early cost far less to treat — and our team makes it completely painless.",
    cta:     "Book a check-up",
    ctaHref: "#contact-form",
    urgency: "low",
  };
}

const URGENCY_COLORS = {
  high:   { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.35)",  text: "#EF4444"  },
  medium: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", text: "#F59E0B"  },
  low:    { bg: "rgba(47,93,82,0.12)",   border: "rgba(200,224,214,0.4)", text: "var(--color-primary)" },
};

const slide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0  },
  exit:    { opacity: 0, x: -40 },
};

export default function SmileScore() {
  const [step,    setStep]    = useState<number>(0);          // 0–3 = questions, 4 = result
  const [answers, setAnswers] = useState<string[]>([]);
  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("");
  const [sent,    setSent]    = useState(false);

  const total = QUESTIONS.length;

  const choose = (value: string) => {
    const next = [...answers, value];
    setAnswers(next);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setName("");
    setPhone("");
    setSent(false);
  };

  const result = answers.length === total ? getResult(answers) : null;
  const colors  = result ? URGENCY_COLORS[result.urgency] : URGENCY_COLORS.low;

  return (
    <section
      id="smile-score"
      aria-labelledby="smile-score-heading"
      className="py-12 md:py-16 overflow-hidden"
      style={{ background: "var(--color-ink)" }}
    >
      <div className="container-site flex flex-col items-center gap-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-lg">
          <Eyebrow dark>smile score quiz</Eyebrow>
          <h2
            id="smile-score-heading"
            className="font-display font-semibold lowercase leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "rgba(246,244,239,0.96)",
            }}
          >
            what does your<br />
            <em className="not-italic" style={{ color: "var(--color-accent)" }}>smile need?</em>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(200,224,214,0.6)" }}>
            Answer 4 quick questions and get a personalized treatment recommendation from our team.
          </p>
        </div>

        {/* Card */}
        <GlowCard
          glowColor="purple"
          bg="rgba(255,255,255,0.05)"
          border="rgba(255,255,255,0.1)"
          className="w-full max-w-xl overflow-hidden"
        >
          {/* Progress bar */}
          <div className="h-1 w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full"
              style={{ background: "var(--color-accent)" }}
              animate={{ width: `${Math.min((step / total) * 100, 100)}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="p-7 md:p-9">
            <AnimatePresence mode="wait">

              {/* Question steps */}
              {step < total && (
                <motion.div key={`q-${step}`} {...slide} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                  <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(200,224,214,0.45)" }}>
                    question {step + 1} of {total}
                  </p>
                  <h3
                    className="font-display font-medium lowercase leading-snug mb-6"
                    style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "rgba(246,244,239,0.95)" }}
                  >
                    {QUESTIONS[step].q}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {QUESTIONS[step].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => choose(opt.value)}
                        className="text-left px-5 py-3.5 rounded-xl font-body text-sm font-medium transition-all duration-200"
                        style={{
                          background:  "rgba(255,255,255,0.06)",
                          border:      "1.5px solid rgba(255,255,255,0.1)",
                          color:       "rgba(246,244,239,0.8)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,224,214,0.12)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,224,214,0.4)";
                          (e.currentTarget as HTMLButtonElement).style.color = "rgba(246,244,239,1)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                          (e.currentTarget as HTMLButtonElement).style.color = "rgba(246,244,239,0.8)";
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Result + lead capture */}
              {step === total && result && (
                <motion.div key="result" {...slide} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                  <div
                    className="rounded-2xl p-5 mb-6"
                    style={{ background: colors.bg, border: `1.5px solid ${colors.border}` }}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} style={{ color: colors.text, flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                      <div>
                        <p className="font-display font-semibold lowercase mb-1.5" style={{ fontSize: "1.1rem", color: "rgba(246,244,239,0.97)" }}>
                          {result.title}
                        </p>
                        <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(246,244,239,0.65)" }}>
                          {result.body}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lead capture */}
                  {!sent ? (
                    <div className="flex flex-col gap-3">
                      <p className="font-body text-sm" style={{ color: "rgba(200,224,214,0.6)" }}>
                        Get your personalized treatment plan — our team will call you within 2 hours.
                      </p>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1.5px solid rgba(255,255,255,0.12)",
                          color: "rgba(246,244,239,0.9)",
                          "--tw-ring-color": "rgba(200,224,214,0.5)",
                        } as React.CSSProperties}
                      />
                      <input
                        type="tel"
                        inputMode="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1.5px solid rgba(255,255,255,0.12)",
                          color: "rgba(246,244,239,0.9)",
                          "--tw-ring-color": "rgba(200,224,214,0.5)",
                        } as React.CSSProperties}
                      />
                      <a
                        href={result.ctaHref}
                        onClick={() => { if (name || phone) setSent(true); }}
                        className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-200 group"
                        style={{ background: "var(--color-accent)", color: "var(--color-ink)" }}
                      >
                        {result.cta}
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 py-4 text-center"
                    >
                      <CheckCircle size={40} style={{ color: "var(--color-accent)" }} />
                      <p className="font-display font-medium lowercase" style={{ color: "rgba(246,244,239,0.9)" }}>
                        we&apos;ll be in touch soon!
                      </p>
                      <p className="font-body text-sm" style={{ color: "rgba(200,224,214,0.55)" }}>
                        Expect a call or WhatsApp within 2 hours during clinic hours.
                      </p>
                    </motion.div>
                  )}

                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 mt-5 font-body text-xs transition-colors"
                    style={{ color: "rgba(200,224,214,0.4)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(200,224,214,0.75)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(200,224,214,0.4)")}
                  >
                    <RotateCcw size={12} />
                    start over
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
