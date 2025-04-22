import React from "react";
import { getResumeFromDb } from "@/actions/resume";
import PersonalDetails from "@/components/preview/personal-details";
import Summary from "@/components/preview/summary";
import Experience from "@/components/preview/experience";
import Skills from "@/components/preview/skills";
import Education from "@/components/preview/education";
import { notFound } from "next/navigation"; // For 404

export async function generateMetadata({ params }) {
  const resume = await getResumeFromDb(params._id);

  if (!resume) {
    return {
      title: "Resume Not Found",
      description: "No resume available for this ID.",
    };
  }

  return {
    title: `${resume.name || "Unnamed"} - Resume`,
    description: resume.summary || "View this AI-generated resume.",
    openGraph: {
      title: `${resume.name || "Unnamed"}'s Resume`,
      description: resume.summary || "AI-generated resume preview.",
      images: ["/logo.svg"],
    },
  };
}

export default async function ResumePage({ params }) {
  const resume = await getResumeFromDb(params._id);

  if (!resume) {
    notFound(); // Show 404 page
  }

  return (
    <div className="p-4 md:p-10 lg:p-20 animate-fadeIn">
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skills resume={resume} print={true} />
    </div>
  );
}
