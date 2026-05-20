'use client';

export default function ClinicMap() {
  return (
    /* Explicit light color-scheme prevents Android Chrome forced-dark from inverting the map */
    <div style={{ colorScheme: 'light', width: '100%', height: '100%' }}>
      <iframe
        title="Dental Point & Implant Centre location"
        src="https://maps.google.com/maps?q=26.139001,91.789896&z=16&output=embed&hl=en"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '320px', display: 'block', colorScheme: 'light' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
