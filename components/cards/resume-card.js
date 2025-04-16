import PersonalDetails from "../preview/personal-details";
import Link from "next/link";
import Summary from "../preview/summary";
import Experience from "../preview/experience";
import Education from "../preview/education";

export default function ResumeCard({ resume }) {
  return (
    <Link href={`/dashboard/resume/edit/${resume._id}`}>
      <div
        className="shadow-lg  w-full rounded-xl p-5 border-t-[20px] max-height-screen overflow-y-auto"
        style={{ borderColor: resume?.themeColor }}
      >
        <div className="line-clamp-3">
          <PersonalDetails resume={resume} />
        </div>
        <div className="line-clamp-4">
          <Summary resume={resume} />
        </div>
        <div className="line-clamp-4">
          <Experience resume={resume} />
        </div>
        <div className="line-clamp-3">
          <Education resume={resume} />
        </div>
      </div>
    </Link>
  );
}
