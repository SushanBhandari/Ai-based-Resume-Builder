"use client";
import React, { Children, useEffect } from "react";
import {
  saveResumetoDb,
  getUserResumeFromDb,
  getResumeFromDb,
  updateResumeFromDb,
  updateExperienceToDb,
  updateEducationToDb,
  updateSkillToDb,
} from "@/actions/resume";
import toast from "react-hot-toast";
import { useRouter, useParams, usePathname } from "next/navigation";
import { runAi } from "@/actions/ai";
const ResumeContext = React.createContext();
const experienceField = {
  title: "",
  company: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
};
const educationField = {
  name: "",
  address: "",
  qualification: "",
  qualification: "",
  year: "",
};
const initialState = {
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColour: "",
  experience: [experienceField],
  education: [educationField],
};

export function ResumeProvider({ children }) {
  //state
  const [resume, setResume] = React.useState(initialState);
  const [step, setStep] = React.useState(1);
  const [resumes, setResumes] = React.useState([4]);
  //experience
  const [experienceList, setExperienceList] = React.useState([experienceField]);
  const [experienceLoading, setExperienceLoading] = React.useState({});
  //
  const [educationList, setEducationList] = React.useState([educationField]);

  //hooks
  const router = useRouter();
  const { _id } = useParams();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname?.includes("/resume/create")) {
      setResume(initialState);
      setStep(1);
    }
  }, [pathname]);

  React.useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
  }, []);
  React.useEffect(() => {
    getUserResume();
  }, []);

  React.useEffect(() => {
    if (_id) {
      getResume(_id);
    }
  }, [_id]);

  const saveResume = async () => {
    try {
      const data = await saveResumetoDb(resume);
      setResume(data);
      localStorage.removeItem("resume");
      toast.success("Resume saved. Keep working");
      router.push(`/dashboard/resume/edit/${data._id}`);
    } catch (error) {
      console.error(error);
      toast.alert("Failed to save resume");
    }
  };
  const getUserResume = async () => {
    try {
      const data = await getUserResumeFromDb();
      setResumes(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to save Resume");
    }
  };

  const getResume = async () => {
    try {
      const data = await getResumeFromDb(_id);
      setResume(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get Resume");
    }
  };
  const updateResume = async () => {
    try {
      const data = await updateResumeFromDb(resume);
      setResume(data);
      toast.success("Resume updated.  Keep working");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update resume");
    }
  };

  const updateExperience = async (experienceList) => {
    try {
      const data = await updateExperienceToDb({
        ...resume,
        experience: experienceList,
      });
      setResume(data);
      toast.success("Experience Updated. Keep Working");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update experience");
    }
  };

  //expreience section
  React.useEffect(() => {
    if (resume.experience) {
      setExperienceList(resume.experience);
    }
  }, [resume]);

  const handleExperienceChange = (e, index) => {
    const newEntries = [...experienceList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };
  const handleExperiencetiptapChange = (value, index) => {
    const newEntries = [...experienceList];
    newEntries[index].summary = value;
    setExperienceList(newEntries);
  };
  const handleExperienceSubmit = () => {
    updateExperience(experienceList);
    setStep(4);
  };
  const addExperience = () => {
    const newExperience = { ...experienceField };
    setExperienceList([...experienceList, newExperience]);
    setResume((prevState) => ({
      ...prevState,
      experience: [...experienceList, newExperience],
    }));
  };
  const removeExperience = () => {
    if (experienceList.length === 1) return;
    const newEntries = experienceList.slice(0, experienceList.length - 1);
    setExperienceList(newEntries);
    //update the db with updated experiences
    updateExperience(newEntries);
  };
  const handleExperienceGenerateWithAi = async (index) => {
    setExperienceLoading((prevState) => ({ ...prevState, [index]: true }));
    const selectedExperience = experienceList[index];
    if (!selectedExperience || !selectedExperience.title) {
      toast.error(
        "please fill in the job details for the selected experience entry"
      );
      setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
      return;
    }
    const jobTitle = selectedExperience.title;
    const jobSummary = selectedExperience.summary || "";
    try {
      const response = await runAi(
        `Generate a list of duties and responsibilities in html bullet points for job title "${jobTitle}" ${jobSummary} Just give 4 bullet points in a  with their subtopics in a bold`
      );

      const cleanSummary = response.replace(/```html|```/g, "").trim();

      const updatedExperienceList = experienceList.slice();
      updatedExperienceList[index] = {
        ...selectedExperience,
        summary: cleanSummary,
      };
      setExperienceList(updatedExperienceList);
      setResume((prevState) => ({
        ...prevState,
        experience: updatedExperienceList,
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate job description");
    } finally {
      setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
    }
  };
  //education
  React.useEffect(() => {
    if (resume.education) {
      setEducationList(resume.education);
    }
  }, [resume]);

  const updateEducation = async (educationList) => {
    try {
      const data = await updateEducationToDb({
        ...resume,
        education: educationList,
      });
      setResume(data);
      toast.success("Education Updated. Keep Working");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Education");
    }
  };

  const handleEducationChange = (e, index) => {
    const newEntries = [...educationList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };
  const handleEducationSubmit = () => {
    updateEducation(educationList);
    // setStep(5);
  };
  const addEducation = () => {
    const newEducation = { ...educationField };
    setEducationList([...educationList, newEducation]);
    setResume((prevState) => ({
      ...prevState,
      education: [...educationList, newEducation],
    }));
  };
  const removeEducation = () => {
    if (educationList.length === 1) return;
    const newEntries = educationList.slice(0, educationList.length - 1);
    setEducationList(newEntries);
    //update the db with updated education array
  };

  //skill section
  React.useEffect(() => {
    if (resume.skills) {
      setSkillsList(resume.skills);
    }
  });

  return (
    <ResumeContext.Provider
      value={{
        step,
        setStep,
        resume,
        setResume,
        saveResume,
        resumes,
        updateResume,
        experienceList,
        experienceLoading,
        handleExperienceChange,
        handleExperiencetiptapChange,
        handleExperienceSubmit,
        addExperience,
        removeExperience,
        handleExperienceGenerateWithAi,
        educationList,
        handleEducationChange,
        handleEducationSubmit,
        addEducation,
        removeEducation,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
