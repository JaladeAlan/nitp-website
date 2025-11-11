import { useState, useEffect } from "react";
import AdminModal from "./AdminModal";

export default function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    { name: "image", label: "Image", type: "file" }
  ];

  const handleAdd = () => {
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (selectedImage) {
      // Update existing item
      setGalleryItems((prev) =>
        prev.map((item) => (item.id === selectedImage.id ? { ...item, ...data } : item))
      );
    } else {
      // Add new item
      setGalleryItems((prev) => [...prev, { id: Date.now(), ...data }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Gallery</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Image
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="border p-2 rounded shadow relative">
            {item.image && (
              <img src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image} 
                   alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
            )}
            <h3 className="font-semibold">{item.title}</h3>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedImage}
        fields={galleryFields}
      />
    </div>
  );
}
