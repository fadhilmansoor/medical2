"use client";

import Link from "next/link";
import { serviceboxdata } from "@/constant/alldata";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

type FlatItem = {
  key: string;
  title: string;
  href: string;
  Icon: any;
  isParent: boolean; // ✅ Track if it's a service or category
  serviceTitle?: string; // ✅ For categories, show parent service
};

export default function ServicesAll() {
  // ✅ Flatten: Service title box + each category box
  const flatItems: FlatItem[] = serviceboxdata.flatMap((service) => {
    const Icon = service.icon;

    const serviceBox: FlatItem = {
      key: `service-${service.id}`,
      title: service.title,
      href: `/service-detail/${service.slug}`,
      Icon,
      isParent: true,
    };

    const categoryBoxes: FlatItem[] = service.services.map((cat) => {
      const catSlug = slugify(cat);
      return {
        key: `cat-${service.slug}-${catSlug}`,
        title: cat,
        href: `/service-detail/${service.slug}/${catSlug}`,
        Icon,
        isParent: false,
        serviceTitle: service.title,
      };
    });

    return [serviceBox, ...categoryBoxes];
  });

  return (
    <div className="services-modern-wrap">
      <div className="services-modern-grid">
        {flatItems.map((item) => {
          const Icon = item.Icon;
          return (
            <Link 
              key={item.key} 
              href={item.href} 
              className={`services-modern-card ${item.isParent ? 'is-parent' : ''}`}
            >
              {/* Icon with gradient background */}
              <div className="services-modern-icon-wrap">
                <Icon className="services-modern-icon" size={28} strokeWidth={2.2} />
              </div>

              {/* Content */}
              <div className="services-modern-content">
                <h3 className="services-modern-title">{item.title}</h3>
                {!item.isParent && item.serviceTitle && (
                  <span className="services-modern-subtitle">{item.serviceTitle}</span>
                )}
              </div>

              {/* Arrow with smooth animation */}
              <div className="services-modern-arrow">
                <i className="feather icon-arrow-right" />
              </div>

              {/* Gradient overlay on hover */}
              <div className="services-modern-gradient" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}


// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { serviceboxdata } from "@/constant/alldata";

// // same slugify
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .trim()
//     .replace(/&/g, "and")
//     .replace(/[()]/g, "")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/-+/g, "-")
//     .replace(/^-|-$/g, "");

// type FlatBox = {
//   key: string;
//   title: string;
//   description?: string;
//   href: string;
//   Icon: any;
//   delay?: string;
// };

// export default function ServiceBoxAll() {
//   const router = useRouter();

//   // ✅ Flatten services + categories into ONE list of boxes
//   const flatItems: FlatBox[] = useMemo(() => {
//     return serviceboxdata.flatMap((service) => {
//       const Icon = service.icon;

//       const serviceBox: FlatBox = {
//         key: `service-${service.id}`,
//         title: service.title,
//         description: service.description, // keep service desc
//         href: `/service-detail/${service.slug}`,
//         Icon,
//         delay: service.delay,
//       };

//       const categoryBoxes: FlatBox[] = service.services.map((cat) => {
//         const catSlug = slugify(cat);
//         return {
//           key: `cat-${service.slug}-${catSlug}`,
//           title: cat,
//           description: "", // ✅ category box: no extra text
//           href: `/service-detail/${service.slug}/${catSlug}`,
//           Icon, // ✅ keep same icon style
//           delay: service.delay,
//         };
//       });

//       return [serviceBox, ...categoryBoxes];
//     });
//   }, []);

//   const [active, setActive] = useState<string>(flatItems[0]?.key || "");

//   return (
//     <div className="row service-box-container">
//       {flatItems.map((item) => {
//         const isActive = active === item.key;
//         const Icon = item.Icon;

//         return (
//           <div
//             key={item.key}
//             className="col-xl-3 col-lg-4 col-md-6 m-b30 wow fadeInUp"
//             data-wow-delay={item.delay || "0.1s"}
//             data-wow-duration="0.8s"
//           >
//             <div
//               className={`icon-bx-wraper style-3 box-hover ${
//                 isActive ? "active" : ""
//               }`}
//               onMouseEnter={() => setActive(item.key)}
//               onClick={() => router.push(item.href)}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   router.push(item.href);
//                 }
//               }}
//             >
//               <div className="icon-bx-head">
//                 <div className="icon-content">
//                   <div className="d-flex align-items-center gap-3">
//                     <div className="icon-bx">
//                       <span className="icon-cell">
//                         <Icon size={36} strokeWidth={2.5} />
//                       </span>
//                     </div>

//                     <h3 className="dz-title mb-0" style={{ fontWeight: 700 }}>
//                       {item.title}
//                     </h3>
//                   </div>

//                   {/* ✅ show description ONLY if exists (services), categories remain clean */}
//                   {item.description ? (
//                     <p className="mt-3 text-muted" style={{ fontWeight: 500 }}>
//                       {item.description}
//                     </p>
//                   ) : (
//                     <div className="servicebox-desc-space" />
//                   )}
//                 </div>

//                 <span className="icon-bg">
//                   <Icon size={120} strokeWidth={2} />
//                 </span>
//               </div>

//               <div className="icon-bx-footer">
//                 <Link
//                   href={item.href}
//                   className="btn btn-square btn-primary rounded-circle"
//                   aria-label={`Open ${item.title}`}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <i className="feather icon-arrow-up-right" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
