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
  //const
  const { deleteResume } = useResume();
  const router = useRouter();
  return (
    // <Link href={/dashboard/resume/edit/${resume._id}}>
    <div
      className="relative shadow-lg  w-full rounded-xl p-5 border-t-[20px] max-height-screen overflow-y-auto"
      style={{ borderColor: resume?.themeColor }}
    >
      <div className="line-clamp-3">
        <PersonalDetails resume={resume} />
      </div>
      <div className="line-clamp-4">
        <Summary resume={resume} />
      </div>
      <div className="line-clamp-4">
        <Experience resume={resume} />
      </div>
      <div className="line-clamp-4">
        <Education resume={resume} />
      </div>
      <div className="line-clamp-4">
        <Skills resume={resume} />
      </div>

      <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ">
        <div className="flex space-x-4 ">
          <Button
            onClick={() => router.push(`/dashboard/resume/edit/${resume._id}`)}
          >
            <UserPen />
            Edit
          </Button>
          <Button
            onClick={() =>
              router.push(`/dashboard/resume/download/${resume._id}`)
            }
          >
            <Download />
            Download
          </Button>
          <Button onClick={() => deleteResume(resume._id)}>
            <Trash />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
