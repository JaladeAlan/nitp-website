import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function AdminModal({ isOpen, onClose, onSubmit, initialData, fields }) {
  /**
   * fields = [
   *   { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
   *   { name: "image", label: "Image", type: "file" },
   *   ...
   * ]
   */

  const [formData, setFormData] = useState({});
  const [previews, setPreviews] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      const newPreviews = {};
      fields.forEach(f => {
        if (f.type === "file" && initialData[f.name]) {
          newPreviews[f.name] = initialData[f.name];
        }
      });
      setPreviews(newPreviews);
    } else {
      setFormData({});
      setPreviews({});
    }
  }, [initialData, fields]);

  const handleChange = (e, field) => {
    const { name, type } = field;
    if (type === "file") {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      if (file) {
        setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold mb-4">
                {initialData ? "Edit" : "Add"} Item
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="mb-1 font-medium">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(e, field)}
                        className="border p-2 rounded"
                        rows={field.rows || 4}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={field.type !== "file" ? formData[field.name] || "" : undefined}
                        onChange={(e) => handleChange(e, field)}
                        className="border p-2 rounded"
                      />
                    )}
                    {field.type === "file" && previews[field.name] && (
                      <img
                        src={previews[field.name]}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded mt-2"
                      />
                    )}
                  </div>
                ))}

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {initialData ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
