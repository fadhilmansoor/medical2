"use client";

import Link from "next/link";
import { useEffect } from "react";
import { serviceboxdata } from "@/constant/alldata";
import {
  Scale,
  Pill,
  Syringe,
  Activity,
  Scissors,
  Eye,
  Wind,
  Heart,
  Maximize2,
  Navigation,
  Droplet,
  Fingerprint,
  Sparkles,
  Layers,
  Dna,
  Leaf,
  Smile,
  Sun,
  Zap,
  Hand,
  Droplets,
  Wand2,
  Star,
  Gem,
  ScanFace,
  UserCircle2,
  Microscope,
} from "lucide-react";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

/** ✅ Icon picker */
const getClinicIcon = (title: string, defaultIcon: any) => {
  const lower = title.toLowerCase();

  // WEIGHT LOSS
  if (lower.includes("surgical balloon")) return Microscope;
  if (lower.includes("smart balloon")) return Pill;
  if (lower.includes("munjaro")) return Syringe;
  if (lower.includes("slimming")) return Activity;
  if (lower.includes("weight loss")) return Scale;

  // PLASTIC SURGERY
  if (lower.includes("local anesthesia")) return Syringe;
  if (lower.includes("double chin")) return ScanFace;
  if (lower.includes("blepharoplasty")) return Eye;
  if (lower.includes("rhinoplasty")) return Wind;
  if (lower.includes("face lift")) return UserCircle2;
  if (lower.includes("breast lift")) return Heart;
  if (lower.includes("breast implant")) return Heart;
  if (lower.includes("tummy tuck")) return Maximize2;
  if (lower.includes("360")) return Navigation;
  if (lower.includes("liposuction")) return Droplet;
  if (lower.includes("plastic surgery")) return Scissors;

  // DERMA
  if (lower.includes("body filler")) return Fingerprint;
  if (lower.includes("sculptra")) return Layers;
  if (lower.includes("olidia")) return Gem;
  if (lower.includes("exosome")) return Dna;
  if (lower.includes("peeling")) return Leaf;
  if (lower.includes("lip filler")) return Smile;
  if (lower.includes("under eye")) return Eye;
  if (lower.includes("botox")) return Zap;
  if (lower.includes("under arms")) return Hand;
  if (lower.includes("rejuvenation") || lower.includes("prp")) return Sun;
  if (lower.includes("meso")) return Droplets;
  if (lower.includes("skin booster")) return Sparkles;
  if (lower.includes("profhilo")) return Wand2;
  if (lower.includes("jalupro")) return Star;
  if (lower.includes("derma")) return Sparkles;

  // HAIR
  if (lower.includes("hair transplant")) return Scissors;
  if (lower.includes("beard transplant")) return ScanFace;
  if (lower.includes("eyebrow transplant")) return Eye;
  if (lower.includes("hair treatment")) return Scissors;

  return defaultIcon;
};

