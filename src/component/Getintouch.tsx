

"use client";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { IMAGES } from "../constant/theme";

function Getintouch() {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);

const payload = {
  name: `${formData.get("dzFirstName") || ""} ${formData.get("dzLastName") || ""}`.trim(),
  email: String(formData.get("dzEmail") || ""),
  phone: String(formData.get("dzPhoneNumber") || ""),
  service: String(formData.get("dzMessage") || ""), // this is your selected service dropdown
  message: "", // optional
};

    // ✅ basic validation (before API call)
    if (!payload.name) return toast.error("Please enter your name");
    if (!payload.email) return toast.error("Please enter your email");
    if (!payload.service) return toast.error("Please select a service");

    try {
      setLoading(true);

      // ✅ nice loading toast
      const toastId = toast.loading("Sending...");

      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        toast.success(data?.message || "Submitted successfully!", { id: toastId });
        form.current.reset();
      } else {
        toast.error(data?.message || "Failed to send. Try again.", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="col-xl-5 m-b30"
        data-bottom-top="transform: translateY(50px)"
        data-top-bottom="transform: translateY(-50px)"
      >
        <div className="form-wrapper style-1">
          <div
            className="form-body bg-primary background-blend-burn"
            style={{ backgroundImage: `url(${IMAGES.bg2png.src})`, backgroundSize: "cover" }}
          >
            <div className="section-head style-1 m-b30">
              <h2 className="title text-white m-b0">Get in Touch</h2>
              <p className="text-white m-b0 fw-medium">You can react us anytime</p>
            </div>

            <form ref={form} onSubmit={handleSubmit} className="dzForm">
              <input type="hidden" className="form-control" name="dzToDo" value="Contact" />
              <input type="hidden" className="form-control" name="reCaptchaEnable" value="0" />

              <div className="dzFormMsg"></div>

              <div className="row">
                <div className="col-sm-6 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <input
                      name="dzFirstName"
                      type="text"
                      className="form-control"
                      id="inputFirstName"
                      placeholder="First Name"
                      required
                    />
                    <label htmlFor="inputFirstName">First Name</label>
                  </div>
                </div>

                <div className="col-sm-6 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <input
                      name="dzLastName"
                      type="text"
                      className="form-control"
                      id="inputLastName"
                      placeholder="Last Name"
                      required
                    />
                    <label htmlFor="inputLastName">Last Name</label>
                  </div>
                </div>

                <div className="col-sm-6 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <input
                      name="dzEmail"
                      type="email"
                      className="form-control"
                      id="inputYourEmail"
                      placeholder="Your Email"
                      required
                    />
                    <label htmlFor="inputYourEmail">Your Email</label>
                  </div>
                </div>

                {/* kept in UI but NOT sent to API */}
                <div className="col-sm-6 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <input
                      name="dzPhoneNumber"
                      type="number"
                      className="form-control dz-number"
                      id="inputPhoneNumber"
                      placeholder="Phone Number"
                    />
                    <label htmlFor="inputPhoneNumber">Phone Number</label>
                  </div>
                </div>

                <div className="col-sm-12 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <select name="dzMessage" className="form-control" id="inputService" required>
                      <option value="">Select Service</option>
                      <option value="Hair Transplant">Hair Transplant</option>
                      <option value="Beard Transplant">Beard Transplant</option>
                      <option value="Skin Care">Skin Care</option>
                      <option value="Laser Treatment">Laser Treatment</option>
                      <option value="Dental Care">Dental Care</option>
                    </select>
                    <label htmlFor="inputService">Service</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Submit"}{" "}
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
    </>
  );
}

export default Getintouch;
