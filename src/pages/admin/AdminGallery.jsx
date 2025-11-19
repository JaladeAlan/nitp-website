import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import AdminModal from "./AdminModal";

export default function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deletePending, setDeletePending] = useState(null);

  const galleryFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    { name: "caption", label: "Caption", type: "text", placeholder: "Enter caption" },
    { name: "image", label: "Image", type: "file" },
  ];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);

    try {
      const res = await api.get("/admin/gallery");
      setGalleryItems(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load gallery items");
      toast.error("Failed to load gallery items");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/gallery/${id}`);

      setGalleryItems((prev) => prev.filter((item) => item.id !== id));
      setDeletePending(null);

      toast.success("Gallery item deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete gallery item");
    }
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      let res;

      if (selectedImage) {
        // Update
        res = await api.post(`/admin/gallery/${selectedImage.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setGalleryItems((prev) =>
          prev.map((item) =>
            item.id === selectedImage.id ? res.data.data : item
          )
        );

        toast.success("Gallery item updated");
      } else {
        // Create
        res = await api.post("/admin/gallery", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setGalleryItems((prev) => [res.data.data, ...prev]);
        toast.success("Gallery item added");
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save gallery item");
    }
  };

  if (loading) return <p className="text-center py-4 text-gray-500">Loading gallery...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Gallery</h2>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add Image
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {galleryItems.map((item) => (
          <div key={item.id} className="border p-3 rounded shadow-sm relative">

            {item.image && (
              <img
                src={
                  item.image.startsWith("http")
                    ? item.image
                    : `${import.meta.env.VITE_API_URL}/storage/${item.image}`
                }
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            <h3 className="font-semibold mb-1">{item.title}</h3>
            {item.caption && (
              <p className="text-sm text-gray-600 mb-2">{item.caption}</p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-3 text-sm">
              <button
                onClick={() => openEditModal(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              {deletePending === item.id ? (
                <>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 font-semibold"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeletePending(null)}
                    className="text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setDeletePending(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
