import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero   from "@/components/sections/Hero";

/* ── Above-fold (eager) ──────────────────────────────── */
import MarqueeIntro from "@/components/sections/MarqueeIntro";

/* ── Below-fold: code-split so initial JS bundle is smaller ── */
const Doctors        = dynamic(() => import("@/components/sections/Doctors"));
const DetailsList    = dynamic(() => import("@/components/sections/DetailsList"));
const SavingsBand    = dynamic(() => import("@/components/sections/SavingsBand"));
const YomiShowcase   = dynamic(() => import("@/components/sections/YomiShowcase"));
const TechnologyCards= dynamic(() => import("@/components/sections/TechnologyCards"));
const ServicesSplit  = dynamic(() => import("@/components/sections/ServicesSplit"));
const ExpertiseMarquee = dynamic(() => import("@/components/sections/ExpertiseMarquee"));
const ProblemsWeTreat  = dynamic(() => import("@/components/sections/problems-we-treat"));
const Pricing        = dynamic(() => import("@/components/sections/Pricing"));
const ComfortGallery = dynamic(() => import("@/components/sections/ComfortGallery"));
const Testimonials   = dynamic(() => import("@/components/sections/Testimonials"));
const NortheastReach = dynamic(() => import("@/components/sections/NortheastReach"));
const SmileScore     = dynamic(() => import("@/components/sections/SmileScore"));
const BeforeAfterSection = dynamic(() => import("@/components/sections/BeforeAfterSection"));
const FAQLocation    = dynamic(() => import("@/components/sections/FAQLocation"));
const TrustBadges    = dynamic(() => import("@/components/sections/TrustBadges"));
const FeaturedIn     = dynamic(() => import("@/components/sections/FeaturedIn"));
const InstagramFeed  = dynamic(() => import("@/components/sections/InstagramFeed"));
const ContactForm    = dynamic(() => import("@/components/sections/ContactForm"));
const Footer         = dynamic(() => import("@/components/sections/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"));
const MobileCTABar   = dynamic(() => import("@/components/ui/MobileCTABar"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MarqueeIntro />
        <Doctors />
        <DetailsList />
        <SavingsBand />
        <YomiShowcase />
        <TechnologyCards />
        <ServicesSplit />
        <ExpertiseMarquee />
        <ProblemsWeTreat />
        <Pricing />
        <SmileScore />
        <BeforeAfterSection />
        <ComfortGallery />
        <Testimonials />
        <NortheastReach />
        <FAQLocation />
        <TrustBadges />
        <FeaturedIn />
        <InstagramFeed />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCTABar />
    </>
  );
}
