import React from "react";

export default function Summary({ resume }) {
  const themeColor = resume?.themeColor || "#333";

  return (
    <div className="my-6">
      <h2 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
        Summary
      </h2>
      <hr style={{ borderColor: themeColor }} />

      {resume?.summary ? (
        <div
          className="text-sm text-muted-foreground leading-relaxed mt-3 space-y-2"
          dangerouslySetInnerHTML={{ __html: resume.summary }}
        />
      ) : (
        <p className="text-sm text-muted-foreground mt-3">
          No summary has been added yet.
        </p>
      )}
    </div>
  );
}
