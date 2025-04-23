"use client";

import React from "react";
import { useResume } from "@/context/resume";
import StepOne from "@/components/resume/step-one";
import StepTwo from "@/components/resume/step-two";
import StepThree from "@/components/resume/step-three";
import StepFour from "@/components/resume/step-four";
import StepFive from "@/components/resume/step-five";
import ResumeCreateNav from "@/components/nav/resume-create-nav";
import PreviewCard from "@/components/cards/preview-card";

export default function ResumeCreatePage() {
  const { step } = useResume();

  // Step transition component
  const StepRenderer = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      default:
        return <StepOne />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Preview Section */}
      <div className="lg:w-1/2 p-4 bg-muted hidden lg:flex justify-center items-start sticky top-0 overflow-y-auto h-screen">
        <PreviewCard />
      </div>

      {/* Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 p-4 overflow-y-auto h-screen">
        <ResumeCreateNav />
        <div className="mt-4 animate-fadeIn">{StepRenderer()}</div>
      </div>
    </div>
  );
}
