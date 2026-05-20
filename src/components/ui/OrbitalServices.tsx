"use client";

import { useState, useEffect } from "react";
import { Anchor, Smile, Sliders, Sun, Shield, Layers, Globe, Zap, ArrowRight } from "lucide-react";

type Status = "completed" | "in-progress";

interface ServiceNode {
  id: number;
  title: string;
  date: string;
  content: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: Status;
  energy: number;
}

const SERVICES: ServiceNode[] = [
  {
    id: 1, title: "Implants", date: "Flagship",
    content: "Computer-guided implants. 98% success rate. Single tooth to full-arch restoration — often in one visit.",
    icon: Anchor, relatedIds: [2, 6], status: "completed", energy: 98,
  },
  {
    id: 2, title: "Smile Design", date: "Popular",
    content: "Complete smile transformation — veneers, whitening & alignment combined. Visible results in 2–4 visits.",
    icon: Smile, relatedIds: [1, 3, 4], status: "completed", energy: 93,
  },
  {
    id: 3, title: "Aligners", date: "12–18 mo",
    content: "Invisible braces from ₹3,999/mo EMI. No metal wires. Nobody knows you're in treatment.",
    icon: Sliders, relatedIds: [2], status: "in-progress", energy: 80,
  },
  {
    id: 4, title: "Whitening", date: "60 min",
    content: "Laser whitening — 4–6 shades brighter in a single session. Zero sensitivity formula.",
    icon: Sun, relatedIds: [2], status: "completed", energy: 88,
  },
  {
    id: 5, title: "Root Canal", date: "Pain-free",
    content: "Single-sitting RCT with rotary endodontics. Completely painless under local anaesthesia.",
    icon: Shield, relatedIds: [6], status: "completed", energy: 85,
  },
  {
    id: 6, title: "Bone Graft", date: "Advanced",
    content: "Pre-implant grafting for patients with bone loss. Safe, precise and predictable outcomes.",
    icon: Layers, relatedIds: [1, 5], status: "completed", energy: 82,
  },
  {
    id: 7, title: "NRI Care", date: "Global",
    content: "50+ international patients treated. Planned around your visit schedule. English-speaking team.",
    icon: Globe, relatedIds: [1, 2], status: "completed", energy: 90,
  },
  {
    id: 8, title: "Emergency", date: "Same-day",
    content: "Pain, swelling or broken tooth? We often see emergency cases the same day — WhatsApp us.",
    icon: Zap, relatedIds: [5], status: "in-progress", energy: 76,
  },
];

const RADIUS = 128;

