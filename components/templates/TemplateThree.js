import React from "react";

export default function TemplateThree({ resume }) {
  return (
    <div
      className="border-l-8 p-6 rounded-xl text-gray-800"
      style={{ borderColor: resume.themeColor }}
    >
      <h1 className="text-3xl font-bold mb-1">{resume.name}</h1>
      <p className="italic text-lg mb-4">{resume.job}</p>
      <div className="flex gap-4 text-xs mb-6">
        <span>{resume.phone}</span>
        <span>{resume.email}</span>
        <span>{resume.address}</span>
      </div>
      <section className="mb-4">
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
      <section className="mb-4">
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
            <div
              dangerouslySetInnerHTML={{ __html: exp.summary }}
              className="text-xs"
            />
          </div>
        ))}
      </section>
      <section className="mb-4">
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
          <div className="flex flex-col gap-4 mt-4">
            {resume.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">{skill.name}</span>
                  <span className="text-xs font-medium">
                    {skill.level * 20}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${skill.level * 20}%`,
                      backgroundColor: resume.themeColor,
                    }}
                  />
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
