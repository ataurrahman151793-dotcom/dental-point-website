'use client';

import React from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

const treatments = [
  {
    number: '01',
    title: 'Tooth Pain\n& Cavities',
    tagline: 'Painless relief, instant comfort',
    description:
      'Sharp tooth pain, sensitivity, or stubborn cavities? Our painless filling and modern techniques deliver instant relief — without the dread.',
    image: '/images/treatments/01-tooth-pain.jpg',
    fallbackColor: '#0f2018',
    highlights: [
      { label: 'Painless', text: 'Modern anaesthesia techniques mean you feel nothing during treatment.' },
      { label: 'Same-day', text: 'Walk in with pain, walk out smiling. Most cases finished in one visit.' },
      { label: 'Affordable', text: 'Transparent pricing with 0% EMI options available on every procedure.' },
    ],
  },
  {
    number: '02',
    title: 'Root Canal\nTreatment',
    tagline: 'Save your natural tooth',
    description:
      'Single-sitting painless root canal treatment. Preserve your natural tooth and avoid extraction with our advanced endodontic care.',
    image: '/images/treatments/02-root-canal.jpg',
    fallbackColor: '#0d1e17',
    highlights: [
      { label: 'Single visit', text: 'Most root canals completed in a single 60-90 minute appointment.' },
      { label: 'Microscopic precision', text: 'Dental microscope ensures we treat every canal — no infection left behind.' },
      { label: 'Lifetime crown', text: 'Premium zirconia crown protects your treated tooth for decades.' },
    ],
  },
  {
    number: '03',
    title: 'Teeth Cleaning\n& Scaling',
    tagline: 'Sparkling smile, fresh breath',
    description:
      'Yellow teeth, gum bleeding, or mouth odour? Our ultrasonic scaling gently removes tartar and gives you a fresh, healthy smile.',
    image: '/images/treatments/03-teeth-cleaning.jpg',
    fallbackColor: '#111c15',
    highlights: [
      { label: '30 minutes', text: 'Quick session that fits into your lunch break — visible results immediately.' },
      { label: 'Ultrasonic tech', text: 'Gentle on enamel, tough on plaque. No scraping, no harsh tools.' },
      { label: 'Fresh breath', text: 'Eliminates bacteria at the root cause — not just a temporary mask.' },
    ],
  },
  {
    number: '04',
    title: 'Smile\nDesigning',
    tagline: 'Your Hollywood smile awaits',
    description:
      'Complete smile makeover with veneers, bonding, and aesthetic dentistry. Crafted around your face shape for a natural, confident look.',
    image: '/images/treatments/04-smile-designing.jpg',
    fallbackColor: '#13211a',
    highlights: [
      { label: 'Digital preview', text: 'See your new smile on screen before any treatment begins.' },
      { label: 'Custom veneers', text: 'Ultra-thin porcelain veneers crafted to match your facial features.' },
      { label: 'Lifetime confidence', text: 'A smile that lasts decades — backed by premium materials and craftsmanship.' },
    ],
  },
  {
    number: '05',
    title: 'Teeth\nWhitening',
    tagline: '4-6 shades brighter, one sitting',
    description:
      'Safe, laser-based whitening that delivers visible results in a single appointment. No sensitivity, no harsh chemicals.',
    image: '/images/treatments/05-teeth-whitening.jpg',
    fallbackColor: '#0f1d16',
    highlights: [
      { label: '60 minutes', text: 'Walk in for lunch, walk out with a brighter smile that lasts months.' },
      { label: 'Zero sensitivity', text: 'Advanced gel formula protects enamel while lifting deep stains.' },
      { label: 'Long-lasting', text: 'Results stay vibrant for 12+ months with simple maintenance.' },
    ],
  },
  {
    number: '06',
    title: 'Dental\nImplants',
    tagline: 'Permanent solution, natural feel',
    description:
      'Premium titanium implants that look, feel, and function like natural teeth. Backed by lifetime warranty and computer-guided precision.',
    image: '/images/treatments/06-dental-implants.jpg',
    fallbackColor: '#0c1b14',
    highlights: [
      { label: '3D CBCT planning', text: 'Computer-guided surgery means precise placement and faster healing.' },
      { label: 'Lifetime warranty', text: 'Premium implant systems backed by manufacturer lifetime guarantee.' },
      { label: 'Eat anything', text: 'Bite force restored to 95% of natural teeth — corn, apples, nuts, all of it.' },
    ],
  },
  {
    number: '07',
    title: 'Braces &\nAligners',
    tagline: 'Straight teeth, your way',
    description:
      'From traditional metal braces to invisible aligners — choose the orthodontic solution that fits your lifestyle and budget.',
    image: '/images/treatments/07-braces-aligners.jpg',
    fallbackColor: '#10201a',
    highlights: [
      { label: 'Invisible aligners', text: 'Clear, removable trays nobody will notice — eat and brush freely.' },
      { label: 'Ceramic options', text: 'Tooth-coloured braces for adults who want discretion without aligners.' },
      { label: 'EMI from ₹3,999', text: 'Spread treatment cost over 12-24 months with 0% interest plans.' },
    ],
  },
  {
    number: '08',
    title: 'Crowns &\nBridges',
    tagline: 'Restore strength, restore confidence',
    description:
      'Zirconia and ceramic crowns that look indistinguishable from natural teeth. Full strength restored, full smile renewed.',
    image: '/images/treatments/08-crowns-bridges.jpg',
    fallbackColor: '#0e1c16',
    highlights: [
      { label: 'Same-day crowns', text: 'CEREC technology lets us design and fit your crown in one visit.' },
      { label: 'Zirconia strength', text: 'Premium material that withstands decades of normal biting force.' },
      { label: 'Natural aesthetics', text: 'Colour-matched to your existing teeth — invisible to others.' },
    ],
  },
  {
    number: '09',
    title: 'Wisdom Tooth\nExtraction',
    tagline: 'Painless removal, quick recovery',
    description:
      'Surgical wisdom tooth extraction with gentle anaesthesia and minimal downtime. Most patients back to normal within 48 hours.',
    image: '/images/treatments/09-wisdom-tooth.jpg',
    fallbackColor: '#0f1f18',
    highlights: [
      { label: 'Gentle sedation', text: 'Optional sedation options for anxious patients — wake up done.' },
      { label: '48-hour recovery', text: 'Most patients return to work and normal eating within two days.' },
      { label: 'Post-op support', text: '24/7 WhatsApp support for any questions during your recovery.' },
    ],
  },
  {
    number: '10',
    title: 'Kids\nDentistry',
    tagline: 'Where children love the dentist',
    description:
      'Specially designed pediatric care in a friendly, fear-free environment. Building lifelong healthy dental habits from day one.',
    image: '/images/treatments/10-kids-dentistry.jpg',
    fallbackColor: '#11211a',
    highlights: [
      { label: 'Child-friendly', text: 'Colourful environment, gentle approach — kids actually look forward to visits.' },
      { label: 'Behaviour-trained team', text: 'Our pediatric specialists are trained in child psychology and behaviour management.' },
      { label: 'Preventive focus', text: 'Sealants, fluoride, and education that prevent problems before they start.' },
    ],
  },
  {
    number: '11',
    title: 'Gum Disease\nTreatment',
    tagline: 'Save your gums, save your teeth',
    description:
      'Bleeding gums or loose teeth? Our advanced periodontal therapy reverses gum disease and protects your foundation.',
    image: '/images/treatments/11-gum-treatment.jpg',
    fallbackColor: '#0d1d16',
    highlights: [
      { label: 'Non-surgical', text: 'Most gum problems resolved without any surgery — deep cleaning and laser therapy.' },
      { label: 'Laser therapy', text: 'Precise laser treatment that targets infection while preserving healthy tissue.' },
      { label: 'Reverse damage', text: 'Regenerative techniques that can restore bone and tissue lost to disease.' },
    ],
  },
  {
    number: '12',
    title: 'Dentures',
    tagline: 'Confidence to eat, speak, smile',
    description:
      'Premium full and partial dentures that look natural and fit comfortably. Custom-crafted for your unique mouth.',
    image: '/images/treatments/12-dentures.jpg',
    fallbackColor: '#0f2018',
    highlights: [
      { label: 'Natural look', text: 'Modern dentures indistinguishable from real teeth — even up close.' },
      { label: 'Comfortable fit', text: 'Custom impressions ensure no slipping, no irritation, no embarrassment.' },
      { label: 'Implant-supported', text: 'Optional implant-supported dentures for rock-solid stability when eating.' },
    ],
  },
];

