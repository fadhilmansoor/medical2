"use client";

import { useState } from "react";

export default function CommentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission here
    console.log("Comment submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", comment: "" });
    alert("Comment submitted! (This is a demo - implement your own logic)");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="comment-form" id="commentform" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <textarea
              name="comment"
              rows={8}
              placeholder="Your Comment *"
              className="form-control"
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}