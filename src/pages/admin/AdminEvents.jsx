import { useState } from "react";
import AdminModal from "./AdminModal";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventFields = [
    { name: "title", label: "Event Title", type: "text", placeholder: "Enter title" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Enter description" },
    { name: "date", label: "Date", type: "date" },
    { name: "image", label: "Event Banner", type: "file" }
  ];

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleSubmitEvent = (data) => {
    if (selectedEvent) {
      // Update
      setEvents((prev) =>
        prev.map((e) => (e.id === selectedEvent.id ? { ...e, ...data } : e))
      );
    } else {
      // Add
      setEvents((prev) => [...prev, { id: Date.now(), ...data }]);
    }
    setIsEventModalOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Events</h2>
        <button
          onClick={handleAddEvent}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Event
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="border p-2 rounded shadow relative">
            {event.image && (
              <img
                src={event.image instanceof File ? URL.createObjectURL(event.image) : event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-gray-600 text-sm">{event.description}</p>
            <p className="text-gray-500 text-xs">{event.date}</p>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => handleEditEvent(event)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleSubmitEvent}
        initialData={selectedEvent}
        fields={eventFields}
      />
    </div>
  );
}
