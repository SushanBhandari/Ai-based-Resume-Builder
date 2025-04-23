"use client";

import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Formal");
  const [language, setLanguage] = useState("English");

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
      const prompt = `Create a ${tone.toLowerCase()} resume summary in ${language} for the following individual based on these details: ${JSON.stringify(
        resume
      )}. Focus on strengths, experience, and career objectives. Return plain text.`;

      const response = await runAi(prompt);
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

      {/* Tone and Language Selectors */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="border rounded p-2"
          >
            <option>Formal</option>
            <option>Friendly</option>
            <option>Professional</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded p-2"
          >
            <option>English</option>
            <option>Nepali</option>
          </select>
        </div>
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
