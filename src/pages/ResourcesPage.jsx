import React from "react";
import Card from "../components/ui/Card";

const ResourcesPage = () => {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-blue-900">Resources</h1>
      <p className="text-gray-700 mb-6">
        Access publications, planning guidelines, and research materials provided by NITP.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Planning Guidelines" link="#">
          Explore detailed planning standards and design principles for urban areas.
        </Card>
        <Card title="Research Papers" link="#">
          Access academic and professional research on town planning and development.
        </Card>
        <Card title="Publications" link="#">
          Browse NITP newsletters, journals, and conference materials.
        </Card>
      </div>
    </div>
  );
};

export default ResourcesPage;
