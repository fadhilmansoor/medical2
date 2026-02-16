import SliderBanner from "./_components/slidebanner";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/constant/theme";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import DiagnosisReport from "./_components/DiagnosisReport";
import WorldClass from "@/component/WorldClass";
import Counter from "@/component/Counter";
import ServiceBox from "@/component/ServiceBox";
import AppointmentData from "@/component/AppointmentData";
import WhyChoose from "@/component/WhyChoose";
import RealPatient from "@/component/RealPatient";
import Howitwork from "@/component/Howitwork";
import Frequently from "@/component/Frequently";
import StayInformed from "@/component/StayInformed";
import MapWraper from "@/component/MapWraper";
import HomeDoctors from "@/component/HomeDoctors";


function HomePage() {
  return (
    <>
      <Header />

      {/* ✅ Inter default for all page text */}
      <main className="page-content font-body">
        <div
          className="hero-banner style-1"
          style={{
            backgroundImage: `url(${IMAGES.herobannerbg1.src})`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="inner-wrapper">
              <span className="text-vertical text-secondary font-body">
                24/7 EMERGENCY SERVICE
              </span>

              <div className="row align-items-end h-100">
                <div className="col-lg-6 align-self-center">
                  <div className="hero-content">
                    {/* ✅ Title uses Poppins */}
                    <h1
                      className="title font-title wow fadeInUp"
                      data-wow-delay="0.2s"
                      data-wow-duration="0.8s"
                    >
                      Medical & <br />
                      Health Care <span className="text-primary"> Services </span>{" "}
                      <Image src={IMAGES.herobannerline} alt="" />
                    </h1>

                    <p
                      className="text font-body wow fadeInUp"
                      data-wow-delay="0.4s"
                      data-wow-duration="0.8s"
                    >
                      Your health is our top priority. Schedule an appointment
                      with us today
                    </p>

                    <Link
                      href="/appointment"
                      className="btn btn-lg btn-icon btn-primary m-r20 wow fadeInUp font-body"
                      data-wow-delay="0.6s"
                      data-wow-duration="0.8s"
                    >
                      Appointment
                      <span className="right-icon">
                        <i className="feather icon-arrow-right" />
                      </span>
                    </Link>

                    <Link
                      href="/contact-us"
                      className="btn btn-lg btn-icon btn-secondary wow fadeInUp font-body"
                      data-wow-delay="0.6s"
                      data-wow-duration="0.8s"
                    >
                      Contact Us
                      <span className="right-icon">
                        <i className="feather icon-arrow-right" />
                      </span>
                    </Link>
                  </div>
                </div>

                <div
                  className="col-lg-6 wow fadeInRight"
                  data-wow-delay="0.8s"
                  data-wow-duration="0.8s"
                >
                  <div
                    className="hero-thumbnail"
                    data-bottom-top="transform: translateY(-50px)"
                    data-top-bottom="transform: translateY(50px)"
                  >
                    <SliderBanner />

                    <div className="circle-wrapper">
                      <div className="item1">
                        <Image src={IMAGES.herobannerheart} alt="" />
                      </div>
                    </div>

                    <div
                      className="item2"
                      data-bottom-top="transform: translateY(-50px)"
                      data-top-bottom="transform: translateY(50px)"
                    >
                      <div className="info-widget style-1 move-3">
                        <div className="avatar-group">
                          <Image
                            className="avatar rounded-circle avatar-sm border border-white border-2"
                            src={IMAGES.smallavatar1}
                            alt=""
                          />
                          <Image
                            className="avatar rounded-circle avatar-sm border border-white border-2"
                            src={IMAGES.smallavatar2}
                            alt=""
                          />
                          <Image
                            className="avatar rounded-circle avatar-sm border border-white border-2"
                            src={IMAGES.smallavatar3}
                            alt=""
                          />
                          <Image
                            className="avatar rounded-circle avatar-sm border border-white border-2"
                            src={IMAGES.smallavatar4}
                            alt=""
                          />
                        </div>

                        <div className="clearfix ms-2 font-body">
                          <span className="number text-primary">150k</span>
                          <span>Patient recovers</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="item3"
                      data-bottom-top="transform: translateY(-50px)"
                      data-top-bottom="transform: translateY(50px)"
                    >
                      <div className="info-widget style-2 move-2">
                        <DiagnosisReport />
                        <div className="widget-content">
                          {/* ✅ Small title uses Poppins */}
                          <h6 className="mb-0 font-title">
                            Successfully diagnosis
                          </h6>
                          <Link
                            href="/team-detail"
                            className="btn btn-square btn-outline-light text-primary rounded-circle"
                          >
                            <i className="feather icon-arrow-up-right" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div
                      className="item4"
                      data-bottom-top="transform: translateY(-50px)"
                      data-top-bottom="transform: translateY(50px)"
                    >
                      <div className="info-widget style-3 move-1">
                        <div className="widget-head">
                          <div className="widget-media">
                            <Image src={IMAGES.smallavatar5} alt="" />
                          </div>
                          <div className="widget-content">
                            <h6 className="title font-title">
                              Dr. Natali jackson
                            </h6>
                            <ul className="star-list">
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>

                        <p className="font-body">
                          “It is a long established fact that a reader will be
                          distracted by the readable content”
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="item5"
                data-bottom-top="transform: translateY(-30px)"
                data-top-bottom="transform: translateY(30px)"
              >
                <div className="info-widget style-4 move-4">
                  <div className="widget-media">
                    <Image src={IMAGES.smallavatar6} alt="" />
                  </div>
                  <div className="widget-content">
                    <h6 className="title font-title">Have a Question?</h6>
                    <Link href="mailto:info@example.com" className="font-body">
                      info@example.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          className="content-inner"
          style={{
            backgroundImage: `url(${IMAGES.bg1png.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
          }}
        >
          <div className="container">
            <WorldClass />
          </div>
        </section>

        <Counter />

        <section className="content-inner-2 bg-light">
          <div className="container">
           <div className="container">
  <div className="section-head style-1 m-b30 row align-items-end">
    <div
      className="col-xl-7 col-md-9 wow fadeInUp"
      data-wow-delay="0.2s"
      data-wow-duration="0.8s"
    >
      <h2 className="title font-title m-b0">
        Start Feeling Your Best <br /> Explore Our Wellness Services
      </h2>
    </div>

    {/* Desktop button already exists */}
    <div
      className="col-xl-5 col-md-3 text-lg-end d-none d-md-block wow fadeInUp"
      data-wow-delay="0.4s"
      data-wow-duration="0.8s"
    >
      <Link href="/services" className="btn btn-icon btn-secondary font-body">
        View All
        <span className="right-icon">
          <i className="feather icon-arrow-right" />
        </span>
      </Link>
    </div>
  </div>

  <ServiceBox />

  {/* ✅ NEW Show More button (good for mobile + after list) */}
  <div className="text-center m-t30">
    <Link href="/services" className="btn btn-primary btn-icon font-body">
      Show More Services
      <span className="right-icon">
        <i className="feather icon-arrow-right" />
      </span>
    </Link>
  </div>
</div>

          </div>
        </section>

        <AppointmentData />
<HomeDoctors />
        <section
          className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden"
          style={{
            backgroundImage: `URL(${IMAGES.bg1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        >
          <div className="container">
            <WhyChoose />
          </div>
        </section>

        <section className="clearfix p-t50 overlay-secondary-dark bg-primary background-blend-multiply overflow-hidden"
          style={{
            backgroundImage: `url(${IMAGES.bg3.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "cover",
          }}
        >
          <RealPatient />
        </section>

        <Howitwork />
          <Frequently /> 
        <StayInformed />
        <MapWraper />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
