import React from "react";

export default function TemplateTwo({ resume }) {
  return (
    <div className="grid grid-cols-4 gap-4 border rounded-xl p-4 text-gray-800">
      <aside className="col-span-1 bg-gray-100 p-3 rounded-xl">
        <h2 className="font-semibold" style={{ color: resume.themeColor }}>
          Contact
        </h2>
        <p className="text-xs">{resume.phone}</p>
        <p className="text-xs">{resume.email}</p>
        <p className="text-xs">{resume.address}</p>
        <h2 className="font-semibold mt-4" style={{ color: resume.themeColor }}>
          Skills
        </h2>
        <section>
          <h2
            className="font-semibold mt-4"
            style={{ color: resume.themeColor }}
          >
            Skills
          </h2>
          {resume.skills.length ? (
            <div className="space-y-2 mt-2">
              {resume.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs">
                    <span>{skill.name}</span>
                    <span>{skill.level}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${skill.level * 20}%`,
                        backgroundColor: resume.themeColor,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              No skills added yet.
            </p>
          )}
        </section>
      </aside>
      <main className="col-span-3 space-y-4">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: resume.themeColor }}
          >
            {resume.name}
          </h1>
          <p className="text-lg italic">{resume.job}</p>
        </div>
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
      </main>
    </div>
  );
}
