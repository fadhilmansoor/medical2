import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import { serviceboxdata } from "@/constant/alldata";

type Props = {
  params: { slug: string };
};

export default function ServiceDetailPage({ params }: Props) {
  const current = serviceboxdata.find((x) => x.slug === params.slug);

  if (!current) return notFound();

  return (
    <>
      <Header />

      <main className="page-content">
        <PageBanner title={current.title} bnrimage={IMAGES.bnr2.src} />

        <section className="content-inner service-single">
          <div className="container">
            <div className="row">
              {/* LEFT CONTENT */}
              <div className="col-lg-8 single-inner order-lg-1">
                {/* Hero Image */}
                <div
                  className="single-media dz-media single-media height-sm radius-lg wow fadeInUp"
                  data-wow-delay="0.1s"
                  data-wow-duration="0.7s"
                >
                  <Image
                    src={current.image || IMAGES.bloggrid2}
                    alt={current.title}
                    className="object-fit-cover"
                  />
                </div>

                {/* Overview Section */}
                <div
                  className="content-item wow fadeInUp"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.7s"
                >
                  <h2 className="service-title">{current.title} Services</h2>
                  <p className="service-description">{current.description}</p>
                  
                  <div className="service-highlight">
                    <p>
                      Our specialists provide safe and effective treatment plans
                      based on your individual goals. Book a consultation to learn
                      the best option for you.
                    </p>
                  </div>
                </div>

                {/* Service Categories Grid */}
                <div
                  className="content-item wow fadeInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="0.7s"
                >
                  <h3 className="section-heading">Our {current.title} Treatments</h3>
                  
                  <div className="service-category-grid">
                    {current.services.map((service, index) => (
                      <Link
                        key={index}
                        href={`/service-detail/${current.slug}/${service
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="service-category-card"
                      >
                        <div className="category-icon">
                          <i className="feather icon-check-circle"></i>
                        </div>
                        <div className="category-content">
                          <h4 className="category-title">{service}</h4>
                          <p className="category-link">
                            Learn more <i className="feather icon-arrow-right"></i>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div
                  className="content-item wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="0.7s"
                >
                  <h3 className="section-heading">Why Choose Our {current.title} Services?</h3>
                  <ul className="benefits-list">
                    <li>
                      <i className="feather icon-check"></i>
                      <span>Experienced and certified specialists</span>
                    </li>
                    <li>
                      <i className="feather icon-check"></i>
                      <span>State-of-the-art medical equipment</span>
                    </li>
                    <li>
                      <i className="feather icon-check"></i>
                      <span>Personalized treatment plans</span>
                    </li>
                    <li>
                      <i className="feather icon-check"></i>
                      <span>Comprehensive aftercare support</span>
                    </li>
                    <li>
                      <i className="feather icon-check"></i>
                      <span>Safe and proven procedures</span>
                    </li>
                  </ul>
                </div>

                {/* Call to Action */}
                <div
                  className="content-item cta-section wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="0.7s"
                >
                  <div className="cta-card">
                    <h3>Ready to Get Started?</h3>
                    <p>
                      Schedule a consultation with our specialists to discuss your
                      goals and find the perfect treatment plan for you.
                    </p>
                    <div className="cta-buttons">
                      <Link
                        href="/appointment"
                        className="btn btn-lg btn-primary btn-shadow"
                      >
                        Book Appointment
                        <span className="right-icon">
                          <i className="feather icon-calendar" />
                        </span>
                      </Link>
                      <Link
                        href="/contact-us"
                        className="btn btn-lg btn-outline-primary"
                      >
                        Contact Us
                        <span className="right-icon">
                          <i className="feather icon-phone" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="col-lg-4 m-b30">
                <aside className="side-bar sticky-top left">
                  {/* All Services Menu */}
                  <div
                    className="widget service_menu_nav bg-secondary wow fadeInUp"
                    data-wow-delay="0.2s"
                    data-wow-duration="0.7s"
                  >
                    <div className="widget-title">
                      <h4 className="title">All Services</h4>
                    </div>

                    <ul>
                      {serviceboxdata.map((item) => (
                        <li
                          key={item.id}
                          className={item.slug === current.slug ? "active" : ""}
                        >
                          <Link href={`/service-detail/${item.slug}`}>
                            <span className="service-icon">
                              <item.icon size={18} />
                            </span>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Info Card */}
                  <div
                    className="widget widget-quick-info wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="0.7s"
                  >
                    <div className="widget-content">
                      <div className="info-item">
                        <i className="feather icon-clock"></i>
                        <div>
                          <span className="info-label">Working Hours</span>
                          <span className="info-value">Mon - Sat: 9AM - 8PM</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <i className="feather icon-map-pin"></i>
                        <div>
                          <span className="info-label">Location</span>
                          <span className="info-value">Dubai Healthcare City</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <i className="feather icon-award"></i>
                        <div>
                          <span className="info-label">Certified</span>
                          <span className="info-value">ISO 9001:2015</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Widget */}
                  <div
                    className="widget_contact wow fadeInUp"
                    style={{ backgroundImage: `url(${IMAGES.bg3png.src})` }}
                    data-wow-delay="0.4s"
                    data-wow-duration="0.7s"
                  >
                    <div className="widget-content">
                      <Image src={IMAGES.question} width={80} alt="Help" />
                      <h4 className="title">Need Help?</h4>
                      <p>Our team is here to assist you</p>

                      <div className="contact-info">
                        <div className="phone-number">
                          <i className="feather icon-phone"></i>
                          <Link href="tel:+11234567890">+1 123 456 7890</Link>
                        </div>

                        <div className="email">
                          <i className="feather icon-mail"></i>
                          <Link href="mailto:info@support.com">info@support.com</Link>
                        </div>
                      </div>

                      <div className="link-btn">
                        <Link
                          href="/contact-us"
                          className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow"
                        >
                          Contact Us
                          <span className="right-icon">
                            <i className="feather icon-arrow-right" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}