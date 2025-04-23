"use client";

import React from "react";
import { useResume } from "@/context/resume";
import StepOneCreate from "@/components/resume/step-one-create";
import StepTwo from "@/components/resume/step-two";
import StepThree from "@/components/resume/step-three";
import StepFour from "@/components/resume/step-four";
import StepFive from "@/components/resume/step-five";
import ResumeCreateNav from "@/components/nav/resume-create-nav";
import PreviewCard from "@/components/cards/preview-card";

export default function ResumeCreatePage() {
  const { step } = useResume();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOneCreate />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      default:
        return <StepOneCreate />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Preview Section */}
      <div className="hidden lg:flex lg:w-1/2 p-4 bg-muted justify-center items-start sticky top-0 h-screen overflow-y-auto">
        <PreviewCard />
      </div>

      {/* Steps Section */}
      <div className="flex flex-col w-full lg:w-1/2 p-4 overflow-y-auto h-screen">
        <ResumeCreateNav />
        <div className="mt-4 animate-fadeIn">{renderStep()}</div>
      </div>
    </div>
  );
}
