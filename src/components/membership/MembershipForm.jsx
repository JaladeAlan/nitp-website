import { useState } from "react";

export default function MembershipForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    institution: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Membership Application:", formData);
    alert("Thank you for applying to NITP Oyo! We'll contact you soon.");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Join NITP Oyo State Chapter
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Membership Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            >
              <option value="">Select category</option>
              <option value="Student">Student Member</option>
              <option value="Graduate">Graduate Member</option>
              <option value="Corporate">Corporate Member</option>
              <option value="Fellow">Fellow</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Institution / Organization</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}
