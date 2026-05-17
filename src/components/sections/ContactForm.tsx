"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Send, AlertCircle } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

/* ── Validation schema (unchanged) ── */
const appointmentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s\-().+]+$/, "Invalid phone number"),
  email: z.string().email("Enter a valid email address"),
  hasInsurance: z.enum(["yes", "no"], "Please select an option"),
  insurancePlan: z.string().optional(),
  message: z.string().optional(),
  consent: z.literal(true, "You must agree to continue"),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.5 },
  },
};

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          className="flex items-center gap-1 text-xs text-red-500 mt-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          role="alert"
          aria-live="polite"
        >
          <AlertCircle size={12} aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function InputField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col gap-1"
      variants={shakeVariants}
      animate={error ? "shake" : "idle"}
    >
      <label htmlFor={id} className="text-xs font-body font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-soft)" }}>
        {label}
      </label>
      {children}
      <FieldError message={error} />
    </motion.div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border text-ink font-body text-sm transition-all duration-200 focus:outline-none focus:ring-2 bg-white/70";
const inputStyle = {
  borderColor: "rgba(47,93,82,0.15)",
  "--tw-ring-color": "var(--color-primary)",
} as React.CSSProperties;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const hasInsurance = watch("hasInsurance");

  const onSubmit = async (data: AppointmentFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form submitted:", data);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact-form"
      className="py-16 md:py-20"
      style={{ background: "var(--color-blush)" }}
      aria-labelledby="form-heading"
    >
      <div className="container-site">
        {/* ── Split-panel card (booking.com pattern) ── */}
        <div
          className="relative w-full overflow-hidden rounded-[2rem] flex flex-col lg:flex-row"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >

          {/* ── Left panel — image + decorative overlays ── */}
          <div className="hidden lg:block relative lg:w-[42%] min-h-[660px] overflow-hidden">
            {/* Background image */}
            <Image
              src="/images/form-hero-better-smile.png"
              alt="Journal reading 'Today I take care of me' — your first step toward a better smile at Dental Point"
              fill
              quality={88}
              className="object-cover object-center"
              sizes="42vw"
            />

            {/* Top gradient overlay */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(26,36,33,0.55) 0%, rgba(26,36,33,0.1) 40%, rgba(26,36,33,0.75) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Vertical stripe decorations — booking.com signature */}
            <div className="absolute inset-0 z-[2] flex overflow-hidden" aria-hidden="true">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-full flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(10,20,18,0.22) 69%, rgba(200,224,214,0.05) 100%)",
                    opacity: 0.55,
                  }}
                />
              ))}
            </div>

            {/* Green glow blob — bottom left */}
            <div
              className="absolute bottom-0 left-0 w-72 h-72 rounded-full z-[2]"
              style={{
                background: "var(--color-primary)",
                opacity: 0.45,
                filter: "blur(90px)",
                transform: "translate(-35%, 35%)",
              }}
              aria-hidden="true"
            />

            {/* Accent glow blob — bottom right */}
            <div
              className="absolute bottom-20 right-0 w-36 h-36 rounded-full z-[2]"
              style={{
                background: "var(--color-accent)",
                opacity: 0.35,
                filter: "blur(50px)",
              }}
              aria-hidden="true"
            />

            {/* Panel content */}
            <div className="absolute inset-0 z-[3] flex flex-col justify-between p-10">
              <div>
                <Eyebrow dark>schedule your visit</Eyebrow>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-display text-[1.6rem] text-white lowercase leading-snug">
                  your first step toward<br />a better smile
                </p>
                <p className="text-sm" style={{ color: "rgba(246,244,239,0.58)" }}>
                  Most appointments available within the week in Guwahati.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right panel — form ── */}
          <div
            className="flex-1 p-8 sm:p-10 md:p-12"
            style={{ background: "var(--color-blush)" }}
          >
            {/* Heading */}
            <div className="flex flex-col gap-2 mb-8">
              <h2
                id="form-heading"
                className="font-display font-normal text-ink lowercase leading-tight tracking-tight"
              >
                <span className="block text-sm text-ink-soft/65 font-body font-medium lowercase tracking-wide mb-1">
                  book your appointment —
                </span>
                <span
                  className="block font-semibold text-ink leading-none"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.25rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  dental point
                </span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                Fill out the form and we&apos;ll be in touch within one business day.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4 py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                  >
                    <CheckCircle size={56} style={{ color: "var(--color-primary)" }} />
                  </motion.div>
                  <h3 className="font-display text-2xl text-ink lowercase">
                    you&apos;re all set!
                  </h3>
                  <p className="text-ink-soft max-w-xs text-sm">
                    We&apos;ll reach out within one business day to confirm your appointment. See you soon!
                  </p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                  noValidate
                  aria-label="Appointment request form"
                >
                  {/* Name row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="first name" id="firstName" error={errors.firstName?.message}>
                      <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        className={inputClass}
                        style={inputStyle}
                        aria-invalid={!!errors.firstName}
                        {...register("firstName")}
                      />
                    </InputField>
                    <InputField label="last name" id="lastName" error={errors.lastName?.message}>
                      <input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        className={inputClass}
                        style={inputStyle}
                        aria-invalid={!!errors.lastName}
                        {...register("lastName")}
                      />
                    </InputField>
                  </div>

                  {/* Phone */}
                  <InputField label="phone number" id="phone" error={errors.phone?.message}>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                      style={inputStyle}
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                    />
                  </InputField>

                  {/* Email */}
                  <InputField label="email address" id="email" error={errors.email?.message}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      style={inputStyle}
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                  </InputField>

                  {/* EMI radio */}
                  <fieldset className="flex flex-col gap-2">
                    <legend className="text-xs font-body font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-soft)" }}>
                      do you require an EMI payment plan?
                    </legend>
                    <div className="flex gap-6">
                      {(["yes", "no"] as const).map((val) => (
                        <label key={val} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value={val}
                            className="accent-primary w-4 h-4"
                            {...register("hasInsurance")}
                          />
                          <span className="text-sm text-ink capitalize">{val}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError message={errors.hasInsurance?.message} />
                  </fieldset>

                  {/* Conditional: EMI plan name */}
                  <AnimatePresence>
                    {hasInsurance === "yes" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <InputField label="EMI plan / finance provider" id="insurancePlan" error={errors.insurancePlan?.message}>
                          <input
                            id="insurancePlan"
                            type="text"
                            placeholder="e.g. Bajaj Finserv, HDFC, ZestMoney…"
                            className={inputClass}
                            style={inputStyle}
                            {...register("insurancePlan")}
                          />
                        </InputField>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message */}
                  <InputField label="message (optional)" id="message" error={errors.message?.message}>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Any questions or concerns we should know about?"
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                      {...register("message")}
                    />
                  </InputField>

                  {/* Consent */}
                  <div className="flex flex-col gap-1">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-primary mt-1 w-4 h-4 flex-shrink-0"
                        aria-invalid={!!errors.consent}
                        {...register("consent")}
                      />
                      <span className="text-xs text-ink-soft leading-relaxed">
                        I agree to be contacted by Dental Point & Implant Centre regarding my appointment request. I understand my information will not be shared with third parties.
                      </span>
                    </label>
                    <FieldError message={errors.consent?.message} />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="relative flex items-center justify-center gap-3 w-full py-4 rounded-xl font-body font-semibold text-white transition-colors mt-1"
                    style={{
                      background: loading
                        ? "var(--color-primary-hover)"
                        : "var(--color-primary)",
                    }}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          aria-hidden="true"
                        />
                        sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden="true" />
                        request appointment
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
