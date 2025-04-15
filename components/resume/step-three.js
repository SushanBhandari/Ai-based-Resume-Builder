import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResume } from "@/context/resume";
import dynamic from "next/dynamic";
const RichText = dynamic(() => import("@/components/RichText"), { ssr: false });
import { ArrowRight, Plus, X, Loader2Icon, Brain } from "lucide-react";

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
    <div className="w-full shadow-lg border-t4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Experience</h2>
      {experienceList?.length > 0 &&
        experienceList?.map((experience, index) => (
          <div key={index} className="mb-10">
            <Input
              name="title"
              type="text"
              placeholder="Job title"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.title}
              className="mb-3"
            />
            <Input
              name="company"
              type="text"
              placeholder="Company name"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.company}
              className="mb-3"
            />

            <Input
              name="address"
              type="text"
              placeholder="Company address"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.address}
              className="mb-3"
            />
            <Input
              name="startDate"
              type="text"
              placeholder="Start date"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.startDate}
              className="mb-3"
            />
            <Input
              name="endDate"
              type="text"
              placeholder="End date"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.endDate}
              className="mb-3"
            />
            <RichText
              value={experience.summary}
              onChange={(value) => handleExperiencetiptapChange(value, index)}
              className="mb-2"
              placeholder=" Job summary"
            />
            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() => handleExperienceGenerateWithAi(index)}
                disabled={experienceLoading[index]}
              >
                {experienceLoading[index] ? (
                  <Loader2Icon size={18} className="mr-2" />
                ) : (
                  <Brain size={18} className="mr-2" />
                )}
                Generate with AI
              </Button>
            </div>
          </div>
        ))}
      <div className="flex justify-between mt-3">
        <Button varient="outline" onClick={addExperience}>
          <Plus size={18} className="mr-2" /> Add
        </Button>
        {experienceList?.length > 1 && (
          <Button variant="outline" onClick={removeExperience}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )}
        <Button varient="outline" onClick={handleExperienceSubmit}>
          <Plus size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
