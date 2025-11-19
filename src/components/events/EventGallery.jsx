import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Modal from "../ui/Modal";

export default function EventGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/gallery");
        setGallery(res.data?.data || []);
      } catch (err) {
        console.error("Failed to load gallery:", err);
        setError("Failed to load gallery items.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <p className="text-center py-4 text-gray-500">Loading gallery...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (!gallery.length) return <p className="text-center py-4 text-gray-500">No gallery items yet.</p>;

  return (
    <div className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {gallery.map((item, index) => (
          <div
            key={item.id || index}
            className="cursor-pointer overflow-hidden rounded shadow hover:shadow-lg transition"
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.image}
              alt={item.title || item.caption || `Gallery item ${index + 1}`}
              className="w-full h-40 object-cover rounded"
            />
          </div>
        ))}
      </div>

      {selectedItem && (
        <Modal
          open={true}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title || selectedItem.caption}
        >
          <img
            src={selectedItem.image}
            alt={selectedItem.title || selectedItem.caption}
            className="w-full"
          />
          {selectedItem.caption && (
            <p className="mt-1 text-center text-gray-500 text-sm">{selectedItem.caption}</p>
          )}
        </Modal>
      )}
    </div>
  );
}
