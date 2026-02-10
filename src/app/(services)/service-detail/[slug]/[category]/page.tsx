import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import { serviceboxdata } from "@/constant/alldata";
import AccordionBlog from "../../_components/AccordionBlog";




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

  return (
    <>
      <Header />

      <main className="page-content">
        <PageBanner 
          title={categoryName} 
          bnrimage={IMAGES.bnr2.src} 
        />
     

        <section className="content-inner category-detail">
          <div className="container">
            {/* Breadcrumb */}
            <div className="breadcrumb-row">
              <ul className="breadcrumb-custom">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href={`/service-detail/${service.slug}`}>{service.title}</Link></li>
                <li className="active">{categoryName}</li>
              </ul>
            </div>

            <div className="row">
              {/* LEFT CONTENT */}
              <div className="col-lg-8">
                {/* Hero Image */}
                <div className="category-hero wow fadeInUp" data-wow-delay="0.1s">
                  <Image
                    src={IMAGES.bloggrid2}
                    alt={categoryName}
                    className="object-fit-cover"
                  />
                </div>

                {/* Overview */}
                <div className="content-block wow fadeInUp" data-wow-delay="0.2s">
                  <h1 className="category-main-title">{categoryName}</h1>
                  <p className="category-intro">
                    Our {categoryName} treatment is designed to provide you with
                    exceptional results using advanced medical techniques and
                    state-of-the-art equipment.
                  </p>
                </div>

                {/* What is it */}
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

                {/* Benefits */}
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

                {/* Treatment Process */}
                <div className="content-block wow fadeInUp" data-wow-delay="0.5s">
                  <h2 className="block-title">Treatment Process</h2>
                  <div className="process-timeline">
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Consultation</h4>
                        <p>
                          Meet with our specialist to discuss your goals and
                          determine if this treatment is right for you.
                        </p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Preparation</h4>
                        <p>
                          We'll prepare you for the procedure and answer any
                          questions you may have.
                        </p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Treatment</h4>
                        <p>
                          The procedure is performed with precision and care
                          for optimal results.
                        </p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Recovery & Follow-up</h4>
                        <p>
                          We provide comprehensive aftercare and schedule
                          follow-up appointments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Before & After Care */}
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

                {/* FAQ */}
                <div className="content-block wow fadeInUp" data-wow-delay="0.7s">
                  <h2 className="block-title">Frequently Asked Questions</h2>
                  <AccordionBlog />
                </div>

                {/* CTA */}
                <div className="content-block wow fadeInUp" data-wow-delay="0.8s">
                  <div className="category-cta">
                    <h3>Ready to Schedule Your {categoryName}?</h3>
                    <p>
                      Book a consultation with our specialists to get started on
                      your journey.
                    </p>
                    <div className="cta-buttons">
                      <Link
                        href="/appointment"
                        className="btn btn-lg btn-primary btn-shadow"
                      >
                        Book Consultation
                        <span className="right-icon">
                          <i className="feather icon-calendar" />
                        </span>
                      </Link>
                      <Link
                        href={`/service-detail/${service.slug}`}
                        className="btn btn-lg btn-outline-secondary"
                      >
                        View All {service.title}
                        <span className="right-icon">
                          <i className="feather icon-arrow-right" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="col-lg-4">
                <aside className="side-bar sticky-top">
                  {/* Quick Info */}
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

                  {/* Related Treatments */}
                  <div className="widget related-treatments-widget wow fadeInUp" data-wow-delay="0.3s">
                    <h4 className="widget-title-custom">
                      Other {service.title} Treatments
                    </h4>
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
                      View All Treatments
                      <i className="feather icon-arrow-right"></i>
                    </Link>
                  </div>

                  {/* Contact Widget */}
                  <div
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

                      <Link
                        href="/contact-us"
                        className="btn btn-white btn-block btn-shadow"
                      >
                        Contact Us
                      </Link>
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