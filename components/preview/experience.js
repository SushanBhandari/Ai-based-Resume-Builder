import React from "react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});
export default function Experience({ resume }) {
  return (
    <div className="my-6 border border-gray-300 rounded-xl shadow-md p-6 bg-white">
      <h2
        className=" font-bold  text-xl mb-2"
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
              <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                <div
                  className="text-sm text-gray-700 space-y-2"
                  dangerouslySetInnerHTML={{ __html: exp.summary }}
                />
              </div>
            )}

            <hr style={{ borderColor: resume.themeColor }} />
          </div>
        );
      })}
    </div>
  );
}
