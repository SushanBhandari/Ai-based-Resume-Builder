import React from "react";
import { getResumeFromDb } from "@/actions/resume";
import PersonalDetails from "@/components/preview/personal-details";
import Summary from "@/components/preview/summary";
import Experience from "@/components/preview/experience";
import Skills from "@/components/preview/skills";
import Education from "@/components/preview/education";
import { currentUser } from "@clerk/nextjs/server";
import TemplateOne from "@/components/templates/TemplateOne";
import TemplateTwo from "@/components/templates/TemplateTwo";
import TemplateThree from "@/components/templates/TemplateThree";

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
    themeColor: resume.themeColor || "#000",
  };
}

export default async function ResumePage({ params }) {
  const resume = await getResumeFromDb(params._id);
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!resume) {
    return (
      <div className="m-20 text-center text-gray-600">Resume not found.</div>
    );
  }

  if (!email || resume.userEmail !== email) {
    return (
      <div className="m-20 text-center text-red-500">
        Unauthorized to view this resume.
      </div>
    );
  }

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

  return <div className="m-20">{renderTemplate()}</div>;
}
