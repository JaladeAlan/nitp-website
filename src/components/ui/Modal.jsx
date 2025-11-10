import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative">
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h3 className="text-lg font-semibold text-green-700">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-green-700 transition"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
