import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import Experience from "@/components/preview/experience";
import Education from "../preview/education";
import Skills from "../preview/skills";
import { useResume } from "@/context/resume";

export default function ResumeCard() {
  const { resume } = useResume();

  return (
    <div
      className="w-full max-w-3xl h-full bg-white dark:bg-background rounded-2xl border shadow-md overflow-y-auto animate-fadeIn p-6 space-y-6"
      style={{ borderTop: `6px solid ${resume?.themeColor || "#3b82f6"}` }}
    >
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skills resume={resume} />
    </div>
  );
}
