export default function ContactPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>
        Reach out to the Nigerian Institute of Town Planners, Oyo State Chapter.
      </p>
      <form className="mt-6 space-y-4 max-w-md">
        <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" />
        <input type="email" placeholder="Email Address" className="w-full border p-2 rounded" />
        <textarea placeholder="Your Message" rows="4" className="w-full border p-2 rounded"></textarea>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}
