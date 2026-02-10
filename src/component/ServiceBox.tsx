"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { serviceboxdata } from "@/constant/alldata";

export default function ServiceBox() {
  const [active, setActive] = useState<number>(serviceboxdata[0]?.id || 1);
  const router = useRouter();

  return (
    <div className="row service-box-container">
      {serviceboxdata.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <div
            key={item.id}
            className="col-xl-3 col-md-6 m-b30 wow fadeInUp"
            data-wow-delay={item.delay}
            data-wow-duration="0.8s"
          >
            <div
              className={`icon-bx-wraper style-3 box-hover ${isActive ? "active" : ""}`}
              onMouseEnter={() => setActive(item.id)}
              onClick={() => router.push(`/service-detail/${item.slug}`)} // ✅ whole box clickable
            >
              <div className="icon-bx-head">
                <div className="icon-content">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-bx">
                      <span className="icon-cell">
                        <Icon size={36} strokeWidth={2.5} />
                      </span>
                    </div>

                    <h3 className="dz-title mb-0" style={{ fontWeight: 700 }}>
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-muted" style={{ fontWeight: 500 }}>
                    {item.description}
                  </p>
                </div>

                <span className="icon-bg">
                  <Icon size={120} strokeWidth={2} />
                </span>
              </div>

              <div className="icon-bx-footer">
                {/* keep arrow link (optional) */}
                <Link
                  href={`/service-detail/${item.slug}`}
                  className="btn btn-square btn-primary rounded-circle"
                  aria-label={`Open ${item.title}`}
                  onClick={(e) => e.stopPropagation()} // ✅ prevent double trigger
                >
                  <i className="feather icon-arrow-up-right" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
