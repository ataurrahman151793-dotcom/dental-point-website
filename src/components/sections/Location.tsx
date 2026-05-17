"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { CLINIC } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  /* Mapbox GL init — dark style premium map */
  useEffect(() => {
    if (!mapRef.current || !inView) return;

    const init = async () => {
      /* Dynamic import keeps mapbox-gl out of the initial bundle */
      const mapboxgl = (await import("mapbox-gl")).default;

      /* Public token placeholder — set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local */
      mapboxgl.accessToken =
        process.env.NEXT_PUBLIC_MAPBOX_TOKEN ??
        "pk.placeholder_replace_with_real_token";

      const map = new mapboxgl.Map({
        container: mapRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [91.7898, 26.1374],
        zoom: 13,
        interactive: true,
        attributionControl: false,
      });

      /* Custom SVG pin with pulse */
      const el = document.createElement("div");
      el.innerHTML = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:40px;height:40px;">
          <div style="position:absolute;width:40px;height:40px;border-radius:50%;background:rgba(47,93,82,0.3);animation:pulse 2s ease-in-out infinite;"></div>
          <div style="position:absolute;width:20px;height:20px;border-radius:50%;background:#2F5D52;border:3px solid #C8E0D6;"></div>
        </div>
      `;
      el.style.cursor = "pointer";

      new mapboxgl.Marker({ element: el })
        .setLngLat([91.7898, 26.1374])
        .addTo(map);

      /* Subtle zoom on hover */
      mapRef.current?.addEventListener("mouseenter", () => {
        map.scrollZoom.enable();
        map.easeTo({ zoom: 14, duration: 800 });
      });
      mapRef.current?.addEventListener("mouseleave", () => {
        map.easeTo({ zoom: 13, duration: 800 });
      });

      return () => map.remove();
    };

    init();
  }, [inView]);

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 md:py-48"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="location-heading"
    >
      <div className="container-site">
        <div className="flex flex-col gap-4 mb-16">
          <Eyebrow>find us</Eyebrow>
          <h2 id="location-heading" className="display-section text-ink">
            we&apos;re easy to find
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* Left — address & hours */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: MapPin,
                  label: "address",
                  content: CLINIC.address,
                  href: CLINIC.addressUrl,
                  linkLabel: "get directions",
                },
                {
                  icon: Phone,
                  label: "phone",
                  content: CLINIC.phone,
                  href: CLINIC.phoneHref,
                  linkLabel: "call now",
                },
                {
                  icon: Clock,
                  label: "hours",
                  content: CLINIC.hours,
                  href: undefined,
                  linkLabel: undefined,
                },
              ].map(({ icon: Icon, label, content, href, linkLabel }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--color-mint)" }}
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="eyebrow mb-1">{label}</p>
                    <p className="text-ink font-medium">{content}</p>
                    {href && linkLabel && (
                      <a
                        href={href}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors mt-1"
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {linkLabel}
                        <ArrowRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button href="#contact-form" variant="primary">
              request an appointment
            </Button>
          </div>

          {/* Right — Mapbox map */}
          <div
            className="relative overflow-hidden rounded-[var(--radius-lg)] min-h-[400px]"
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            {/* Pulse keyframe injection */}
            <style>{`
              @keyframes pulse {
                0%,100%{transform:scale(1);opacity:0.8}
                50%{transform:scale(1.8);opacity:0}
              }
            `}</style>
            <div
              ref={mapRef}
              className="w-full h-full min-h-[400px]"
              aria-label="Map showing Dental Point & Implant Centre location in Guwahati"
              role="img"
            />
            {/* Mapbox CSS */}
            {/* loaded via head in layout or here inline for simplicity */}
          </div>
        </div>
      </div>
    </section>
  );
}
