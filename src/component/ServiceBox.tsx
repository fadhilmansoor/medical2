"use client";
import s from "../app/(services)/service-detail/_components/  ServiceBox.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { serviceboxdata } from "@/constant/alldata";


export default function ServiceBox() {
  const [activeId, setActiveId] = useState<number>(serviceboxdata[0]?.id || 1);
  const router = useRouter();

  return (
    <div className={s.grid}>
      {serviceboxdata.map((item) => {
        const Icon = item.icon;
        const isOn = activeId === item.id;

        return (
          <div
            key={item.id}
            className={`wow fadeInUp ${s.card} ${isOn ? s.cardActive : ""}`}
            data-wow-delay={item.delay}
            data-wow-duration="0.8s"
            onMouseEnter={() => setActiveId(item.id)}
            onClick={() => router.push(`/service-detail/${item.slug}`)}
          >
            {/* Watermark */}
            <span className={s.watermark} aria-hidden="true">
              <Icon size={132} strokeWidth={1.3} />
            </span>

            {/* TOP */}
            <div className={s.top}>
              <div className={s.head}>
                <div className={s.iconBox}>
                  <span className={s.iconSvg}>
                    <Icon size={26} strokeWidth={2.1} />
                  </span>
                </div>
                <div className={s.title}>{item.title}</div>
              </div>
              <div className={s.desc}>{item.description}</div>
            </div>

            {/* BOTTOM */}
            <div className={s.bottom}>
              <div className={s.divider} />
              <div className={s.arrowRow}>
                <Link
                  href={`/service-detail/${item.slug}`}
                  className={s.arrowBtn}
                  aria-label={`Open ${item.title}`}
                  onClick={(e) => e.stopPropagation()}
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