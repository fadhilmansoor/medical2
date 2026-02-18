"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import { serviceboxdata } from "@/constant/alldata";

function toCategorySlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const current = serviceboxdata.find((x) => x.slug === slug);

  // ✅ client-side fallback (instead of notFound)
  if (!current) {
    return (
      <>
        <Header />
        <main className="page-content">
          <PageBanner
            title="Service Not Found"
            bnrimage={IMAGES.bnr2.src}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Service Not Found" }]}
          />
          <section className="content-inner">
            <div className="container">
              <h3>Service not found</h3>
              <p>Please check the URL or go back to services.</p>
              <Link href="/service-detail" className="btn btn-primary">
                Back to Services
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="page-content">
        {/* ✅ Breadcrumb like category page (NO "Services" if you want remove it) */}
        <PageBanner
          title={current.title}
          bnrimage={IMAGES.bnr2.src}
          breadcrumb={[
            { label: "Home", href: "/" },
            // अगर तुम्हें "Services" नहीं chahiye to is line ko remove kar do:
            { label: "Services", href: "/service-detail" },
            { label: current.title },
          ]}
        />

        <section className="content-inner service-single">
          <div className="container">
            <div className="row">
              {/* LEFT */}
              <div className="col-lg-8 single-inner order-lg-1">
                <div className="single-media dz-media single-media height-sm radius-lg wow fadeInUp">
                  <Image
                    src={current.image || IMAGES.bloggrid2}
                    alt={current.title}
                    className="object-fit-cover"
                  />
                </div>

                <div className="content-item wow fadeInUp">
                  <h2>{current.title}</h2>
                  <p>{current.description}</p>
                </div>

                <div className="content-item wow fadeInUp">
                  <h3>Available Treatments</h3>

                  <div className="row">
                    {current.services.map((service) => {
                      const catSlug = toCategorySlug(service);

                      return (
                        <div key={service} className="col-md-6 m-b30">
                          <Link
                            href={`/${current.slug}/${catSlug}`}
                            className="dz-card style-1 d-block"
                          >
                            <div className="dz-media">
                              <Image
                                src={IMAGES.bloggrid2}
                                alt={service}
                                className="object-fit-cover"
                              />
                            </div>

                            <div className="dz-info">
                              <h4 className="dz-title">{service}</h4>
                              <p className="m-b0">
                                Click to view details about {service}.
                              </p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="col-lg-4 m-b30">
                <aside className="side-bar sticky-top left">
                  <div className="widget service_menu_nav bg-secondary wow fadeInUp">
                    <div className="widget-title">
                      <h4 className="title">All Services</h4>
                    </div>

                    <ul>
                      {serviceboxdata.map((item) => (
                        <li
                          key={item.id}
                          className={item.slug === current.slug ? "active" : ""}
                        >
                          <Link href={`/service-detail/${item.slug}`}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="widget widget_info bg-light wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="0.7s"
                  >
                    <div className="icon-bx-wraper style-1 m-b20">
                      <div className="icon-bx bg-primary">
                        <span className="icon-cell">
                          <i className="feather icon-map-pin" />
                        </span>
                      </div>
                      <div className="icon-content">
                        <h5 className="dz-title fw-semibold">Address</h5>
                        <p className="fw-normal">234 Oak Drive, Villagetown, USA</p>
                      </div>
                    </div>

                    <div className="icon-bx-wraper style-1 m-b20">
                      <div className="icon-bx bg-primary">
                        <span className="icon-cell">
                          <i className="feather icon-phone" />
                        </span>
                      </div>
                      <div className="icon-content">
                        <h5 className="dz-title fw-semibold">Call Us</h5>
                        <p className="fw-normal">
                          <Link href="tel:+11234567890" className="text-body">
                            +1 123 456 7890
                          </Link>
                        </p>
                      </div>
                    </div>

                    <div className="icon-bx-wraper style-1 m-b15">
                      <div className="icon-bx bg-primary">
                        <span className="icon-cell">
                          <i className="feather icon-mail" />
                        </span>
                      </div>
                      <div className="icon-content">
                        <h5 className="dz-title fw-semibold">Send us a Mail</h5>
                        <p className="fw-normal">
                          <Link href="mailto:info@example.com" className="text-body">
                            info@example.com
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              {/* RIGHT END */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
