"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TemplateOne from "@/components/templates/TemplateOne";
import TemplateTwo from "@/components/templates/TemplateTwo";
import TemplateThree from "@/components/templates/TemplateThree";
import toast from "react-hot-toast";
import LinkedInShareButton from "@/components/social/linkedIn-share-button";
import { getResumeFromDb } from "@/actions/resume";
// import { checkAtsCompatibility } from "@/actions/atsChecker";

export default function DownloadPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const [currentResume, setCurrentResume] = useState(null);
  const [atsResult, setAtsResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const resume = await getResumeFromDb(params._id);
        setCurrentResume(resume);
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      }
    };
    if (params?._id) {
      fetchResume();
    }
  }, [params?._id]);

  const printResume = () => {
    if (typeof window !== "undefined" && currentResume?._id) {
      const newWindow = window.open(`/resume/${currentResume._id}`, "_blank");
      if (newWindow) {
        const checkWindowLoaded = setInterval(() => {
          if (newWindow.document.readyState === "complete") {
            clearInterval(checkWindowLoaded);
            newWindow.focus();
            newWindow.print();
          }
        }, 300);
      } else {
        console.error("Failed to open a new window for printing.");
      }
    } else {
      console.error("currentResume is not loaded yet.");
    }
  };

  const renderTemplate = () => {
    switch (currentResume?.template) {
      case "one":
        return <TemplateOne resume={currentResume} />;
      case "two":
        return <TemplateTwo resume={currentResume} />;
      case "three":
        return <TemplateThree resume={currentResume} />;
      default:
        return <TemplateOne resume={currentResume} />;
    }
  };

  const handleAtsCheck = async () => {
    if (!currentResume) return;
    setLoading(true);
    try {
      const resumeText = `
        ${currentResume.summary}
        ${currentResume.experience.map((exp) => exp.summary).join(" ")}
        ${currentResume.skills.map((skill) => skill.name).join(", ")}
      `;
      const atsFeedback = await checkAtsCompatibility(resumeText, "");
      setAtsResult(atsFeedback);
    } catch (err) {
      console.error(err);
      toast.error("ATS check failed.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="text-center w-full md:w-3/4 lg:w-2/3">
        <h2 className="font-bold text-2xl mb-2 text-gray-800">
          Congrats! Your AI-based Resume is ready!
        </h2>
        <p className="text-gray-600">
          You can now download, print, or share it with anyone.
        </p>

        {/* Resume Preview */}
        {currentResume && (
          <div
            id="resume-preview"
            className="mt-10 max-h-[75vh] overflow-auto border rounded-lg shadow p-4 bg-white"
          >
            {renderTemplate()}
          </div>
        )}

        {/* Buttons */}
        {currentResume && (
          <div className="flex flex-col sm:flex-row justify-center gap-10 mt-10">
            <div className="flex flex-col items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1091/1091007.png"
                width={50}
                height={50}
                alt="Download Icon"
              />
              <Button
                className="my-2"
                onClick={() => toast.success("Download logic coming soon!")}
              >
                Download
              </Button>
            </div>

            <div onClick={printResume} className="flex flex-col items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/3003/3003232.png"
                width={50}
                height={50}
                alt="Print Icon"
              />
              <Button onClick={printResume} className="my-2">
                Print
              </Button>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/145/145807.png"
                width={50}
                height={50}
                alt="LinkedIn Icon"
              />
              <LinkedInShareButton resumeId={currentResume._id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
