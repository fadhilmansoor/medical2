"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "../constant/theme";
import { footerdata } from "../constant/alldata";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer style-1 overlay-primary-light"
      style={{ backgroundImage: `url(${IMAGES.bg4.src})` }}
    >
      {/* ================= Footer Top ================= */}
      <div className="footer-top">
        <div className="container">
          <div className="row g-4">

            {/* ===== Logo / About ===== */}
            <div className="col-xl-3 col-md-6 col-12">
              <div className="widget widget_about">
                <div className="footer-logo logo-white mb-3">
                  <Link href="/">
                    <Image src={IMAGES.logo} alt="ClinicMaster" />
                  </Link>
                </div>
                <p>
                  <span className="text-primary">ClinicMaster</span> Ipsum Dolor
                  Sit Amet, Consectetuer Adipiscing Elit, Sed Diam Nonummy.
                </p>
              </div>
            </div>

            {/* ===== Footer Columns (DATA DRIVEN) ===== */}
            {footerdata.map((section, index) => (
              <div
                className={`col-xl-2 col-md-3 col-6 ${
                  section.title === "Our Contacts" ? "col-xl-3 col-md-6" : ""
                }`}
                key={index}
                data-wow-delay={section.delay}
              >
                <div className="widget widget_services">
                  <h2 className="footer-title">{section.title}</h2>

                  <ul
                    className={
                      section.title === "Our Contacts"
                        ? "footer-contact-table"
                        : "list-hover1"
                    }
                  >
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        {"icon" in item && (
                          <span className="icon">{item.icon}</span>
                        )}

                        <span className="text">
                          {"link" in item ? (
                            <Link href={item.link}>{item.label}</Link>
                          ) : (
                            item.label
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* ================= Footer Bottom ================= */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                © {year}{" "}
                <Link
                  href="https://themeforest.net/user/dexignzone"
                  target="_blank"
                >
                  DexignZone
                </Link>{" "}
                Theme. All Rights Reserved.
              </p>
            </div>

            <div className="col-md-6 text-center text-md-end">
              <div className="widget-rating1 d-inline-flex align-items-center">
                <Image src={IMAGES.google} alt="Google" />
                <ul className="star-list ms-2">
                  <li><i className="fa fa-star" /></li>
                  <li><i className="fa fa-star" /></li>
                  <li><i className="fa fa-star" /></li>
                  <li><i className="fa fa-star" /></li>
                  <li><i className="fa fa-star" /></li>
                </ul>
                <span className="rating ms-2">(4.8)</span>
                <span className="text ms-1">12k+ ratings on Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= GLOBAL CSS ================= */}
      <style jsx global>{`
        /* Contacts table – aligned like other lists */
        .footer-contact-table {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-contact-table li {
          display: grid;
          grid-template-columns: 16px 1fr;
          column-gap: 8px;
          align-items: start;
          margin-bottom: 12px;
        }

        .footer-contact-table .icon {
          display: flex;
          align-items: flex-start;
        }

        .footer-contact-table .icon i {
          font-size: 16px;
          margin-top: 2px;
        }

        .footer-contact-table .text {
          line-height: 1.5;
          font-size: inherit;
          color: inherit;
        }

        @media (max-width: 576px) {
          .footer-contact-table li {
            grid-template-columns: 14px 1fr;
            column-gap: 6px;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
