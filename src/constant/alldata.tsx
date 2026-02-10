// alldata.ts (FULL UPDATED FILE SECTION FOR HEADER + SERVICES NAV)
// ✅ CSS unchanged
// ✅ Parent service page works via "View All {Service}" inside dropdown
// ✅ Child pages use /service-detail/{serviceSlug}/{categorySlug}

import Link from "next/link";
import { IMAGES, SVGICONS } from "./theme";
import Image, { StaticImageData } from "next/image";
import { Scale, Scissors, Sparkles, Droplets } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* =========================
   HELPERS
========================= */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

/* =========================
   HEADER INFO
========================= */
export const headerinfo = [
  {
    image: IMAGES.svgicon1,
    title: "Contatc Us",
    paragraph: (
      <Link href="tel:+11234567890" className="text-secondary">
        +1 123 456 7890
      </Link>
    ),
  },
  {
    image: IMAGES.svgicon2,
    title: "Email Supports",
    paragraph: (
      <Link href="mailto:email@domain.com" className="text-secondary">
        email@domain.com
      </Link>
    ),
  },
  {
    image: IMAGES.svgicon3,
    title: "Online Appointment",
    paragraph: (
      <span>
        Book Now<i className="feather icon-arrow-right" />
      </span>
    ),
  },
  { image: IMAGES.svgicon4, title: "Supports", paragraph: "24x7 Supports" },
];

/* =========================
   TYPES
========================= */
export type HeaderContentItem = {
  title: string;
  to: string;
  image?: string | StaticImageData;
  children?: HeaderContentItem[];
};

export type HeaderItem = {
  title: string;
  to?: string;
  classChange?: string;
  content?: HeaderContentItem[];
};

/* =========================
   SERVICES (SOURCE)
========================= */
export type WorldClassItem = { title: string };

export type VideoItem = {
  id: number;
  delay: string;
  image: any; // fallback image if thumbnail fails
  videoUrl: string; // dynamic link
};

export type ServiceItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  delay: string;
  icon: LucideIcon;
  services: string[];
  image?: any;

  worldclassByCategory?: Record<string, WorldClassItem[]>;

  // ✅ NEW
  videosByCategory?: Record<string, VideoItem[]>;
};

// ✅ SAME VIDEO FOR NOW (as you asked)
const DEFAULT_YT = "https://www.youtube.com/watch?v=W5Dm2WCk8jg";

