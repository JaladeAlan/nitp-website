import React, { useState } from "react";
import Modal from "../ui/Modal"; 
import Card from "../ui/Card";

export default function EventGallery({ gallery = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (!gallery.length) {
    return <p className="text-center py-4">No gallery items yet.</p>;
  }

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Event Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {gallery.map((item, index) => (
          <Card
            key={index}
            className="cursor-pointer overflow-hidden"
            onClick={() => setSelectedItem(item)}
          >
            {item.type === "video" ? (
              <video
                src={item.url}
                className="w-full h-40 object-cover rounded"
                controls
              />
            ) : (
              <img
                src={item.url}
                alt={item.title || `Gallery item ${index + 1}`}
                className="w-full h-40 object-cover rounded"
              />
            )}
          </Card>
        ))}
      </div>

      {/* Modal for full view */}
      {selectedItem && (
        <Modal onClose={() => setSelectedItem(null)}>
          {selectedItem.type === "video" ? (
            <video src={selectedItem.url} controls autoPlay className="w-full" />
          ) : (
            <img src={selectedItem.url} alt={selectedItem.title} className="w-full" />
          )}
        </Modal>
      )}
    </div>
  );
}
