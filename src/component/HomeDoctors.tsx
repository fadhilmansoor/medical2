"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { empolydata } from "@/constant/alldata";

type Props = {
  limit?: number; // how many doctors to show on homepage
};

export default function HomeDoctors({ limit = 4 }: Props) {
  const [active, setActive] = useState<number>(empolydata[0]?.id || 1);

  const doctors = empolydata.slice(0, limit);

  return (
    <section className="content-inner">
      <div className="container">
        {/* ✅ Header */}
        <div className="section-head style-1 m-b30 row align-items-end">
          <div className="col-sm-7 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
            <h2 className="title m-b0">We Employ only <br /> Specialists</h2>
          </div>

          <div className="col-sm-5 text-sm-end d-sm-block d-none wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
            <Link href="/team" className="btn btn-icon btn-primary btn-shadow">
              View All
              <span className="right-icon">
                <i className="feather icon-arrow-right" />
              </span>
            </Link>
          </div>
        </div>

        {/* ✅ Doctors Grid */}
        <div className="row">
          {doctors.map((item, i) => (
            <div
              className="col-xl-3 col-sm-6 wow fadeInUp"
              data-wow-delay={item.delay}
              data-wow-duration="0.8s"
              key={i}
            >
              <div
                className={active === item.id ? "dz-team style-1 active box-hover" : "dz-team style-1 box-hover"}
                onMouseEnter={() => setActive(item.id)}
              >
                <div className="dz-media">
                  {/* ✅ Whole image click -> Team page */}
                  <Link href="/team">
                    <Image src={item.image} alt={item.title} />
                  </Link>

                  <Link href="/appointment" className="btn btn-primary">
                    <i className="feather icon-calendar m-r5" /> Appointment Now
                  </Link>
                </div>

                <div className="dz-content">
                  <div className="clearfix">
                    {/* ✅ Name click -> Team page */}
                    <h3 className="dz-name">
                      <Link href="/team">{item.title}</Link>
                    </h3>
                    <span className="dz-position">{item.position}</span>
                  </div>

                  {/* ✅ Arrow click -> Team page */}
                  <Link href="/team" className="btn btn-square btn-secondary">
                    <i className="feather icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Mobile "View All" button */}
        <div className="text-center d-block d-sm-none m-t30">
          <Link href="/team" className="btn btn-icon btn-primary btn-shadow">
            View All Team
            <span className="right-icon">
              <i className="feather icon-arrow-right" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
