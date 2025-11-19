import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import AdminModal from "./AdminModal";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deletePending, setDeletePending] = useState(null); // track pending delete

  const eventFields = [
    { name: "title", label: "Event Title", type: "text", placeholder: "Enter title" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Enter description" },
    { name: "start_date", label: "Start Date", type: "date" },
    { name: "end_date", label: "End Date", type: "date" },
    { name: "location", label: "Location", type: "text", placeholder: "Enter location" },
    { name: "banner", label: "Event Banner", type: "file" },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/events");
      setEvents(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`/admin/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setDeletePending(null);
      toast.success("Event deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    }
  };

  const handleSubmitEvent = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) formData.append(key, data[key]);
      });

      let res;
      if (selectedEvent) {
        // Update
        res = await api.post(`/admin/events/${selectedEvent.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEvents((prev) =>
          prev.map((e) => (e.id === selectedEvent.id ? res.data.data : e))
        );
        toast.success("Event updated successfully");
      } else {
        // Create
        res = await api.post("/admin/events", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEvents((prev) => [res.data.data, ...prev]);
        toast.success("Event created successfully");
      }
      setIsEventModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save event");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  if (loading) return <p className="text-center py-4 text-gray-500">Loading events...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

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
            {event.banner && (
              <img
                src={event.banner.startsWith("http") ? event.banner : `${import.meta.env.VITE_API_URL}/storage/${event.banner}`}
                alt={event.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-gray-600 text-sm">{event.description}</p>
            <p className="text-gray-500 text-xs">
              {formatDate(event.start_date)} {event.end_date ? `- ${formatDate(event.end_date)}` : ""}
            </p>
            <p className="text-gray-500 text-xs">{event.location}</p>

            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => handleEditEvent(event)} className="text-blue-600">Edit</button>

              {deletePending === event.id ? (
                <>
                  <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600 font-semibold">
                    Confirm
                  </button>
                  <button onClick={() => setDeletePending(null)} className="text-gray-500">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setDeletePending(event.id)} className="text-red-600">
                  Delete
                </button>
              )}
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
