"use client";

import React from "react";
import { Button } from "../ui/button";
import { useResume } from "@/context/resume";
import { Brain, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { runAi } from "@/actions/ai";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function StepTwo() {
  const { resume, setResume, updateResume, setStep } = useResume();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume();
    setStep(3);
  };

  const handleGenerateWithAi = async () => {
    if (!resume.job) {
      toast.error("Please fill out your Personal Information first.");
      return;
    }
    setLoading(true);

    try {
      const response = await runAi(
        `Create a professional resume summary for the following individual based on these details: ${JSON.stringify(
          resume
        )}. Focus on their strengths, experience, and career objectives. Return plain text.`
      );
      setResume({ ...resume, summary: response });
    } catch (err) {
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-5 shadow-lg border-t-4 border-border rounded-lg space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Summary</h2>
        <Button
          variant="destructive"
          onClick={handleGenerateWithAi}
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={18} className="mr-2 animate-spin" />
          ) : (
            <Brain size={18} className="mr-2" />
          )}
          Generate with AI
        </Button>
      </div>

      {/* Summary Input */}
      <RichTextEditor
        value={resume.summary}
        onChange={(val) => setResume({ ...resume, summary: val })}
        placeholder="Write a summary about yourself"
      />

      <div className="flex justify-end pt-4">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
