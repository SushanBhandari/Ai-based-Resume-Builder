import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
function StepTwo() {
  const { resume, setResume, updateResume, setStep } = useResume();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume();
    setStep(3);
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Summary</h2>
      <Textarea
        onChange={(e) => setResume({ ...resume, summary: e.target.value })}
        value={resume.summary}
        className="mb-3"
        placeholder="write a summary about yourself"
        rows="10"
        required
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
}

export default StepTwo;
