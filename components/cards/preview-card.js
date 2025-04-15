import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import { useResume } from "@/context/resume";
export default function ResumeCard() {
  const { resume } = useResume();

  return (
    <div
      className="shadow-lg max-h-screen  w-full rounded-xl p-5 border-t-[20px] "
      style={{ borderColor: resume?.themeColor }}
    >
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
    </div>
  );
}
