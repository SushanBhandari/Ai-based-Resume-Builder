import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Brain, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { runAi } from "@/actions/ai";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});
function StepTwo() {
  //context
  const { resume, setResume, updateResume, setStep } = useResume();
  //state
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume();
    setStep(3);
  };
  const handleGenerateWithAi = async () => {
    setLoading(true);
    if (!resume.job) {
      toast.error("Please fill all your values in Personal Information");
      setLoading(false);
      return;
    }
    const response = await runAi(
      `Generate a resume summary for a person with following details: ${JSON.stringify(
        resume
      )} in plain text format`

      //  `Create a professional resume summary for the following individual. Focus on strengths, experience, and goals. Return plain text only.\n\nDetails: ${JSON.stringify(resume)}`
    );
    setResume({ ...resume, summary: response });
    setLoading(false);
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-5">Summary</h2>
        <Button
          variant="destructive"
          onClick={handleGenerateWithAi}
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon size={18} className="mr-2 animate-spin" />
          ) : (
            <Brain size={18} className="mr-2" />
          )}
          Generate with AI
        </Button>
      </div>
      {/* {
        <Textarea
          onChange={(e) => setResume({ ...resume, summary: e.target.value })}
          value={resume.summary}
          className="mb-3"
          placeholder="write a summary about yourself"
          rows="10"
          required
        />
      } */}

      {/* <ReactQuill
        theme="snow"
        onChange={(e) => setResume({ ...resume, summary: e })}
        value={resume.summary}
        className="mb-5 rounded-md"
      /> */}
      <RichTextEditor
        value={resume.summary}
        onChange={(val) => setResume({ ...resume, summary: val })}
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
}

export default StepTwo;
