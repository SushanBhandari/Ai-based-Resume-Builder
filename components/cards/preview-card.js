import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import { useResume } from "@/context/resume";
import Experience from "@/components/preview/experience";
import Education from "../preview/education";
import Skills from "../preview/skills";
export default function ResumeCard() {
  const { resume } = useResume();

  return (
    <div
      className="shadow-lg max-h-screen   w-full rounded-xl p-5 border-t-[20px] overflow-y-auto "
      style={{ borderColor: resume?.themeColor }}
    >
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Skills resume={resume} />
    </div>
  );
}
