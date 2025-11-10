export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 p-5 ${className}`}
    >
      {children}
    </div>
  );
}
