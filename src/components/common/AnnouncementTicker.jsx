// src/components/common/AnnouncementTicker.jsx
import { useEffect, useState } from "react";

export default function AnnouncementTicker() {
  const [index, setIndex] = useState(0);
  const announcements = [
    "📢 Call for Papers: 2025 Annual Planning Conference!",
    "🗓️ Upcoming Workshop: Sustainable Urban Design, Ibadan – Dec 10.",
    "🎓 Membership Renewal Now Open for 2025.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="bg-green-700 text-white py-2 px-4 overflow-hidden">
      <div className="animate-slide whitespace-nowrap text-center font-medium">
        {announcements[index]}
      </div>
    </div>
  );
}