export const serviceboxdata: ServiceItem[] = [
  {
    id: 1,
    title: "Weight Loss",
    slug: "weight-loss",
    description: "Medical weight care",
    delay: "0.2s",
    icon: Scale,
    services: ["Surgical Balloon", "Smart Balloon", "Munjaro sessions", "Slimming"],
    image: IMAGES.bloggrid2,

    worldclassByCategory: {
      "surgical-balloon": [
        { title: "Initial Consultation & Eligibility Check" },
        { title: "Medical Tests & Risk Assessment" },
        { title: "Pre-procedure Preparation Guidelines" },
        { title: "Balloon Placement (Endoscopic)" },
        { title: "Nutrition Plan & Lifestyle Coaching" },
        { title: "Follow-up Visits & Progress Monitoring" },
      ],

      "smart-balloon": [
        { title: "Assessment & Personalized Plan" },
        { title: "Swallowable Balloon Procedure" },
        { title: "Diet Plan & Hydration Guidance" },
        { title: "Weekly Progress Tracking" },
        { title: "Metabolism & Habit Coaching" },
        { title: "Balloon Exit Naturally + After Plan" },
      ],

      "munjaro-sessions": [
        { title: "Doctor Consultation & Eligibility Check" },
        { title: "Baseline Measurements & Health History" },
        { title: "Dose Plan & Injection Training" },
        { title: "Side-effects Monitoring & Support" },
        { title: "Diet Routine + Lifestyle Guidance" },
        { title: "Monthly Review & Adjustments" },
      ],

      slimming: [
        { title: "Body Composition Analysis" },
        { title: "Goal Setting & Treatment Plan" },
        { title: "Session Scheduling & Preparation" },
        { title: "Non-invasive Slimming Procedure" },
        { title: "Post-session Care Instructions" },
        { title: "Follow-up & Result Tracking" },
      ],
    },

    // ✅ NEW: videosByCategory
    videosByCategory: {
      "surgical-balloon": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "smart-balloon": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "munjaro-sessions": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      slimming: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
    },
  },

  {
    id: 2,
    title: "Plastic Surgery",
    slug: "plastic-surgery",
    description: "Advanced cosmetic care",
    delay: "0.4s",
    icon: Scissors,
    services: [
      "Local anesthesia procedures",
      "Double chin",
      "Blepharoplasty",
      "Rhinoplasty",
      "Face lift",
      "Breast lift",
      "Breast implant",
      "Tummy tuck",
      "360",
      "Liposuction (Tummy, legs, hands)",
    ],
    image: IMAGES.bloggrid2,

    worldclassByCategory: {
      "local-anesthesia-procedures": [
        { title: "Consultation & Treatment Planning" },
        { title: "Pre-op Medical Evaluation" },
        { title: "Local Anesthesia Preparation" },
        { title: "Procedure With Comfort Monitoring" },
        { title: "Immediate Aftercare Guidance" },
        { title: "Follow-up & Healing Review" },
      ],

      "double-chin": [
        { title: "Facial Assessment & Goal Discussion" },
        { title: "Choose Approach (Injection / Liposuction)" },
        { title: "Pre-procedure Prep Instructions" },
        { title: "Treatment Session (Targeted Area)" },
        { title: "Recovery Support & Aftercare" },
        { title: "Result Monitoring & Touch-up Plan" },
      ],

      blepharoplasty: [
        { title: "Eye Assessment & Surgical Planning" },
        { title: "Pre-op Testing & Safety Checks" },
        { title: "Procedure Day (Upper/Lower Lids)" },
        { title: "Swelling Control & Medication Guidance" },
        { title: "Stitch Care & Follow-up Appointment" },
        { title: "Final Healing & Results Review" },
      ],

      rhinoplasty: [
        { title: "Consultation & Facial Analysis" },
        { title: "Nose Design Planning & Expectations" },
        { title: "Pre-op Instructions & Medical Testing" },
        { title: "Procedure Day & Post-op Monitoring" },
        { title: "Recovery Plan (Splint/Care Guide)" },
        { title: "Follow-ups & Outcome Review" },
      ],

      "face-lift": [
        { title: "Consultation & Skin Laxity Assessment" },
        { title: "Surgical Plan & Natural Look Design" },
        { title: "Pre-op Testing & Instructions" },
        { title: "Procedure Day & Aftercare Setup" },
        { title: "Swelling Care & Healing Monitoring" },
        { title: "Follow-up & Final Result Review" },
      ],

      "breast-lift": [
        { title: "Consultation & Measurements" },
        { title: "Lift Technique Selection" },
        { title: "Pre-op Testing & Preparation" },
        { title: "Procedure Day & Recovery Protocol" },
        { title: "Support Garment & Aftercare" },
        { title: "Follow-up & Scar Care Plan" },
      ],

      "breast-implant": [
        { title: "Consultation & Size/Shape Selection" },
        { title: "Implant Type & Placement Planning" },
        { title: "Pre-op Health Checks & Prep" },
        { title: "Procedure Day & Monitoring" },
        { title: "Recovery Plan & Activity Guidance" },
        { title: "Follow-ups & Final Review" },
      ],

      "tummy-tuck": [
        { title: "Consultation & Skin/Fat Assessment" },
        { title: "Surgical Plan & Expectation Setting" },
        { title: "Pre-op Testing & Instructions" },
        { title: "Procedure Day & Hospital/Clinic Care" },
        { title: "Compression & Recovery Guidance" },
        { title: "Follow-up & Scar Care Monitoring" },
      ],

      "360": [
        { title: "Body Analysis & Target Area Mapping" },
        { title: "Procedure Planning & Safety Checks" },
        { title: "Pre-op Instructions & Preparation" },
        { title: "Procedure Day (360 Contouring)" },
        { title: "Compression & Recovery Support" },
        { title: "Follow-up & Result Tracking" },
      ],

      // ✅ FIXED KEY: must match slugify("Liposuction (Tummy, legs, hands)")
      "liposuction-tummy-legs-hands": [
        { title: "Consultation & Target Area Planning" },
        { title: "Pre-op Tests & Medical Clearance" },
        { title: "Procedure Day (Precision Fat Removal)" },
        { title: "Swelling Control & Aftercare" },
        { title: "Compression & Recovery Instructions" },
        { title: "Follow-up & Final Result Review" },
      ],
    },

    videosByCategory: {
      "local-anesthesia-procedures": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "double-chin": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      blepharoplasty: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      rhinoplasty: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "face-lift": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "breast-lift": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "breast-implant": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "tummy-tuck": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "360": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "liposuction-tummy-legs-hands": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
    },
  },

  {
    id: 3,
    title: "Derma",
    slug: "derma",
    description: "Healthy glowing skin",
    delay: "0.6s",
    icon: Sparkles,
    services: [
      "Body filler",
      "Sculptra",
      "Olidia",
      "Exosome",
      "Peeling",
      "Lip filler",
      "Under eye",
      "Botox face",
      "Under arms",
      "Rejuvenation PRP",
      "Meso",
      "Skin booster",
      "Profhilo",
      "Jalupro",
    ],
    image: IMAGES.bloggrid2,

    worldclassByCategory: {
      "body-filler": [
        { title: "Consultation & Area Assessment" },
        { title: "Treatment Planning & Safety Checks" },
        { title: "Pre-treatment Preparation" },
        { title: "Filler Application (Targeted Areas)" },
        { title: "Aftercare & Swelling Guidance" },
        { title: "Follow-up & Results Review" },
      ],

      sculptra: [
        { title: "Skin Assessment & Volume Planning" },
        { title: "Session Plan (Multiple Treatments)" },
        { title: "Preparation & Patch/Safety Check" },
        { title: "Injection Session & Comfort Care" },
        { title: "Massage/Aftercare Instructions" },
        { title: "Follow-up & Progress Tracking" },
      ],

      olidia: [
        { title: "Consultation & Skin Evaluation" },
        { title: "Goal Setting & Treatment Mapping" },
        { title: "Preparation & Cleansing" },
        { title: "Procedure / Application Session" },
        { title: "Aftercare & Protection Guidance" },
        { title: "Follow-up & Results Review" },
      ],

      exosome: [
        { title: "Consultation & Skin Needs Analysis" },
        { title: "Treatment Plan (Sessions + Timeline)" },
        { title: "Skin Prep & Procedure Readiness" },
        { title: "Application / Delivery Session" },
        { title: "Aftercare & Recovery Support" },
        { title: "Follow-up & Outcome Monitoring" },
      ],

      peeling: [
        { title: "Skin Assessment & Peel Selection" },
        { title: "Cleansing & Skin Preparation" },
        { title: "Peel Application (Controlled Timing)" },
        { title: "Soothing & Neutralization Step" },
        { title: "Aftercare Guidance (Sun Protection)" },
        { title: "Follow-up Session (If Needed)" },
      ],

      "lip-filler": [
        { title: "Consultation & Lip Shape Planning" },
        { title: "Pre-treatment Prep & Numbing" },
        { title: "Precise Filler Injection" },
        { title: "Swelling Care & Aftercare Tips" },
        { title: "Symmetry Check & Adjustments" },
        { title: "Follow-up & Final Review" },
      ],

      "under-eye": [
        { title: "Assessment (Hollows / Dark Circles)" },
        { title: "Choose Approach (Filler / PRP)" },
        { title: "Preparation & Numbing" },
        { title: "Treatment Session (Delicate Area)" },
        { title: "Aftercare & Swelling Control" },
        { title: "Follow-up & Results Review" },
      ],

      "botox-face": [
        { title: "Facial Muscle Assessment" },
        { title: "Treatment Plan & Dose Mapping" },
        { title: "Preparation & Cleansing" },
        { title: "Botox Injection Session" },
        { title: "Aftercare Instructions (Do/Don’t)" },
        { title: "Follow-up & Touch-up (If Needed)" },
      ],

      "under-arms": [
        { title: "Assessment & Goal Discussion" },
        { title: "Choose Treatment (Botox / Laser etc.)" },
        { title: "Preparation & Cleaning" },
        { title: "Procedure Session" },
        { title: "Aftercare Guidance" },
        { title: "Follow-up & Progress Tracking" },
      ],

      "rejuvenation-prp": [
        { title: "Consultation & Skin Assessment" },
        { title: "Blood Draw & PRP Preparation" },
        { title: "Skin Prep & Numbing" },
        { title: "PRP Application / Micro-needling" },
        { title: "Aftercare & Recovery Support" },
        { title: "Follow-up & Results Review" },
      ],

      meso: [
        { title: "Consultation & Skin Goals Review" },
        { title: "Serum Selection & Treatment Plan" },
        { title: "Preparation & Numbing (If Needed)" },
        { title: "Mesotherapy Session" },
        { title: "Aftercare & Hydration Guidance" },
        { title: "Follow-up & Ongoing Plan" },
      ],

      "skin-booster": [
        { title: "Skin Assessment & Booster Selection" },
        { title: "Treatment Plan & Session Scheduling" },
        { title: "Preparation & Cleansing" },
        { title: "Booster Injection Session" },
        { title: "Aftercare & Glow Maintenance" },
        { title: "Follow-up & Review" },
      ],

      profhilo: [
        { title: "Consultation & Suitability Assessment" },
        { title: "Injection Points Planning" },
        { title: "Skin Preparation" },
        { title: "Profhilo Injection Session" },
        { title: "Aftercare & Hydration Support" },
        { title: "Follow-up & Second Session Plan" },
      ],

      jalupro: [
        { title: "Consultation & Skin Quality Review" },
        { title: "Treatment Mapping & Plan" },
        { title: "Preparation & Cleansing" },
        { title: "Jalupro Injection Session" },
        { title: "Aftercare & Skin Support" },
        { title: "Follow-up & Results Review" },
      ],
    },

    videosByCategory: {
      "body-filler": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      sculptra: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      olidia: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      exosome: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      peeling: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "lip-filler": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "under-eye": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "botox-face": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "under-arms": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "rejuvenation-prp": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      meso: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "skin-booster": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      profhilo: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      jalupro: [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
    },
  },

  {
    id: 4,
    title: "Hair Treatment",
    slug: "hair-treatment",
    description: "Hair growth solutions",
    delay: "0.8s",
    icon: Droplets,
    services: ["Hair transplant", "Beard transplant", "Eyebrow transplant"],
    image: IMAGES.bloggrid2,

    worldclassByCategory: {
      "hair-transplant": [
        { title: "Consultation & Donor Area Assessment" },
        { title: "Hairline Design & Planning" },
        { title: "Pre-op Instructions & Preparation" },
        { title: "Extraction & Implantation Procedure" },
        { title: "Recovery & Aftercare Guidance" },
        { title: "Growth Monitoring & Follow-ups" },
      ],

      "beard-transplant": [
        { title: "Consultation & Beard Design Planning" },
        { title: "Donor Area Assessment" },
        { title: "Pre-op Preparation & Instructions" },
        { title: "Extraction & Implantation Procedure" },
        { title: "Aftercare & Healing Support" },
        { title: "Follow-up & Growth Monitoring" },
      ],

      "eyebrow-transplant": [
        { title: "Consultation & Brow Shape Design" },
        { title: "Donor Hair Selection & Mapping" },
        { title: "Pre-op Preparation & Instructions" },
        { title: "Precision Implantation Procedure" },
        { title: "Aftercare & Healing Guidance" },
        { title: "Follow-up & Final Result Review" },
      ],
    },

    videosByCategory: {
      "hair-transplant": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "beard-transplant": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
      "eyebrow-transplant": [{ id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT }],
    },
  },
];

/* =========================
   ✅ SERVICES AS TOP NAV ITEMS
========================= */
const servicesTopNav: HeaderItem[] = serviceboxdata.map((s) => {
  const parentUrl = `/service-detail/${s.slug}`;

  return {
    title: s.title,
    classChange: "sub-menu-down",
    content: [
      { title: `View All ${s.title}`, to: parentUrl },
      ...s.services.map((cat) => ({
        title: cat,
        to: `/service-detail/${s.slug}/${slugify(cat)}`,
      })),
    ],
  };
});

/* =========================
   HEADER DATA
========================= */
export const headerdata: HeaderItem[] = [
  { title: "Home", to: "/" },
  { title: "About Us", to: "/about-us" },

  {
    title: "Team",
    classChange: "sub-menu-down",
    content: [
      { title: "Team", to: "/team" },
      { title: "Team Detail", to: "/team-detail" },
    ],
  },

  { title: "Gallery", to: "/gallery" },

  ...servicesTopNav,

  {
    title: "Blogs",
    classChange: "sub-menu-down",
    content: [
      { title: "Blog Grid", to: "/blog-grid" },
      { title: "Blog List Sidebar", to: "/blog-list-sidebar" },
    ],
  },

  { title: "Contact Us", to: "/contact-us" },
];

/* =========================
   FOOTER
========================= */
export const footerdata1 = [
  {
    delay: "0.4s",
    icon: <i className="feather icon-phone" />,
    title: "Call Us",
    paragraph: (
      <Link href="tel:+11234567890" className="text-body">
        +1 123 456 7890
      </Link>
    ),
  },
  {
    delay: "0.6s",
    icon: <i className="feather icon-mail" />,
    title: "Send us a Mail",
    paragraph: (
      <Link href="mailto:info@example.com" className="text-body">
        info@example.com
      </Link>
    ),
  },
  {
    delay: "0.8s",
    icon: <i className="feather icon-clock" />,
    title: "Opening Time",
    paragraph: "Mon -Sat: 7:00 - 17:00",
  },
];

export const footerdata = [
  {
    title: "Our Services",
    items: [
      { label: "Emergency Care", link: "/service-detail" },
      { label: "Operation Theater", link: "/service-detail" },
      { label: "Medical Checkup", link: "/service-detail" },
      { label: "Diagnostic Center", link: "/service-detail" },
      { label: "Outdoor Checkup", link: "/service-detail" },
    ],
    delay: "0.4s",
  },
  {
    title: "Useful Links",
    items: [
      { label: "Privacy Policy", link: "#" },
      { label: "Terms & Conditions", link: "#" },
      { label: "Contact Us", link: "/contact-us" },
      { label: "Latest News", link: "/blog-grid" },
      { label: "Our Sitemap", link: "#" },
    ],
    delay: "0.6s",
  },
  {
    title: "Quick Links",
    items: [
      { label: "About Us", link: "/about-us" },
      { label: "Our Services", link: "/services" },
      { label: "Our Team", link: "/team" },
      { label: "Appointments", link: "/appointment" },
      { label: "Contact Us", link: "/contact-us" },
    ],
    delay: "1.0s",
  },
  {
    title: "Our Contacts",
    items: [
      {
        icon: <i className="feather icon-map-pin" />,
        label: (
          <>
            123 Medical Street,
            <br />
            New York, NY 10001
          </>
        ),
      },
      {
        icon: <i className="feather icon-phone" />,
        label: (
          <Link href="tel:+11234567890" className="text-body">
            +1 123 456 7890
          </Link>
        ),
      },
      {
        icon: <i className="feather icon-mail" />,
        label: (
          <Link href="mailto:info@example.com" className="text-body">
            info@example.com
          </Link>
        ),
      },
      {
        icon: <i className="feather icon-clock" />,
        label: "Mon – Sat: 7:00 AM – 5:00 PM",
      },
    ],
    delay: "1.2s",
  },
];

/* =========================
   PAGES - TESTIMONIAL
========================= */
export const testidata = [
  { treat: "Optimal Treatment", delay: "0.2s", title: "Kenneth Fong", position: "Patient", image: IMAGES.testimonial2 },
  { treat: "Best Treatment", delay: "0.4s", title: "Danial Frankie", position: "Patient", image: IMAGES.testimonial3 },
  { treat: "Recommended Care", delay: "0.6s", title: "Rihana Roy", position: "Patient", image: IMAGES.testimonial4 },
  { treat: "First-Class Treatment", delay: "0.8s", title: "Kenneth Fong", position: "Patient", image: IMAGES.testimonial5 },
];

export const testiswipeerdata2 = [
  { image: IMAGES.testimonialsmall1, name: "Danial Frankie" },
  { image: IMAGES.testimonialsmall2, name: "Esteban Serrano" },
  { image: IMAGES.testimonialsmall3, name: "Rihana Roy" },
];

export interface BlogItem {
  image: any;
  dealy: string;
  title: string;
}

/* =========================
   BLOG
========================= */
export const blogdata: BlogItem[] = [
  { image: IMAGES.blogoverlaylarge1, dealy: "0.1s", title: "The Art of Managing Business and Patient Care." },
  { image: IMAGES.blogoverlaylarge2, dealy: "0.2s", title: "Successful Transitional Rehab: More Than Just Exercise" },
  { image: IMAGES.blogoverlaylarge3, dealy: "0.3s", title: "What is Respite Care and Why is it Important?" },
  { image: IMAGES.blogoverlaylarge4, dealy: "0.4s", title: "The Art of Managing Business and Patient Care" },
  { image: IMAGES.blogoverlaylarge5, dealy: "0.5s", title: "Three Years Post Injury: Persistence and Progress" },
  { image: IMAGES.blogoverlaylarge6, dealy: "0.6s", title: "How Transitional Rehabilitation Aids in Stroke Recovery" },
];

export const blogdata2 = [
  { image: IMAGES.bloggrid1, dealy: "0.1s", title: "The Art of Managing Business and Patient Care." },
  { image: IMAGES.bloggrid2, dealy: "0.2s", title: "Successful Transitional Rehab: More Than Just Exercise" },
  { image: IMAGES.bloggrid3, dealy: "0.3s", title: "What is Respite Care and Why is it Important?" },
  { image: IMAGES.bloggrid4, dealy: "0.4s", title: "The Art of Managing Business and Patient Care" },
  { image: IMAGES.bloggrid5, dealy: "0.5s", title: "Three Years Post Injury: Persistence and Progress" },
  { image: IMAGES.bloggrid6, dealy: "0.6s", title: "How Transitional Rehabilitation Aids in Stroke Recovery" },
];

/* =========================
   OTHER DATA (unchanged)
========================= */
export const servicedetails = [
  { columnstand: "active", title: "Angioplasty" },
  { title: "Cardiology" },
  { title: "Dental" },
  { title: "Endocrinology" },
  { title: "Eye Care" },
  { title: "Neurology" },
  { title: "Orthopedics" },
  { title: "RMI" },
];

export const serviceCategoryMap = [
  { title: "Hair", category: "hair", prompt: "add short, natural-looking scalp hair while keeping the face, skin tone, and background unchanged." },
  { title: "Beard", category: "beard", prompt: "add a natural-looking beard or light stubble while keeping facial shape and skin tone realistic." },
  { title: "Skin", category: "skin", prompt: "smooth facial skin by reducing wrinkles and fine lines while keeping a natural appearance." },
  { title: "Teeth", category: "teeth", prompt: "make the teeth look cleaner, whiter, and slightly more aligned while staying natural." },
  { title: "Eyes", category: "eyes", prompt: "reduce dark circles and tiredness around the eyes while keeping them natural and realistic." },
];

export const aiServicedetails = [
  { columnstand: "active", title: "Hair" },
  { title: "Beard" },
  { title: "Skin" },
  { title: "Teeth" },
  { title: "Eyes" },
];

export const empolydata = [
  { id: 1, delay: "0.2s", image: IMAGES.team1, title: "Nashid Martines", position: "Cardiac Surgery" },
  { id: 2, delay: "0.4s", image: IMAGES.team2, title: "Emilio Duarte", position: "Pediatric Clinic" },
  { id: 3, delay: "0.6s", image: IMAGES.team3, title: "Rihana Roy", position: "Gynecology" },
  { id: 4, delay: "0.8s", image: IMAGES.team4, title: "Esteban Serrano", position: "Neurology" },
  { id: 5, delay: "1.0s", image: IMAGES.team1, title: "Santiago Rivas", position: "Cardiac Surgery" },
  { id: 6, delay: "1.2s", image: IMAGES.team2, title: "Danial Frankie", position: "Pediatric Clinic" },
  { id: 7, delay: "1.4s", image: IMAGES.team3, title: "Roman Petrov", position: "Gynecology" },
  { id: 8, delay: "1.6s", image: IMAGES.team4, title: "Kenneth Fong", position: "Neurology" },
];

// ✅ Keep this old one as fallback default gallery/videos page etc.
export const teamVideos = [
  { id: 1, delay: "0.2s", image: IMAGES.team1, videoUrl: DEFAULT_YT },
  { id: 2, delay: "0.4s", image: IMAGES.team2, videoUrl: DEFAULT_YT },
  { id: 3, delay: "0.6s", image: IMAGES.team3, videoUrl: DEFAULT_YT },
];

export const locationdata = [
  { delay: "0.2s", title: "United State" },
  { delay: "0.4s", title: "Canada" },
];

export const awardswiperdata = [
  { image: IMAGES.logo1 },
  { image: IMAGES.logo2 },
  { image: IMAGES.logo3 },
  { image: IMAGES.logo1 },
  { image: IMAGES.logo2 },
  { image: IMAGES.logo3 },
];

export const awarddata = [
  { delay: "0.5s", title: "2024" },
  { delay: "0.6s", title: "2023" },
  { delay: "0.7s", title: "2022" },
  { delay: "0.8s", title: "2021" },
  { delay: "0.9s", title: "2020" },
  { delay: "1.0s", title: "2019" },
  { delay: "1.1s", title: "View All" },
];

export const clientswiperdata1 = [
  { image: IMAGES.logomiddle1, delay: "0.1s" },
  { image: IMAGES.logomiddle2, delay: "0.2s" },
  { image: IMAGES.logomiddle3, delay: "0.3s" },
  { image: IMAGES.logomiddle4, delay: "0.4s" },
  { image: IMAGES.logomiddle1, delay: "0.5s" },
  { image: IMAGES.logomiddle2, delay: "0.6s" },
  { image: IMAGES.logomiddle3, delay: "0.7s" },
  { image: IMAGES.logomiddle4, delay: "0.8s" },
];

export const clientswiperdata2 = [
  { image: IMAGES.logosmall1, delay: "0.1s" },
  { image: IMAGES.logosmall2, delay: "0.2s" },
  { image: IMAGES.logosmall3, delay: "0.3s" },
  { image: IMAGES.logosmall4, delay: "0.4s" },
  { image: IMAGES.logosmall5, delay: "0.5s" },
  { image: IMAGES.logosmall6, delay: "0.6s" },
  { image: IMAGES.logosmall1, delay: "0.7s" },
  { image: IMAGES.logosmall2, delay: "0.8s" },
  { image: IMAGES.logosmall3, delay: "0.9s" },
  { image: IMAGES.logosmall4, delay: "1.0s" },
  { image: IMAGES.logosmall5, delay: "1.1s" },
  { image: IMAGES.logosmall6, delay: "1.2s" },
];

export const countupdata = [
  { title: "Specialists", delay: "0.4s", countup: 200, span: "+" },
  { title: "Happy Patients", delay: "0.6s", countup: 45, span: "K" },
  { title: "Winning Awards", delay: "0.8s", countup: 150, span: "+" },
];

export const accordiondata = [
  { delay: "0.5s", key: "0", title: "How much do you charge for pedicure ?" },
  { delay: "0.6s", key: "1", title: "What types of treatments do you offer?" },
  { delay: "0.7s", key: "2", title: "How do i book my appointment ?" },
  { delay: "0.8s", key: "3", title: "Can i cancel my appointment ?" },
];

export const howitworkdata = [
  { delay: "0.2s", icon: <i className="feather icon-clock" />, title: "Book an Appointment" },
  { delay: "0.4s", icon: <i className="flaticon-list" />, title: "Conduct Checkup" },
  { delay: "0.6s", icon: <i className="flaticon-stethoscope" />, title: "Perform Treatment" },
  { delay: "0.8s", icon: <i className="flaticon-hand-holding-usd" />, title: "Prescribe & Payment" },
];

export const inspirationaldata = [
  { columnstand: "m-r25", delay: "0.2s", title: "Mission", svg: SVGICONS.mission },
  { columnstand: "m-l25", delay: "0.4s", title: "Vision", svg: SVGICONS.vision },
  { columnstand: "m-r25", delay: "0.6s", title: "Values", svg: SVGICONS.values },
];

export const mapdata = [
  { id: 1, delay: "0.2s", icon: <i className="feather icon-map-pin" />, title: "Address", para: <p>234 Oak Drive, Villagetown, USA</p> },
  { id: 2, delay: "0.4s", icon: <i className="feather icon-phone" />, title: "Call Us", para: <p><Link href="tel:+11234567890">+1 123 456 7890</Link></p> },
  { id: 3, delay: "0.6s", icon: <i className="feather icon-mail" />, title: "Send us a Mail", para: <p><Link href="mailto:info@example.com">email@domain.com</Link></p> },
  { id: 4, delay: "0.8s", icon: <i className="feather icon-clock" />, title: "Opening Time", para: <p>Mon-Thu: 8:00am-5:00pm <br /> Fri: 8:00am-1:00pm</p> },
];

export const meetdrdata1 = [
  { title: "Radiant Skin Dermatology" },
  { title: "Laser Resurfacing" },
  { title: "Flawless Dermatology" },
  { title: "Refined Skin Dermatology" },
  { title: "Luminous Dermatology" },
  { title: "Anti Aging" },
];

export const meetdrdata2 = [{ image: IMAGES.logo1 }, { image: IMAGES.logo2 }];

export const pricingdata1 = [
  { title: "Cardiovascular Services" },
  { title: "Weight Management" },
  { title: "Dental Services" },
  { title: "Women\'s Health" },
  { title: "Emergency Medicine" },
  { title: "Family Medicine" },
  { title: "24/7 customer support" },
  { title: "Video Call Support" },
];

export const pricingdata2 = [
  {
    delay: "0.4s",
    title: (
      <h2 className="pricingtable-bx">
        Free<small>/ Lifetime</small>
      </h2>
    ),
    feature: (
      <ul className="pricingtable-features">
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li className="disable"><Image src={IMAGES.Check} alt="" /></li>
        <li className="disable"><Image src={IMAGES.Check} alt="" /></li>
        <li className="disable"><Image src={IMAGES.Check} alt="" /></li>
        <li className="disable"><Image src={IMAGES.Check} alt="" /></li>
        <li className="disable"><Image src={IMAGES.Check} alt="" /></li>
      </ul>
    ),
  },
  {
    delay: "0.6s",
    coloumnstand: "active",
    title: (
      <h2 className="pricingtable-bx">
        $25<small>/ Month</small>
      </h2>
    ),
    feature: (
      <ul className="pricingtable-features">
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li className="disable"><Image src={IMAGES.Check} alt="" /></li>
        <li className="disable"><Image src={IMAGES.Check} alt="" /></li>
        <li className="disable"><Image src={IMAGES.Check} alt="" /></li>
      </ul>
    ),
  },
  {
    delay: "0.8s",
    title: (
      <h2 className="pricingtable-bx">
        $40<small>/ Month</small>
      </h2>
    ),
    feature: (
      <ul className="pricingtable-features">
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
        <li><Image src={IMAGES.Check} alt="" /></li>
      </ul>
    ),
  },
];

export const testiswipeerdata = [
  { image: IMAGES.testimonial1, name: "Tariq Najeeb" },
  { image: IMAGES.testimonial2, name: "Nasir Qadiri" },
  { image: IMAGES.testimonial3, name: "Faisal Darwish" },
];

export const tagdata = [
  { title: "Acupressure", num: "(10)" },
  { title: "Allgemein", num: "(5)" },
  { title: "Blood", num: "(17)" },
  { title: "Food", num: "(13)" },
  { title: "Health", num: "(06)" },
  { title: "Mental Health", num: "(17)" },
  { title: "Therapy", num: "(13)" },
  { title: "Walking", num: "(06)" },
];

export const sidebarpostdata = [
  { date: "10 June 2025", image: IMAGES.blogsmall1, title: "The Art of Managing Business and Patient Care" },
  { date: "13 June 2025", image: IMAGES.blogsmall2, title: "The New Face of Care Blending Empathy with Expertise" },
  { date: "17 June 2025", image: IMAGES.blogsmall3, title: "Here Care Expertise Elevating the Patient Experience" },
];

export const whychoosedata = [
  { delay: "0.4s", title: "More Experience" },
  { delay: "0.6s", title: "Seamless care" },
  { delay: "0.8s", title: "The right answers?" },
  { delay: "1.0s", title: "Unparalleled expertise" },
];

export const gallerydata = [
  { id: 1, image: IMAGES.bloggrid1, title: "Project 1", category: "Cardiology" },
  { id: 2, image: IMAGES.bloggrid2, title: "Project 2", category: "Dental" },
  { id: 3, image: IMAGES.bloggrid3, title: "Project 3", category: "Neurology" },
  { id: 4, image: IMAGES.bloggrid4, title: "Project 4", category: "Surgery" },
  { id: 5, image: IMAGES.bloggrid5, title: "Project 5", category: "Medical" },
  { id: 6, image: IMAGES.bloggrid6, title: "Project 6", category: "Orthopedics" },
];

// ✅ Default list for Home page WorldClass section
export const worldclasslistdata: WorldClassItem[] = [
  { title: "Comprehensive Specialties" },
  { title: "Research and Development" },
  { title: "Emergency Services" },
  { title: "Advanced Imaging Services" },
  { title: "Intensive Care Units (ICUs)" },
  { title: "Rehabilitation Services" },
  { title: "Telemedicine Facilities" },
  { title: "Patient-Centric Approach" },
  { title: "Multidisciplinary Team" },
  { title: "Health Information Technology" },
];
