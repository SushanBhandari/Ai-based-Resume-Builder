"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResume } from "@/context/resume";
import dynamic from "next/dynamic";
import { ArrowRight, Plus, X, Loader2, Brain } from "lucide-react";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function StepThree() {
  const {
    experienceList,
    handleExperienceChange,
    handleExperiencetiptapChange,
    handleExperienceSubmit,
    addExperience,
    removeExperience,
    handleExperienceGenerateWithAi,
    experienceLoading,
  } = useResume();

  return (
    <div className="w-full p-5 shadow-lg border-t-4 border-border rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Experience</h2>

      {experienceList?.length > 0 &&
        experienceList.map((experience, index) => (
          <div
            key={index}
            className="mb-10 border border-muted rounded-md p-4 space-y-3"
          >
            <Input
              name="title"
              type="text"
              placeholder="Job title"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.title}
            />
            <Input
              name="company"
              type="text"
              placeholder="Company name"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.company}
            />
            <Input
              name="address"
              type="text"
              placeholder="Company address"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.address}
            />
            <div className="flex gap-3">
              <Input
                name="startDate"
                type="text"
                placeholder="Start date"
                onChange={(e) => handleExperienceChange(e, index)}
                value={experience.startDate}
              />
              <Input
                name="endDate"
                type="text"
                placeholder="End date"
                onChange={(e) => handleExperienceChange(e, index)}
                value={experience.endDate}
              />
            </div>

            <RichTextEditor
              value={experience.summary}
              onChange={(value) => handleExperiencetiptapChange(value, index)}
              placeholder="Job summary"
            />

            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() => handleExperienceGenerateWithAi(index)}
                disabled={experienceLoading[index]}
              >
                {experienceLoading[index] ? (
                  <Loader2 size={18} className="mr-2 animate-spin" />
                ) : (
                  <Brain size={18} className="mr-2" />
                )}
                Generate with AI
              </Button>
            </div>
          </div>
        ))}

      {/* Control Buttons */}
      <div className="flex justify-between flex-wrap gap-2 mt-4">
        <Button variant="outline" onClick={addExperience}>
          <Plus size={18} className="mr-2" /> Add Experience
        </Button>

        {experienceList?.length > 1 && (
          <Button variant="outline" onClick={removeExperience}>
            <X size={18} className="mr-2" /> Remove Last
          </Button>
        )}

        <Button variant="default" onClick={handleExperienceSubmit}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
