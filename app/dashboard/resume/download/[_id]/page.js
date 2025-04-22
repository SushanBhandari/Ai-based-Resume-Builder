"use client";

import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useResume } from "@/context/resume";
import ResumeCard from "@/components/cards/resume-card";
import toast from "react-hot-toast";

export default function DownloadPage({ params }) {
  const { resumes } = useResume();
  const unwrappedParams = use(params);
  const [currentResume, setCurrentResume] = useState(null);

  useEffect(() => {
    if (resumes?.length && unwrappedParams?._id) {
      const found = resumes.find((r) => r._id === unwrappedParams._id);
      setCurrentResume(found);
    }
  }, [resumes, unwrappedParams?._id]);

  const printResume = () => {
    if (!currentResume?._id || typeof window === "undefined") return;

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
      toast.error("Could not open a new tab for printing.");
    }
  };

  const handleCopyLink = () => {
    if (!currentResume?._id || typeof window === "undefined") return;
    AC;
    const link = `${window.location.origin}/resume/${currentResume._id}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <div className="text-center w-full max-w-lg">
        <h2 className="font-bold text-2xl mb-2 text-foreground">
          🎉 Congrats! Your AI-based Resume is ready!
        </h2>
        <p className="text-muted-foreground mb-6">
          Download, print, or share your resume with ease.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-10 my-10">
          {/* Download */}
          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/1091/1091007.png"
              width={50}
              height={50}
              alt="Download Icon"
            />
            <Button className="my-2" disabled>
              Download
            </Button>
            <span className="text-xs text-muted-foreground">(Coming Soon)</span>
          </div>

          {/* Print */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={printResume}
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/128/3003/3003232.png"
              width={50}
              height={50}
              alt="Print Icon"
            />
            <Button className="my-2">Print</Button>
          </div>

          {/* Share */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={handleCopyLink}
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/128/10309/10309262.png"
              width={50}
              height={50}
              alt="Share Icon"
            />
            <Button className="my-2">Share</Button>
          </div>
        </div>

        {/* Preview Card */}
        {currentResume ? (
          <ResumeCard resume={currentResume} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Loading resume preview...
          </p>
        )}

        <div className="mb-10" />
      </div>
    </div>
  );
}
