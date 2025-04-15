import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Brain, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { runAi } from "@/actions/ai";
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
  const handelGenerateWithAi = async () => {
    setLoading(true);
    if (!resume.job) {
      toast.error("Please fill all your values in Personal Information");
      setLoading(false);
      return;
    }
    const response = await runAi(
      `Generate a resume summary for a person with following details: ${JSON.stringify(
        resume
      )}`
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
          onClick={handelGenerateWithAi}
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
