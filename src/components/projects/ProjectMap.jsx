import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Default project marker icon
const projectIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [35, 35],
});

export default function ProjectMap({ projects = [] }) {
  // Default center coordinates (Oyo State)
  const defaultCenter = [7.3775, 3.9470];

  // Transform projects to include coords (fallback to default center)
  const projectMarkers = projects.map(p => ({
    ...p,
    coords: p.latitude && p.longitude ? [p.latitude, p.longitude] : defaultCenter,
  }));

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No projects available for map.
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-green-700">Project Locations</h2>
        <p className="text-gray-600">Explore our projects on the map below</p>
      </div>

      <div className="h-[500px] mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={defaultCenter}
          zoom={8}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {projectMarkers.map((project, i) => (
            <Marker key={i} position={project.coords} icon={projectIcon}>
              <Popup>
                <strong>{project.title}</strong>
                <br />
                {project.location || "Oyo State"}
                <br />
                <span className="text-sm text-gray-500">
                  {project.published ? "Ongoing" : "Upcoming"}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