export default function ProblemsWeTreat() {
  return (
    <section id="problems-we-treat" aria-label="Problems we treat" style={{ background: '#0f1e17' }}>
      {/* Section intro header */}
      <div className="px-[4vw] py-[8vw] text-center">
        <p
          className="eyebrow"
          style={{ color: 'rgba(168,196,176,0.8)', letterSpacing: '0.2em' }}
        >
          Problems We Treat
        </p>
        <h2
          className="display-section mt-6 max-w-3xl mx-auto"
          style={{ color: '#F6F4EF', lineHeight: 0.9, letterSpacing: '-0.03em' }}
        >
          every smile<br />has a story
        </h2>
        <p
          className="mx-auto mt-8 max-w-[60ch] text-lg leading-relaxed"
          style={{ color: 'rgba(246,244,239,0.65)' }}
        >
          From everyday cleanings to complete smile makeovers — explore the treatments
          that bring our patients back to confidence.
        </p>
      </div>

      <FlowArt aria-label="Dental treatments scroll">
        {treatments.map((treatment) => (
          <FlowSection
            key={treatment.number}
            aria-label={treatment.title.replace('\n', ' ')}
            backgroundImage={treatment.image}
            fallbackColor={treatment.fallbackColor}
            style={{ color: '#ffffff' }}
          >
            {/* Top eyebrow */}
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(168,196,176,0.85)',
              }}
            >
              {treatment.number} — {treatment.tagline}
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)' }} />

            {/* Large treatment title */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 11vw, 11rem)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                  textTransform: 'lowercase',
                  color: '#F6F4EF',
                }}
              >
                {treatment.title.split('\n').map((line, idx, arr) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)' }} />

            {/* Description */}
            <p
              style={{
                maxWidth: '52ch',
                fontSize: 'clamp(1rem, 1.8vw, 1.375rem)',
                lineHeight: 1.6,
                color: 'rgba(246,244,239,0.85)',
              }}
            >
              {treatment.description}
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)' }} />

            {/* Highlights grid */}
            <div className="flex flex-wrap gap-[3vw]">
              {treatment.highlights.map((highlight, idx) => (
                <div key={idx} style={{ minWidth: '180px', flex: '1' }}>
                  <p
                    style={{
                      marginBottom: '0.5rem',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'rgba(200,224,214,0.9)',
                    }}
                  >
                    {highlight.label}
                  </p>
                  <p
                    style={{
                      fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                      lineHeight: 1.65,
                      color: 'rgba(246,244,239,0.7)',
                    }}
                  >
                    {highlight.text}
                  </p>
                </div>
              ))}
            </div>
          </FlowSection>
        ))}
      </FlowArt>
    </section>
  );
}
