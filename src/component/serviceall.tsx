"use client";

import Link from "next/link";
import { serviceboxdata } from "@/constant/alldata";

// ✅ Same slugify used in alldata.ts
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export default function ServicesAll() {
  return (
    <div className="row">
      {serviceboxdata.map((service) => {
        const Icon = service.icon;

        return (
          <div key={service.id} className="col-xl-12 m-b30">
            <div className="dz-card style-1">
              <div className="dz-info">
                <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-bx">
                      <span className="icon-cell">
                        <Icon size={34} strokeWidth={2.5} />
                      </span>
                    </div>

                    <div>
                      <h3 className="dz-title mb-1">{service.title}</h3>
                      <p className="mb-0 text-muted">{service.description}</p>
                    </div>
                  </div>

                  {/* ✅ view all service */}
                  <Link
                    href={`/service-detail/${service.slug}`}
                    className="btn btn-primary btn-sm"
                  >
                    View All {service.title}
                  </Link>
                </div>

                {/* ✅ categories */}
                <div className="m-t20">
                  <h6 className="mb-2">Categories</h6>

                  <div className="d-flex flex-wrap gap-2">
                    {service.services.map((cat) => {
                      const catSlug = slugify(cat);
                      return (
                        <Link
                          key={catSlug}
                          href={`/service-detail/${service.slug}/${catSlug}`}
                          className="badge badge-pill bg-light text-dark"
                          style={{
                            padding: "10px 14px",
                            borderRadius: "999px",
                            border: "1px solid rgba(0,0,0,0.08)",
                          }}
                        >
                          {cat}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
