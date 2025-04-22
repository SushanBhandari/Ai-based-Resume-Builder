"use client";

import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import Experience from "../preview/experience";
import Education from "../preview/education";
import Skills from "../preview/skills";
import { Button } from "../ui/button";
import { UserPen, Download, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useResume } from "@/context/resume";

export default function ResumeCard({ resume }) {
  const { deleteResume } = useResume();
  const router = useRouter();

  return (
    <div
      className="relative group shadow-lg w-full rounded-xl p-5 border-t-[6px] max-h-[600px] overflow-hidden bg-white dark:bg-background"
      style={{ borderColor: resume?.themeColor || "#3b82f6" }}
    >
      {/* Resume Content */}
      <div className="space-y-4 overflow-y-auto pr-2 max-h-[500px]">
        <PersonalDetails resume={resume} />
        <Summary resume={resume} />
        <Experience resume={resume} />
        <Education resume={resume} />
        <Skills resume={resume} />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push(`/dashboard/resume/edit/${resume._id}`)}
            className="flex items-center space-x-1"
          >
            <UserPen size={16} />
            <span>Edit</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push(`/dashboard/resume/download/${resume._id}`)}
            className="flex items-center space-x-1"
          >
            <Download size={16} />
            <span>Download</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteResume(resume._id)}
            className="flex items-center space-x-1"
          >
            <Trash size={16} />
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
