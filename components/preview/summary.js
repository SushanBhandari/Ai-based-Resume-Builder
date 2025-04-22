import React from "react";
import renderHTML from "react-render-html";

export default function Summary({ resume }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold mb-3" style={{}}>
        Summary
      </h2>
      {resume.summary && (
        <div className="text-xs font-normal ">{renderHTML(resume.summary)}</div>
      )}
    </div>
  );
}
