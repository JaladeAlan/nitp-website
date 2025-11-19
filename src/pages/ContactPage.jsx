import { useState } from "react";
import SEOWrapper from "../components/common/SEOWrapper";
import api from "../services/api"; 

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await api.post("/contact", form);
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <SEOWrapper
      title="Contact NITP Oyo State Chapter | Get in Touch"
      description="Reach out to the Nigerian Institute of Town Planners (NITP) Oyo State Chapter for inquiries, partnerships, or membership information."
      image="/assets/oyo-cityscape.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-4xl mx-auto px-6 py-10">

        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-300 p-3 rounded-lg"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </SEOWrapper>
  );
}
