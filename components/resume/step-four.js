"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResume } from "@/context/resume";
import dynamic from "next/dynamic";
import { ArrowRight, Plus, X } from "lucide-react";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function StepFour() {
  const {
    educationList,
    handleEducationChange,
    handleEducationSubmit,
    addEducation,
    removeEducation,
  } = useResume();

  return (
    <div className="w-full p-5 shadow-lg border-t-4 border-border rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Education</h2>

      {educationList?.length > 0 &&
        educationList.map((education, index) => (
          <fieldset
            key={index}
            className="mb-10 p-4 border border-muted rounded-md space-y-3"
          >
            <Input
              name="name"
              type="text"
              placeholder="School / College / University Name"
              value={education.name}
              onChange={(e) => handleEducationChange(e, index)}
            />
            <Input
              name="address"
              type="text"
              placeholder="Address"
              value={education.address}
              onChange={(e) => handleEducationChange(e, index)}
            />
            <Input
              name="qualification"
              type="text"
              placeholder="Qualification"
              value={education.qualification}
              onChange={(e) => handleEducationChange(e, index)}
            />
            <Input
              name="year"
              type="number"
              placeholder="Completed Year"
              value={education.year}
              onChange={(e) => handleEducationChange(e, index)}
            />
          </fieldset>
        ))}

      {/* Control Buttons */}
      <div className="flex justify-between flex-wrap gap-2 mt-4">
        <Button variant="outline" onClick={addEducation}>
          <Plus size={18} className="mr-2" /> Add
        </Button>

        {educationList?.length > 1 && (
          <Button variant="outline" onClick={removeEducation}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )}

        <Button variant="default" onClick={handleEducationSubmit}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