/** ✅ Descriptions (only for categories now) */
const getDescription = (title: string): string => {
  const lower = title.toLowerCase();

  if (lower.includes("surgical balloon"))
    return "Endoscopic gastric balloon placement to support weight reduction under ongoing medical supervision.";
  if (lower.includes("smart balloon"))
    return "Swallowable balloon option designed for weight loss without surgery or endoscopy-based procedures.";
  if (lower.includes("munjaro"))
    return "Clinician-prescribed injectable therapy to support appetite control and sustainable weight goals.";
  if (lower.includes("slimming"))
    return "Non-surgical contouring to reduce stubborn fat and improve overall body silhouette safely.";

  if (lower.includes("local anesthesia"))
    return "Comfort-focused procedures under local anesthesia with careful monitoring and minimal downtime planning.";
  if (lower.includes("double chin"))
    return "Targeted reduction of submental fat to refine jawline definition and neck profile balance.";
  if (lower.includes("blepharoplasty"))
    return "Eyelid rejuvenation to remove excess skin and refresh eye appearance with natural results.";
  if (lower.includes("rhinoplasty"))
    return "Nose reshaping to improve facial harmony while supporting airflow and breathing comfort.";
  if (lower.includes("face lift"))
    return "Facelift surgery to lift sagging skin and restore youthful facial contours with precision.";
  if (lower.includes("breast lift"))
    return "Breast lift to elevate shape and improve firmness with balanced, natural proportions.";
  if (lower.includes("breast implant"))
    return "Breast augmentation with implants to enhance volume, symmetry, and desired profile safely.";
  if (lower.includes("tummy tuck"))
    return "Abdominoplasty to remove excess skin and tighten core structures for a flatter abdomen.";
  if (lower.includes("360"))
    return "Comprehensive 360 contouring for balanced shaping across waistline, back, and hip areas.";
  if (lower.includes("liposuction"))
    return "Precision liposuction to remove fat deposits and sculpt smoother body lines carefully.";

  if (lower.includes("body filler"))
    return "Body filler treatment for contour support and natural-looking volume enhancement over time.";
  if (lower.includes("sculptra"))
    return "Collagen-stimulator injections for gradual volume restoration and improved skin texture quality.";
  if (lower.includes("olidia"))
    return "Premium dermal filler designed for smooth integration and subtle, refined enhancement results.";
  if (lower.includes("exosome"))
    return "Regenerative therapy supporting cellular renewal to improve skin quality and visible radiance.";
  if (lower.includes("peeling"))
    return "Medical peel to brighten tone, refine texture, and reduce fine lines with controlled exfoliation.";
  if (lower.includes("lip filler"))
    return "Hyaluronic acid lip filler for added volume, improved shape, and hydration support.";
  if (lower.includes("under eye"))
    return "Under-eye filler to soften hollows, reduce shadows, and refresh tired-looking appearance.";
  if (lower.includes("botox"))
    return "Botulinum injections to smooth expression lines and support wrinkle prevention over time.";
  if (lower.includes("under arms"))
    return "Hyperhidrosis treatment to reduce underarm sweating and improve daily comfort discreetly.";
  if (lower.includes("rejuvenation") || lower.includes("prp"))
    return "PRP rejuvenation using growth factors to support repair, glow, and healthier tone.";
  if (lower.includes("meso"))
    return "Mesotherapy microinjections delivering vitamins to hydrate skin and improve radiance visibly.";
  if (lower.includes("skin booster"))
    return "Skin boosters for deep hydration, elasticity support, and a naturally radiant finish.";
  if (lower.includes("profhilo"))
    return "Bio-remodeling injectable to improve laxity, hydration, and overall skin firmness safely.";
  if (lower.includes("jalupro"))
    return "Amino-acid complex injections to revitalize skin and support collagen production effectively.";

  if (lower.includes("hair transplant"))
    return "Hair transplant procedure using grafts to restore density and natural hairline design.";
  if (lower.includes("beard transplant"))
    return "Beard transplant to improve density, pattern coverage, and facial hair definition naturally.";
  if (lower.includes("eyebrow transplant"))
    return "Eyebrow transplant using grafts to rebuild shape and achieve fuller brow appearance.";

  return "Evidence-based care plan with clear guidance, safety checks, and follow-up support included.";
};

type FlatItem = {
  key: string;
  title: string;
  description: string;
  href: string;
  Icon: any;
};

export default function ServicesAll() {
  // ✅ Load CSS from /public ONLY on this page
  useEffect(() => {
    const id = "serviceall-page-css";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "/assets/css/serviceall.module.css"; // ✅ correct
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  // ✅ ONLY categories (no parent services)
  const flatItems: FlatItem[] = serviceboxdata.flatMap((service) => {
    return service.services.map((cat) => {
      const catSlug = slugify(cat);

      return {
        key: `cat-${service.slug}-${catSlug}`,
        title: cat,
        description: getDescription(cat),
        href: `/service-detail/${service.slug}/${catSlug}`, // change to /service if you want
        Icon: getClinicIcon(cat, service.icon),
      };
    });
  });

  return (
    <div className="services-premium-wrap">
      <div className="services-premium-grid">
        {flatItems.map((item) => {
          const Icon = item.Icon;

          return (
            <Link key={item.key} href={item.href} className="services-premium-card">
              <div className="services-premium-icon-wrap">
                <Icon className="services-premium-icon" size={30} strokeWidth={2.2} />
              </div>

              <div className="services-premium-content">
                <h3 className="services-premium-title">{item.title}</h3>
                <p className="services-premium-desc">{item.description}</p>
              </div>

              <div className="services-premium-arrow">
                <i className="feather icon-arrow-right" />
              </div>

              <div className="services-premium-shine" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
