import React, { useEffect } from "react";
import { useResume } from "@/context/resume";
import TemplateOne from "@/components/templates/TemplateOne";
import TemplateTwo from "@/components/templates/TemplateTwo";
import TemplateThree from "@/components/templates/TemplateThree";

export default function PreviewCard() {
  const { resume, setResume, updateResume } = useResume();
  const currentTemplate = resume.template || "one";

  // Trigger updateResume when resume.template changes
  React.useEffect(() => {
    if (resume._id) {
      updateResume();
    }
  }, [resume.template]);

  const handleTemplateChange = (e) => {
    const newTemplate = e.target.value;
    setResume((prev) => ({ ...prev, template: newTemplate }));
  };

  const renderTemplate = () => {
    switch (currentTemplate) {
      case "one":
        return <TemplateOne resume={resume} />;
      case "two":
        return <TemplateTwo resume={resume} />;
      case "three":
        return <TemplateThree resume={resume} />;
      default:
        return <TemplateOne resume={resume} />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <select
          value={currentTemplate}
          onChange={handleTemplateChange}
          className="border rounded p-2"
        >
          <option value="one">Template One</option>
          <option value="two">Template Two</option>
          <option value="three">Template Three</option>
        </select>
      </div>
      <div className="border rounded-lg p-4 bg-white shadow">
        {renderTemplate()}
      </div>
    </div>
  );
}
