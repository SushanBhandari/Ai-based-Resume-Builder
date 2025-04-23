import React from "react";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export default function Skills({ resume, print = false }) {
  const themeColor = resume?.themeColor || "#333";
  const defaultColor = "#d3d3d3";
  const skills = resume?.skills || [];

  return (
    <div className="my-6">
      <h2
        className="font-bold text-sm mb-2 uppercase"
        style={{ color: themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      {skills.length ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-start justify-between">
              <h3 className="text-sm font-medium">{skill?.name}</h3>
              <div className="flex-1 ml-3">
                {print ? (
                  <div
                    className="flex items-center gap-1"
                    title={`Level: ${skill.level}/5`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        style={{
                          color: i < skill.level ? themeColor : defaultColor,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Progress
                    value={skill.level * 20}
                    className="h-2 bg-muted/50"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mt-3">
          No skills added yet.
        </p>
      )}
    </div>
  );
}
