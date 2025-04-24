import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useResume } from "@/context/resume";
import TemplateOne from "@/components/templates/TemplateOne";
import TemplateTwo from "@/components/templates/TemplateTwo";
import TemplateThree from "@/components/templates/TemplateThree";
import { UserPen, Download, Trash } from "lucide-react";

export default function ResumeCard({ resume }) {
  const { deleteResume } = useResume();
  const router = useRouter();

  const renderTemplate = () => {
    switch (resume.template) {
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
    <div
      className="relative shadow-lg w-full rounded-xl p-5 border-t-[20px] max-height-screen overflow-y-auto"
      style={{ borderColor: resume?.themeColor }}
    >
      {/* Render Template */}
      {renderTemplate()}

      {/* Hover Buttons */}
      <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-2">
          <Button
            onClick={() => router.push(`/dashboard/resume/edit/${resume._id}`)}
          >
            <UserPen size={16} className="mr-1" /> Edit
          </Button>
          <Button
            onClick={() =>
              router.push(`/dashboard/resume/download/${resume._id}`)
            }
          >
            <Download size={16} className="mr-1" /> Download
          </Button>
          <Button onClick={() => deleteResume(resume._id)}>
            <Trash size={16} className="mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
