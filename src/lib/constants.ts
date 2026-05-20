export const CLINIC = {
  name: "Dental Point & Implant Centre",
  tagline: "guwahati's trusted implant & smile specialists",
  phone: "+91 98640 97338",
  phoneHref: "tel:+919864097338",
  whatsapp: "https://wa.me/919864097338",
  address: "N.C. Hazarika Complex, Beltola Basistha Road, near Last Gate, Dispur, Guwahati, Assam 781006",
  addressUrl: "https://maps.google.com/?q=26.139001,91.789896",
  hours: "Mon–Sat · 9am – 9pm",
  reviewCount: 500,
  rating: 4.9,
  instagram: "https://instagram.com/dentalpointassam",
  facebook: "https://facebook.com/dentalpointguwahati",
  googleReviews: "https://www.google.com/search?q=Dental+Point+%26+Implant+Centre+Dispur+Guwahati",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasMega: true },
  { label: "Problems We Treat", href: "#problems" },
  { label: "Technology", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES_MEGA = [
  {
    category: "Routine Care",
    items: [
      { label: "Scaling & Polishing", href: "#" },
      { label: "Digital X-Rays", href: "#" },
      { label: "Fluoride Treatment", href: "#" },
      { label: "Pit & Fissure Sealants", href: "#" },
    ],
  },
  {
    category: "Restorative",
    items: [
      { label: "Dental Implants", href: "#" },
      { label: "Crowns & Bridges", href: "#" },
      { label: "Root Canal Treatment", href: "#" },
      { label: "Dentures & Partials", href: "#" },
    ],
  },
  {
    category: "Cosmetic",
    items: [
      { label: "Porcelain Veneers", href: "#" },
      { label: "Clear Aligners", href: "#" },
      { label: "Teeth Whitening", href: "#" },
      { label: "Smile Makeover", href: "#" },
    ],
  },
  {
    category: "Advanced",
    items: [
      { label: "3D CBCT Imaging", href: "#" },
      { label: "Laser Dentistry", href: "#" },
      { label: "Gum Treatment", href: "#" },
      { label: "Full Mouth Rehab", href: "#" },
    ],
  },
];

export const DOCTORS = [
  {
    name: "Dr. Dhritiman Borah",
    credentials: "MDS, Implantologist",
    bio: "Dr. Dhritiman brings over 12 years of specialized implantology experience to Dental Point. Trained at premier institutions including AIIMS, he is an expert in computer-guided implant surgery, full-arch rehabilitation, and bone grafting. Patients trust him for his precise technique and commitment to completely pain-free outcomes.",
    image: "/images/doctors/dr-dhritiman-borah.webp",
    experience: "12+ years",
    specializes: ["Dental Implants", "Bone Grafting", "Full-Arch Rehab", "Guided Surgery"],
    languages: ["Assamese", "Bengali", "Hindi", "English"],
    regNo: "ASD/MCI/XXXXX", // TODO[CLIENT]: confirm real MCI registration number
  },
  {
    name: "Dr. Asif Ahmed",
    credentials: "MDS, Prosthodontist & Cosmetic Dentist",
    bio: "Dr. Asif Ahmed is a specialist prosthodontist passionate about transforming smiles. His expertise spans porcelain veneers, smile design, clear aligners, and full-mouth rehabilitation. Colleagues and patients alike recognize his artistic vision and meticulous attention to every detail of your smile.",
    image: "/images/doctors/dr-asif-ahmed.webp",
    experience: "10+ years",
    specializes: ["Veneers", "Smile Design", "Clear Aligners", "Crown & Bridge"],
    languages: ["Assamese", "Bengali", "Hindi", "English", "Bodo"],
    regNo: "ASD/MCI/XXXXX", // TODO[CLIENT]: confirm real MCI registration number
  },
];

export const DETAILS = [
  "expert MDS-qualified implantologists & cosmetic specialists",
  "state-of-the-art 3D CBCT imaging & guided surgery",
  "painless dentistry with gentle anaesthesia techniques",
  "flexible EMI options — 0% interest plans available",
];

export const TECHNOLOGY = [
  {
    title: "3D CBCT imaging",
    body: "Our cone beam CT scanner creates a precise 3D map of your jaw and bone — enabling implant planning with sub-millimeter accuracy before we touch a tool.",
    image: "/images/tech/cerec.webp",
  },
  {
    title: "computer-guided implants",
    body: "Surgical guides crafted from your 3D scan direct each implant to the exact position, depth, and angle planned digitally — before we touch a tool. The result is minimal soft-tissue trauma, zero guesswork, and recovery times often half that of conventional surgery.",
    image: "/images/tech/yomi.webp",
  },
  {
    title: "laser dentistry",
    body: "Our dental laser performs fillings, gum reshaping, and cavity removal with no drill and no needle in most cases. Laser energy sterilises as it works — reducing infection risk, cutting bleeding to near zero, and accelerating tissue recovery for results that heal faster and feel better.",
    image: "/images/tech/solea.webp",
  },
];

export const SERVICES_SPLIT = [
  {
    number: "01",
    category: "Routine Care",
    heading: "prevention is the best investment",
    body: "Regular scaling, digital X-rays, and personalised hygiene plans keep your smile healthy for life. We make every visit comfortable and something you actually look forward to.",
    image: "/images/services/routine.webp",
    link: "#routine",
  },
  {
    number: "02",
    category: "Implants & Restorative",
    heading: "rebuild your smile with precision",
    body: "Computer-guided implants, same-day crowns, and precision bridges — all under one roof in Guwahati. Most restorations completed with minimal visits and maximum comfort.",
    image: "/images/services/restorative.webp",
    link: "#restorative",
  },
  {
    number: "03",
    category: "Cosmetic",
    heading: "the smile you've always deserved",
    body: "Porcelain veneers, clear aligners, teeth whitening, and full smile makeovers. Crafted with an artist's eye and delivered with clinical precision.",
    image: "/images/services/cosmetic.webp",
    link: "#cosmetic",
  },
];

export const EXPERTISE = [
  "dental implants",
  "smile design",
  "veneers",
  "clear aligners",
  "laser dentistry",
  "root canals",
  "crowns & bridges",
  "teeth whitening",
  "gum treatment",
];

export const TESTIMONIALS = [
  {
    name: "Priya S.",
    rating: 5,
    text: "I cannot say enough great things about Dr. Dhritiman and his team. From the moment I walked in, I felt genuinely cared for. My implant was done with zero pain — I was back at work the very next day!",
  },
  {
    name: "Rajesh B.",
    rating: 5,
    text: "What a wonderful team. They make the entire dental experience like no other clinic in Guwahati. Every staff member greets you by name and makes you feel completely at ease.",
  },
  {
    name: "Ananya S.",
    rating: 5,
    text: "Best dental clinic we have ever visited! The entire staff made my daughter's first visit so easy. She left saying she can't wait to come back — that says everything about Dental Point.",
  },
  {
    name: "Kavita B.",
    rating: 5,
    text: "Dr. Asif designed my smile makeover perfectly. He explained every step before doing it. I went from hiding my smile to showing it everywhere. I never thought I'd love going to the dentist!",
  },
  {
    name: "Rahul F.",
    rating: 5,
    text: "Everyone here is so professional and warm. The clinic is spotlessly clean, the technology is top-notch, and the EMI plan made my implant treatment completely affordable. Highly recommend!",
  },
];

export const FAQS = [
  {
    q: "What makes Dental Point & Implant Centre different?",
    a: "We combine MDS-qualified specialists with advanced 3D imaging, computer-guided implant surgery, and laser dentistry — all in Guwahati. Every detail of your visit is designed for comfort, precision, and lasting results.",
  },
  {
    q: "Do you offer dental implants?",
    a: "Yes — single-tooth and full-arch implants using computer-guided surgical precision. Our 3D CBCT scanner plans every placement for sub-millimeter accuracy, minimising surgery time and recovery.",
  },
  {
    q: "Can I straighten my teeth without metal braces?",
    a: "Absolutely. We offer clear aligners for comfortable, discreet, and highly effective teeth straightening. Most cases complete in 12–18 months with no metal wires or brackets.",
  },
  {
    q: "Are EMI or payment plans available?",
    a: "Yes — we offer flexible EMI options including 0% interest plans for implants and smile makeovers. Our team will help you choose a plan that fits your budget with no hidden charges.",
  },
  {
    q: "Is the treatment painful?",
    a: "We use gentle anaesthesia and laser techniques to ensure virtually pain-free treatment. Most patients are surprised at how comfortable their visit is — even for implants and root canals.",
  },
  {
    q: "How long does implant treatment take?",
    a: "A single implant can often be placed in one visit. Full osseointegration (healing) takes 3–6 months, after which your permanent crown is fitted. We guide you through every stage.",
  },
  {
    q: "Do you offer teeth whitening?",
    a: "Yes — professional in-clinic laser whitening delivers 4–6 shades brighter results in a single 60-minute session. Unlike home kits, our formula protects enamel while lifting deep stains with zero sensitivity.",
  },
  {
    q: "Is scaling (teeth cleaning) painful?",
    a: "Not at all. Our ultrasonic scaling is gentle and most patients feel only mild vibration. The 30-minute session removes years of tartar buildup, leaving your mouth fresh and your gums healthier immediately.",
  },
  {
    q: "How do I book an appointment?",
    a: "Call us, send a WhatsApp message, or submit the contact form below. We typically confirm within a few hours and offer early morning and evening slots to fit working professionals.",
  },
];

export const TRUST_BADGES = [
  { label: "Indian Dental Association", abbr: "IDA" },
  { label: "MDS Qualified Specialists", abbr: "MDS" },
  { label: "NABH Standards", abbr: "NABH" },
  { label: "Nobel Biocare Implants", abbr: "NOBEL" },
  { label: "Invisalign Certified", abbr: "ALIGNERS" },
  { label: "3D CBCT Imaging", abbr: "3D CBCT" },
  { label: "Laser Dentistry", abbr: "LASER" },
  { label: "CEREC Same-Day Crowns", abbr: "CEREC" },
];

export const INSTAGRAM_MOCK = [
  {
    id: "1",
    image: "/images/instagram/post-1.png",
    likes: 214,
    caption: "Behind the scenes at Dental Point — where every morning begins with purpose and precision.",
  },
  {
    id: "2",
    image: "/images/instagram/post-2.webp",
    likes: 389,
    caption: "Smile reveal day — our absolute favourite. This reaction never gets old. ✨",
  },
  {
    id: "3",
    image: "/images/instagram/post-3.png",
    likes: 467,
    caption: "Tip of the day: Oil pulling with coconut oil for 10 minutes can reduce harmful bacteria. Try it!",
  },
  {
    id: "4",
    image: "/images/instagram/post-4.png",
    likes: 156,
    caption: "Every detail at Dental Point is designed to make you feel at home from the moment you arrive.",
  },
];
