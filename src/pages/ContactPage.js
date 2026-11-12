
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      role: formData.getAll("role"),
      message: formData.get("message"),
      website: formData.get("website")
    };

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully!"
      });

      form.reset();

    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to send your message."
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-page page-enter"
      aria-labelledby="contact-title">

      <div className="contact-intro">
        <p className="eyebrow">Let's create</p>

        <h1 id="contact-title">
          Bring the next world to life.
        </h1>

        <p className="page-lead">
          Have a project, a collaboration, or an idea in mind?
          Let's talk.
        </p>
      </div>

      <div className="contact-layout">

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          {/* Spam honeypot */}
          <div hidden aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
              />
            </label>
          </div>

          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Your name"
              maxLength={100}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              maxLength={254}
              required
            />
          </label>

          <label>
            Subject
            <input
              type="text"
              name="subject"
              placeholder="Project enquiry"
              maxLength={150}
              required
            />
          </label>

          <label>
            Role
            <select name="role" multiple>
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select>
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              placeholder="Tell me about your project"
              maxLength={5000}
              required
            />
          </label>

          {status.message && (
            <p
              role="status"
              aria-live="polite"
              className={`form-status ${status.type}`}
            >
              {status.message}
            </p>
          )}

          <button
            className="hero-action cursor-target"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send message"}
          </button>

        </form>

        <aside className="contact-details">

          <div>
            <span>Email</span>
            <a
              className="cursor-target"
              href="mailto:abhinavpillai10713@gmail.com"
            >
              abhinavpillai10713@gmail.com
            </a>
          </div>

          <div>
            <span>Location</span>
            <p>India · Available remotely</p>
          </div>

          <div>
            <span>Social</span>

            <div className="social-links">
              <a
                className="cursor-target"
                href="https://linkedin.com/in/abhinav-pillai-137a52295"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                className="cursor-target"
                href="https://www.artstation.com"
                target="_blank"
                rel="noreferrer"
              >
                ArtStation
              </a>
            </div>
          </div>

        </aside>

      </div>
    </section>
  );
}
