import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResume } from "@/context/resume";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});
import { ArrowRight, Plus, X, Loader2Icon, Brain } from "lucide-react";
export default function StepFour() {
  const {
    educationList,
    handleEducationChange,
    handleEducationSubmit,
    addEducation,
    removeEducation,
  } = useResume();

  return (
    <div className="w-full p-5 shadow-lg border-t-4 riounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Education</h2>
      {educationList?.length > 0 &&
        educationList?.map((education, index) => (
          <div key={index} className="mb-10">
            <Input
              name="name"
              type="text"
              placeholder="School/college/university name"
              value={education.name}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />

            <Input
              name="address"
              type="text"
              placeholder="Address"
              value={education.address}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />
            <Input
              name="qualification"
              type="text"
              placeholder="Qualification"
              value={education.qualification}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />
            <Input
              name="year"
              type="text"
              placeholder="Completed Year"
              value={education.year}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />
          </div>
        ))}
      <div className="flex justify-between mt-3">
        <Button varient="outline" onClick={addEducation}>
          <Plus size={18} className="mr-2" /> Add
        </Button>
        {educationList?.length > 1 && (
          <Button variant="outline" onClick={removeEducation}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )}
        <Button varient="outline" onClick={handleEducationSubmit}>
          <Plus size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
