import React from "react";
import { getResumeFromDb } from "@/actions/resume";
import PersonalDetails from "@/components/preview/personal-details";
import Summary from "@/components/preview/summary";
import Experience from "@/components/preview/experience";
import Skills from "@/components/preview/skills";
import Education from "@/components/preview/education";

export async function generateMetadata({ params }) {
  const resume = await getResumeFromDb(params._id);
  return {
    title: `${resume.name} - resume,
    description: resume.summary,
    openGraph: {
      title: ${resume.name}'s - Resume,
      description: resume.summary,
      images: ["/logo.svg"],
    }`,
  };
}

export default async function ResumePage({ params }) {
  const resume = await getResumeFromDb(params._id);

  return (
    <div className="m-20">
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skills resume={resume} print={true} />
    </div>
  );
}
