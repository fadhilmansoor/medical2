import { StaticImageData } from "next/image";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface Props {
  title: string;
  bnrimage: string | StaticImageData;
  breadcrumb?: BreadcrumbItem[]; // ✅ NEW
}

function PageBanner({ title, bnrimage, breadcrumb }: Props) {
  const bg =
    typeof bnrimage === "string" ? bnrimage : (bnrimage as StaticImageData).src;

  // ✅ default breadcrumb (fallback)
  const items: BreadcrumbItem[] =
    breadcrumb && breadcrumb.length
      ? breadcrumb
      : [{ label: "Home", href: "/" }, { label: title }];

  return (
    <>
      <div
        className="dz-bnr-inr dz-banner-dark overlay-secondary-middle dz-bnr-inr-md"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="container">
          <div className="dz-bnr-inr-entry d-table-cell">
            <h1 className="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
              {title}
            </h1>

            {/* ✅ Custom breadcrumb inside banner */}
            <nav
              aria-label="breadcrumb"
              className="breadcrumb-row wow fadeInUp"
              data-wow-delay="0.4s"
              data-wow-duration="0.8s"
            >
              <ul className="breadcrumb">
                {items.map((item, idx) => {
                  const isLast = idx === items.length - 1;
                  return (
                    <li
                      key={`${item.label}-${idx}`}
                      className={`breadcrumb-item ${isLast ? "active" : ""}`}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.href && !isLast ? (
                        <Link href={item.href}>{item.label}</Link>
                      ) : (
                        item.label
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="dz-btn">
              <Link
                href="tel:+11234567890"
                className="btn btn-lg btn-icon btn-primary radius-xl btn-shadow mb-3 mb-sm-0"
              >
                <span className="left-icon">
                  <i className="feather icon-phone-call" />
                </span>{" "}
                +1 123 456 7890
              </Link>
            </div>
          </div>
        </div>

        <span className="text-vertical">24/7 EMERGENCY SERVICE</span>

        <ul className="dz-social">
          <li>
            <Link href="https://www.instagram.com/dexignzone" target="_blank">
              <i className="fa-brands fa-instagram" />
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/dexignzone" target="_blank">
              <i className="fa-brands fa-facebook-f" />
            </Link>
          </li>
          <li>
            <Link href="https://x.com/dexignzone" target="_blank">
              <i className="fa-brands fa-x-twitter" />
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/@dexignzone" target="_blank">
              <i className="fa-brands fa-youtube" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default PageBanner;
