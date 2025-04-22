import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResume } from "@/context/resume";
import { ArrowRight, Plus, X } from "lucide-react";

export default function StepFive() {
  const {
    skillsList,
    handleSkillsChange,
    handleSkillsSubmit,
    addSkill,
    removeSkill,
  } = useResume();

  const skillLevels = [
    { label: "Poor", value: 1 },
    { label: "Basic", value: 2 },
    { label: "Moderate", value: 3 },
    { label: "Advanced", value: 4 },
    { label: "Expert", value: 5 },
  ];

  return (
    <div className="w-full p-5 shadow-lg border-t-4 border-border rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Skills</h2>

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
