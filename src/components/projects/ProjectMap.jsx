import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const projectIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [35, 35],
});

export default function ProjectMap({ projects }) {
  // projects might be undefined initially
  const projectList = projects || [];

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-green-700">Project Locations</h2>
        <p className="text-gray-600">Explore our projects on the map below</p>
      </div>

      <div className="h-[500px] mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-lg">
        {projects === undefined ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading projects...
          </div>
        ) : projectList.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No projects available.
          </div>
        ) : (
          <MapContainer
            center={[7.3775, 3.9470]}
            zoom={8}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {projectList.map((project, i) => (
              <Marker key={i} position={project.coords} icon={projectIcon}>
                <Popup>
                  <strong>{project.title}</strong>
                  <br />
                  {project.location}
                  <br />
                  <span className="text-sm text-gray-500">{project.status}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </section>
  );
}
