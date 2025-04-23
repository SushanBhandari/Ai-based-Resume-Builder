"use client";

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
    title: `${resume.name} - Resume`,
    description: resume.summary || "Check out this AI-generated resume.",
    openGraph: {
      title: `${resume.name} - Resume`,
      description: resume.summary || "Check out this AI-generated resume.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/resume/${params._id}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/preview-image.png`,
          width: 1200,
          height: 630,
          alt: "Resume Preview",
        },
      ],
    },
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
