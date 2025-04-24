import React from "react";

export default function TemplateOne({ resume }) {
  return (
    <div className="p-6 border rounded-xl space-y-4 text-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold" style={{ color: resume.themeColor }}>
          {resume.name}
        </h1>
        <p className="text-lg italic">{resume.job}</p>
        <p className="text-sm">{resume.address}</p>
        <div className="flex justify-center gap-4 text-xs mt-2">
          <span>{resume.phone}</span>
          <span>{resume.email}</span>
        </div>
      </div>
      <hr style={{ borderColor: resume.themeColor }} />
      <section>
        <h2
          className="text-lg font-semibold"
          style={{ color: resume.themeColor }}
        >
          Summary
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: resume.summary }}
          className="text-sm"
        />
      </section>
      <section>
        <h2
          className="text-lg font-semibold"
          style={{ color: resume.themeColor }}
        >
          Experience
        </h2>
        {resume.experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-bold text-sm">
              {exp.title} at {exp.company}
            </h3>
            <p className="text-xs italic">
              {exp.startDate} - {exp.endDate}
            </p>
            <p className="text-xs">{exp.address}</p>
            <div
              dangerouslySetInnerHTML={{ __html: exp.summary }}
              className="text-xs"
            />
          </div>
        ))}
      </section>
      <section>
        <h2
          className="text-lg font-semibold"
          style={{ color: resume.themeColor }}
        >
          Education
        </h2>
        {resume.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-bold text-sm">{edu.qualification}</h3>
            <p className="text-xs">
              {edu.name}, {edu.address}
            </p>
            <p className="text-xs italic">{edu.year}</p>
          </div>
        ))}
      </section>
      <section>
        <h2
          className="text-lg font-semibold"
          style={{ color: resume.themeColor }}
        >
          Skills
        </h2>
        {resume.skills.length ? (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {resume.skills.map((skill, index) => (
              <div key={index} className="flex items-start justify-between">
                <h3 className="text-sm font-medium">{skill.name}</h3>
                <div className="flex-1 ml-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill={i < skill.level ? resume.themeColor : "#d3d3d3"}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.778 1.4 8.172L12 18.896l-7.334 3.864 1.4-8.172-5.934-5.778 8.2-1.192z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mt-3">
            No skills added yet.
          </p>
        )}
      </section>
    </div>
  );
}
