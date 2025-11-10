export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=60')",
      }}
    >
      <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>
      <div className="relative z-10 text-white px-6 md:px-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Nigerian Institute of Town Planners<br />Oyo State Chapter
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
          Advancing Sustainable Planning and Development in Oyo State.
        </p>
        <div className="space-x-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition">
            Join NITP
          </button>
          <button className="bg-transparent border border-white hover:bg-white hover:text-green-700 px-6 py-3 rounded-lg transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
