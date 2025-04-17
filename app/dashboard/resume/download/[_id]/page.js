"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useResume } from "@/context/resume";
import ResumeCard from "@/components/cards/resume-card";

export default function DownloadPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise); // ✅ unwrap the params Promise

  const { resumes } = useResume();
  const [currentResume, setCurrentResume] = React.useState(null);

  React.useEffect(() => {
    if (resumes && params?._id) {
      const resume = resumes.find((r) => r._id === params._id);
      setCurrentResume(resume);
    }
  }, [resumes, params?._id]);

  const printResume = () => {
    if (typeof window !== "undefined") {
      const newWindow = window.open(`/resume/${currentResume._id}`, "_blank");

      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 300);
      };
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
      <div className="text-center w-full md:w-1/3">
        <h2 className="font-bold text-2xl mb-2 text-gray-800">
          Congrats! Your AI-based Resume is ready!
        </h2>
        <p className="text-gray-600">
          You can now download, print, or share it with anyone.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-10 mt-16">
          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/1091/1091007.png"
              width={50}
              height={50}
              alt="Download Icon"
            />
            <Button className="my-2">Download</Button>
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
              src="https://cdn-icons-png.flaticon.com/128/10309/10309262.png"
              width={50}
              height={50}
              alt="Share Icon"
            />
            <Button className="my-2">Share</Button>
          </div>
        </div>

        {currentResume && <ResumeCard resume={currentResume} />}
        <div className="mb-10" />
      </div>
    </div>
  );
}
