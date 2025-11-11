export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">Contact Us</h1>
        <p className="text-gray-700 text-lg">
          Reach out to the Nigerian Institute of Town Planners, Oyo State Chapter.
        </p>
      </div>

      {/* Contact Form */}
      <form className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        ></textarea>
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
