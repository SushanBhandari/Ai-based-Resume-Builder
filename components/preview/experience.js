"use client";
import React from "react";

export default function Experience({ resume }) {
  const { experience = [], themeColor } = resume || {};

  return (
    <div className="my-6 border border-border rounded-xl shadow-sm p-6 bg-white dark:bg-background">
      <h2 className="font-bold text-lg mb-2" style={{ color: themeColor }}>
        Personal Experience
      </h2>
      <hr className="mb-4" style={{ borderColor: themeColor }} />

      {experience.length ? (
        experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-base font-semibold">{exp?.title}</h3>
            <p className="text-sm">{exp?.company}</p>
            <p className="text-xs text-muted-foreground">{exp?.address}</p>

            {exp?.summary && (
              <div className="mt-3 bg-muted/20 border border-muted rounded-lg p-4 shadow-sm">
                <div
                  className="text-sm text-muted-foreground leading-relaxed space-y-2"
                  dangerouslySetInnerHTML={{ __html: exp.summary }}
                />
              </div>
            )}

            <hr className="mt-5" style={{ borderColor: themeColor }} />
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No work experience has been added yet.
        </p>
      )}
    </div>
  );
}
