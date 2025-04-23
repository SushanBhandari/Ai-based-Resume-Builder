import React from "react";

export default function Education({ resume }) {
  const { education = [], themeColor } = resume || {};

  return (
    <div className="my-6 border border-border rounded-xl shadow-sm p-6 bg-white dark:bg-background">
      <h2 className="font-bold text-lg mb-2" style={{ color: themeColor }}>
        Education
      </h2>
      <hr className="mb-4" style={{ borderColor: themeColor }} />
      {education.length ? (
        education.map((edu, index) => (
          <div key={index} className="mb-5">
            <h3 className="font-semibold text-base">{edu.qualification}</h3>
            <div className="ml-2 mt-1 space-y-1">
              <p className="text-sm">{edu.name}</p>
              <p className="text-xs text-muted-foreground">{edu.address}</p>
              <p className="text-xs text-muted-foreground">{edu.year}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No education details added yet.
        </p>
      )}
    </div>
  );
}
