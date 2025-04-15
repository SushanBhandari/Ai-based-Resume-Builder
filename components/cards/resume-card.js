import PersonalDetails from "../preview/personal-details";
import Link from "next/link";
import Summary from "../preview/summary";
export default function ResumeCard({ resume }) {
  return (
    <Link href={`/dashboard/resume/edit/${resume._id}`}>
      <div
        className="shadow-lg  w-full rounded-xl p-5 border-t-[20px] max-height-screen overflow-y-auto"
        style={{ borderColor: resume?.themeColor }}
      >
        <PersonalDetails resume={resume} />
        <Summary resume={resume} />
      </div>
    </Link>
  );
}
