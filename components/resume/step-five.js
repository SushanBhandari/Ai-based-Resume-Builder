import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResume } from "@/context/resume";
import { ArrowRight, Plus, X, Loader2, Brain } from "lucide-react";
import toast from "react-hot-toast";
import { runAi } from "@/actions/ai";

export default function StepFive() {
  const {
    resume,
    skillsList,
    handleSkillsChange,
    handleSkillsSubmit,
    addSkill,
    removeSkill,
    setSkillsList,
  } = useResume();

  const [loading, setLoading] = useState(false);

  const skillLevels = [
    { label: "Poor", value: 1 },
    { label: "Basic", value: 2 },
    { label: "Moderate", value: 3 },
    { label: "Advanced", value: 4 },
    { label: "Expert", value: 5 },
  ];

  const handleRecommendSkills = async () => {
    if (!resume.job) {
      toast.error("Please fill out your job title in Personal Information.");
      return;
    }
    setLoading(true);

    try {
      const prompt = `Suggest 5 key skills required for the job title: ${resume.job}. Provide them as a comma-separated list.`;
      const response = await runAi(prompt);
      const skills = response
        .split(",")
        .map((skill) => ({ name: skill.trim(), level: 3 }));
      setSkillsList(skills);
      toast.success("Skills recommended successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch skill recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 border-border rounded-lg overflow-y-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button
          onClick={handleRecommendSkills}
          disabled={loading}
          variant="destructive"
        >
          {loading ? (
            <Loader2 size={18} className="mr-2 animate-spin" />
          ) : (
            <Brain size={18} className="mr-2" />
          )}
          Recommend Skills
        </Button>
      </div>

      {skillsList?.length > 0 &&
        skillsList.map((skill, index) => (
          <div key={index} className="mb-8">
            <Input
              name="name"
              type="text"
              placeholder="Skill name"
              value={skill.name}
              onChange={(e) => handleSkillsChange(e, index)}
              className="mb-3"
              autoFocus={index === 0}
            />
            <div className="flex flex-wrap gap-2">
              {skillLevels.map((level) => (
                <Button
                  key={level.value}
                  variant={
                    skill.level === level.value ? "secondary" : "outline"
                  }
                  onClick={() =>
                    handleSkillsChange(
                      { target: { name: "level", value: level.value } },
                      index
                    )
                  }
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        ))}

      {/* Controls */}
      <div className="flex justify-between mt-6 flex-wrap gap-2">
        <Button variant="outline" onClick={addSkill}>
          <Plus size={18} className="mr-2" /> Add Skill
        </Button>

        {skillsList?.length > 1 && (
          <Button variant="outline" onClick={removeSkill}>
            <X size={18} className="mr-2" /> Remove Last
          </Button>
        )}

        <Button variant="default" onClick={handleSkillsSubmit}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
