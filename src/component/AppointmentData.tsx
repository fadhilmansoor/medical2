"use client";

import { useState } from "react";
import { IMAGES } from "../constant/theme";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import toast from "react-hot-toast";

function AppointmentData() {
  const [selectCat, setSelectCat] = useState("Angioplasty");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const payload = {
      name: String(formData.get("dzName") || ""),
      email: String(formData.get("dzEmail") || ""),
      phone: String(formData.get("dzPhone") || ""),
      service: selectCat,
      message: String(formData.get("dzMessage") || ""), // ✅ OPTIONAL
    };

    if (!payload.name || !payload.email || !payload.phone) {
      toast.error("Please fill Name, Email and Phone Number");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Appointment request sent successfully!");
        formEl.reset();
        setSelectCat("Angioplasty");
      } else {
        toast.error(result.message || "Failed to send appointment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="appointment-form">
    <section
      className="content-inner-2 bg-light z-2"
      style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}
    >
      <div className="container">
        <div className="row align-items-end content-wrapper style-8">
          <div className="col-lg-6 text-center wow fadeInUp">
            <Image src={IMAGES.about3png} alt="Appointment" />
          </div>

          <div className="col-lg-6">
            <div className="form-wrapper style-1 text-vr-wrapper">
              <div className="text-vertical">Appointment Now</div>

              <div
                className="form-body bg-primary background-blend-burn"
                style={{ backgroundImage: `url(${IMAGES.bg2png.src})` }}
              >
                <div className="title-head">
                  <h2 className="form-title m-b0">
                    Make An <span>Appointment</span> <br /> Apply For Treatments
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="dzForm">
                  <div className="row">

                    {/* Name */}
                    <div className="col-sm-6 m-b30">
                      <div className="form-floating floating-underline input-light">
                        <input
                          name="dzName"
                          type="text"
                          className="form-control input-light"
                          placeholder="Your Name"
                        />
                        <label>Your Name</label>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-sm-6 m-b30">
                      <div className="form-floating floating-underline input-light">
                        <input
                          name="dzPhone"
                          type="tel"
                          className="form-control dz-number input-light"
                          placeholder="Phone Number"
                        />
                        <label>Phone Number</label>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-sm-6 m-b30">
                      <div className="form-floating floating-underline input-light">
                        <input
                          name="dzEmail"
                          type="email"
                          className="form-control input-light"
                          placeholder="Your Email"
                        />
                        <label>Your Email</label>
                      </div>
                    </div>

                    {/* Service */}
                    <div className="col-sm-6 m-b30">
                      <div className="form-floating floating-underline input-light">
                        <Dropdown className="form-control bs-select input-light">
                          <Dropdown.Toggle as="div" className="form-control input-light">
                            {selectCat}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectCat("Angioplasty")}>
                              Angioplasty
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectCat("Cardiology")}>
                              Cardiology
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectCat("Dental")}>
                              Dental
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectCat("Eye Care")}>
                              Eye Care
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>

                    {/* ✅ Message (OPTIONAL, same font & height) */}
                    <div className="col-sm-12 m-b30">
                      <div className="form-floating floating-underline input-light">
                        <textarea
                          name="dzMessage"
                          className="form-control input-light"
                          rows={6}
                          placeholder="Message (Optional)"
                        />
                        <label>Message (Optional)</label>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="col-sm-12">
                      <button
                        type="submit"
                        className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow"
                        disabled={submitting}
                      >
                        {submitting ? "Sending..." : "Appointment"}
                        <span className="right-icon">
                          <i className="feather icon-arrow-right" />
                        </span>
                      </button>
                    </div>

                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
  
}

export default AppointmentData;