export default function OrbitalServices() {
  const [expandedId,  setExpandedId]  = useState<number | null>(null);
  const [showCardId,  setShowCardId]  = useState<number | null>(null);
  const [rotation,    setRotation]    = useState(0);
  const [autoRotate,  setAutoRotate]  = useState(true);
  const [pulseIds,    setPulseIds]    = useState<number[]>([]);

  /* Auto-rotation loop */
  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => {
      setRotation(prev => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(id);
  }, [autoRotate]);

  const getPos = (index: number) => {
    const angle = ((index / SERVICES.length) * 360 + rotation) % 360;
    const rad   = (angle * Math.PI) / 180;
    return {
      x:       RADIUS * Math.cos(rad),
      y:       RADIUS * Math.sin(rad),
      zIndex:  Math.round(100 + 50 * Math.cos(rad)),
      opacity: Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(rad)) / 2))),
    };
  };

  const handleToggle = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setShowCardId(null);
      setAutoRotate(true);
      setPulseIds([]);
      return;
    }
    /* Rotate so clicked node arrives at top (270°) */
    const idx         = SERVICES.findIndex(s => s.id === id);
    const targetAngle = (idx / SERVICES.length) * 360;
    setRotation(270 - targetAngle);
    setExpandedId(id);
    setShowCardId(null);
    setAutoRotate(false);
    setPulseIds(SERVICES.find(s => s.id === id)?.relatedIds ?? []);
    /* Show card only after the node has slid to top */
    setTimeout(() => setShowCardId(id), 680);
  };

  const handleBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setExpandedId(null);
      setShowCardId(null);
      setAutoRotate(true);
      setPulseIds([]);
    }
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none"
      onClick={handleBg}
    >
      {/* Orbit ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  RADIUS * 2 + 40,
          height: RADIUS * 2 + 40,
          border: "1px solid rgba(47,93,82,0.18)",
        }}
      />

      {/* Center orb */}
      <div
        className="absolute z-10 flex items-center justify-center rounded-full"
        style={{
          width: 56, height: 56,
          background: "linear-gradient(135deg, var(--color-primary) 0%, #4a9d84 55%, #D8B589 100%)",
        }}
      >
        <div
          className="absolute rounded-full animate-ping opacity-25"
          style={{ width: 68, height: 68, border: "1.5px solid var(--color-primary)" }}
        />
        <div className="rounded-full" style={{ width: 22, height: 22, background: "rgba(246,244,239,0.92)" }} />
      </div>


      {/* Nodes */}
      {SERVICES.map((svc, i) => {
        const pos        = getPos(i);
        const isExpanded = expandedId === svc.id;
        const isPulsing  = pulseIds.includes(svc.id);
        const Icon       = svc.icon as React.FC<{ size?: number; style?: React.CSSProperties }>;

        return (
          <div
            key={svc.id}
            className="absolute cursor-pointer transition-all duration-700"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              zIndex:    isExpanded ? 200 : pos.zIndex,
              opacity:   isExpanded ? 1    : pos.opacity,
            }}
            onClick={(e) => { e.stopPropagation(); handleToggle(svc.id); }}
          >
            {/* Pulse halo for related nodes */}
            {isPulsing && (
              <div
                className="absolute rounded-full animate-pulse pointer-events-none"
                style={{
                  inset: -14,
                  background: "radial-gradient(circle, rgba(47,93,82,0.28) 0%, transparent 70%)",
                }}
              />
            )}

            {/* Node circle */}
            <div
              className="flex items-center justify-center rounded-full border-2 transition-all duration-300"
              style={{
                width: 40, height: 40,
                transform:   isExpanded ? "scale(1.45)" : "scale(1)",
                background:  isExpanded ? "var(--color-primary)" : isPulsing ? "rgba(47,93,82,0.18)" : "var(--color-bg)",
                borderColor: isExpanded ? "var(--color-primary)" : isPulsing ? "var(--color-primary)" : "rgba(47,93,82,0.28)",
                boxShadow:   isExpanded ? "0 0 18px rgba(47,93,82,0.45)" : "none",
              }}
            >
              <Icon size={14} style={{ color: isExpanded ? "#fff" : "var(--color-primary)" }} />
            </div>

            {/* Label */}
            <div
              className="absolute whitespace-nowrap font-body text-xs font-semibold"
              style={{
                top: 44, left: "50%", transform: "translateX(-50%)",
                color: isExpanded ? "var(--color-ink)" : "var(--color-ink-soft)",
              }}
            >
              {svc.title}
            </div>

            {/* Expanded card — shown after node reaches top */}
            {isExpanded && showCardId === svc.id && (
              <div
                className="absolute rounded-2xl"
                style={{
                  top: 58, left: "50%", transform: "translateX(-50%)",
                  width: 216,
                  background:  "var(--color-bg)",
                  border:      "1.5px solid rgba(47,93,82,0.22)",
                  boxShadow:   "0 10px 40px rgba(0,0,0,0.13)",
                  animation:   "orbCardIn 0.3s ease forwards",
                }}
              >
                {/* Connector */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  style={{ width: 1, height: 12, background: "rgba(47,93,82,0.35)" }}
                />

                <div className="p-4">
                  {/* Status + date row */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className="font-body text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: svc.status === "completed" ? "rgba(47,93,82,0.14)" : "rgba(216,181,137,0.22)",
                        color:      svc.status === "completed" ? "var(--color-primary)" : "#A07020",
                      }}
                    >
                      {svc.status === "completed" ? "Available now" : "Growing fast"}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--color-ink-soft)" }}>
                      {svc.date}
                    </span>
                  </div>

                  {/* Title */}
                  <p className="font-display font-semibold text-sm mb-1.5" style={{ color: "var(--color-ink)" }}>
                    {svc.title}
                  </p>

                  {/* Body */}
                  <p className="font-body text-xs leading-relaxed mb-3" style={{ color: "var(--color-ink-soft)" }}>
                    {svc.content}
                  </p>

                  {/* Satisfaction bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-body text-xs" style={{ color: "var(--color-ink-soft)" }}>
                        Patient satisfaction
                      </span>
                      <span className="font-mono text-xs font-bold" style={{ color: "var(--color-primary)" }}>
                        {svc.energy}%
                      </span>
                    </div>
                    <div className="w-full rounded-full" style={{ height: 3, background: "rgba(47,93,82,0.12)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${svc.energy}%`,
                          background: "linear-gradient(90deg, var(--color-primary), #4a9d84)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Related nodes */}
                  {svc.relatedIds.length > 0 && (
                    <div>
                      <p className="font-body text-xs uppercase tracking-wider mb-1.5" style={{ color: "rgba(0,0,0,0.3)" }}>
                        Also consider
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {svc.relatedIds.map(rid => {
                          const rel = SERVICES.find(s => s.id === rid)!;
                          return (
                            <button
                              key={rid}
                              onClick={(e) => { e.stopPropagation(); handleToggle(rid); }}
                              className="flex items-center gap-0.5 font-body text-xs px-2 py-0.5 rounded-full transition-all duration-150"
                              style={{
                                border:     "1px solid rgba(47,93,82,0.25)",
                                color:      "var(--color-primary)",
                                background: "rgba(47,93,82,0.06)",
                              }}
                              onMouseEnter={e => (e.currentTarget.style.background = "rgba(47,93,82,0.14)")}
                              onMouseLeave={e => (e.currentTarget.style.background = "rgba(47,93,82,0.06)")}
                            >
                              {rel.title}
                              <ArrowRight size={8} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Keyframe for card fade-in */}
      <style>{`
        @keyframes orbCardIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
