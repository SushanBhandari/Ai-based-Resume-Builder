import React from "react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});
export default function Experience({ resume }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold  text-sm mb-2"
        style={{ color: resume.themeColor }}
      >
        Personal Experience
      </h2>
      <hr style={{ borderColor: resume.themeColor }} />
      {(resume?.experience || []).map((exp, index) => {
        return (
          <div key={index} className="my-5">
            <h2 className="text-sm font-bold">{exp?.title}</h2>
            <h3 className="text-sm">{exp?.company}</h3>
            <p className="text-xs text-gray-600">{exp?.address}</p>
            {exp?.summary && (
              <RichTextEditor
                value={exp.summary}
                className="text-sm font-normal"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
