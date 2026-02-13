import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import { serviceboxdata } from "@/constant/alldata";
import AccordionBlog from "../../_components/AccordionBlog";
import SurgeryBlog from "../../_components/SurgeryBlog";



type Props = {
  params: Promise<{
    slug: string;
    category: string;
  }>;
};

export default async function CategoryDetailPage({ params }: Props) {
  const { slug, category } = await params;

  const service = serviceboxdata.find((x) => x.slug === slug);
  if (!service) return notFound();

  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const categoryExists = service.services.some(
    (s) => s.toLowerCase().replace(/\s+/g, "-") === category
  );

  if (!categoryExists) return notFound();

  const categorySlug = category;

  const worldclasslistdata =
    service.worldclassByCategory?.[categorySlug] ?? [
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
    const videos = service.videosByCategory?.[categorySlug] ?? [];

  return (
    <>
      <Header />

      <main className="page-content">
        {/* ✅ Breadcrumb now inside banner */}
        <PageBanner
          title={categoryName}
          bnrimage={IMAGES.bnr2.src}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title, href: `/service-detail/${service.slug}` },
            { label: categoryName },
          ]}
        />

        <section className="content-inner category-detail">
          <div className="container">
            {/* ✅ Removed breadcrumb from here */}

            <div className="row">
              {/* LEFT CONTENT */}
              <div className="col-lg-8">
                <div className="category-hero wow fadeInUp" data-wow-delay="0.1s">
                  <Image
                    src={IMAGES.bloggrid2}
                    alt={categoryName}
                    className="object-fit-cover"
                  />
                </div>

                <div className="content-block wow fadeInUp" data-wow-delay="0.2s">
                  <h1 className="category-main-title">{categoryName}</h1>
                  <p className="category-intro">
                    Our {categoryName} treatment is designed to provide you with
                    exceptional results using advanced medical techniques and
                    state-of-the-art equipment.
                  </p>
                </div>

                <div className="content-block wow fadeInUp" data-wow-delay="0.3s">
                  <h2 className="block-title">What is {categoryName}?</h2>
                  <p>
                    {categoryName} is a safe and effective procedure performed by our
                    experienced specialists. This treatment has helped thousands of
                    patients achieve their desired results with minimal downtime and
                    maximum satisfaction.
                  </p>
                  <p>
                    Using the latest technology and proven methods, we ensure that
                    each patient receives personalized care tailored to their unique
                    needs and goals.
                  </p>
                </div>

                <div className="content-block wow fadeInUp" data-wow-delay="0.4s">
                  <h2 className="block-title">Benefits of {categoryName}</h2>
                  <div className="benefits-grid">
                    <div className="benefit-card">
                      <div className="benefit-icon">
                        <i className="feather icon-check-circle"></i>
                      </div>
                      <h4>Safe & Proven</h4>
                      <p>Clinically tested and approved procedures</p>
                    </div>
                    <div className="benefit-card">
                      <div className="benefit-icon">
                        <i className="feather icon-zap"></i>
                      </div>
                      <h4>Quick Results</h4>
                      <p>See noticeable improvements quickly</p>
                    </div>
                    <div className="benefit-card">
                      <div className="benefit-icon">
                        <i className="feather icon-clock"></i>
                      </div>
                      <h4>Minimal Downtime</h4>
                      <p>Return to normal activities faster</p>
                    </div>
                    <div className="benefit-card">
                      <div className="benefit-icon">
                        <i className="feather icon-award"></i>
                      </div>
                      <h4>Expert Care</h4>
                      <p>Performed by certified specialists</p>
                    </div>
                  </div>
                </div>

                <div className="content-item wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="0.7s">
                  <h3>Steps in {categoryName}</h3>
                  <ul className="list-check text-secondary m-b30 worldclass-steps">
                    {worldclasslistdata.map((item, i) => (
                      <li key={i}>{item.title}</li>
                    ))}
                  </ul>
                </div>

                <div className="content-block wow fadeInUp" data-wow-delay="0.6s">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="care-box">
                        <h3>Before Treatment</h3>
                        <ul className="care-list">
                          <li>Attend initial consultation</li>
                          <li>Follow pre-treatment instructions</li>
                          <li>Avoid certain medications if advised</li>
                          <li>Stay hydrated and well-rested</li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="care-box">
                        <h3>After Treatment</h3>
                        <ul className="care-list">
                          <li>Follow post-treatment guidelines</li>
                          <li>Attend scheduled follow-ups</li>
                          <li>Avoid strenuous activities initially</li>
                          <li>Contact us with any concerns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-block wow fadeInUp" data-wow-delay="0.7s">
                  <h2 className="block-title">Frequently Asked Questions</h2>
                  <AccordionBlog />
                </div>

               {videos.length > 0 && <SurgeryBlog videos={videos} />}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="col-lg-4">
                <aside className="side-bar sticky-top">
                  <div className="widget category-info-widget wow fadeInUp" data-wow-delay="0.2s">
                    <h4 className="widget-title-custom">Treatment Info</h4>
                    <div className="info-list">
                      <div className="info-row">
                        <span className="info-label">Category:</span>
                        <span className="info-value">{service.title}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Duration:</span>
                        <span className="info-value">30-90 minutes</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Recovery:</span>
                        <span className="info-value">Minimal</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Results:</span>
                        <span className="info-value">Visible within weeks</span>
                      </div>
                    </div>
                  </div>

                  <div className="widget related-treatments-widget wow fadeInUp" data-wow-delay="0.3s">
                    <h4 className="widget-title-custom">Other {service.title} Treatments</h4>
                    <ul className="related-list">
                      {service.services
                        .filter((s) => s !== categoryName)
                        .slice(0, 5)
                        .map((treatment, index) => (
                          <li key={index}>
                            <Link
                              href={`/service-detail/${service.slug}/${treatment
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              <i className="feather icon-chevron-right"></i>
                              {treatment}
                            </Link>
                          </li>
                        ))}
                    </ul>

                    <Link
                      href={`/service-detail/${service.slug}`}
                      className="view-all-link"
                    >
                      View All Treatments <i className="feather icon-arrow-right"></i>
                    </Link>
                  </div>

                  {/* <div
                    className="widget_contact wow fadeInUp"
                    style={{ backgroundImage: `url(${IMAGES.bg3png.src})` }}
                    data-wow-delay="0.4s"
                  >
                    <div className="widget-content">
                      <Image src={IMAGES.question} width={80} alt="Help" />
                      <h4 className="title">Have Questions?</h4>
                      <p>We're here to help you</p>

                      <div className="contact-links">
                        <Link href="tel:+11234567890" className="contact-link">
                          <i className="feather icon-phone"></i>
                          +1 123 456 7890
                        </Link>
                        <Link href="mailto:info@support.com" className="contact-link">
                          <i className="feather icon-mail"></i>
                          info@support.com
                        </Link>
                      </div>

                      <Link href="/contact-us" className="btn btn-white btn-block btn-shadow">
                        Contact Us
                      </Link>
                    </div>
                  </div> */}
                    <div className="widget widget_info bg-light wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="0.7s">
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
                                                                  <p className="fw-normal"><Link href="tel:+11234567890" className="text-body">+1 123 456 7890</Link></p>
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
                                                                  <p className="fw-normal"><Link href="mailto:info@example.com" className="text-body">info@example.com</Link></p>
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
