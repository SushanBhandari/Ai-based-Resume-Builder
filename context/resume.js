"use client";
import React, { Children, useEffect } from "react";
import {
  saveResumetoDb,
  getUserResumeFromDb,
  getResumeFromDb,
  updateResumeFromDb,
  updateExperienceToDb,
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
const initialState = {
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColour: "",
  experience: [experienceField],
};

export function ResumeProvider({ children }) {
  //state
  const [resume, setResume] = React.useState(initialState);
  const [step, setStep] = React.useState(1);
  const [resumes, setResumes] = React.useState([]);
  //experience
  const [experienceList, setExperienceList] = React.useState([experienceField]);
  const [experienceLoading, setExperienceLoading] = React.useState({});

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
    //setStep(4)
  };
  const addExperience = () => {
    const newExperience = { ...experienceField };
    setExperienceList([...experienceList, newExperience]);
  };
  const removeExperience = () => {
    if (experienceList.length === 1) return;
    const newEntries = experienceList.slice(0, experienceList.length - 1);
    setExperienceList(newEntries);
    //update the db with updated experiences
  };
  // const handleExperienceGenerateWithAi = async (index) => {
  //   setExperienceLoading((prevState) => ({ ...prevState, [index]: true }));
  //   const selectedExperience = experienceList[index];
  //   if (!selectedExperience || !selectedExperience.title) {
  //     toast.error(
  //       "please fill in the job details for the selected experience entry"
  //     );
  //     setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
  //     return;
  //   }
  //   const jobTitle = selectedExperience.title;
  //   const jobSummary = selectedExperience.summary || "";
  //   try {
  //     const response = await runAi(
  //       `Generate a list of duties and responsibilities in html bullet points for job title "${jobTitle}" ${jobSummary}`
  //     );
  //     const updatedExperienceList = experienceList.slice();
  //     updatedExperienceList[index] = {
  //       ...selectedExperience,
  //       summary: response,
  //     };
  //     setExperienceList(updatedExperienceList);
  //     setResume((prevState) => ({
  //       ...prevState,
  //       experience: updatedExperienceList,
  //     }));
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to generate job description");
  //   } finally {
  //     setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
  //   }
  // };

  const handleExperienceGenerateWithAi = async (index) => {
    setExperienceLoading((prevState) => ({ ...prevState, [index]: true }));
    const selectedExperience = experienceList[index];

    if (!selectedExperience || !selectedExperience.title) {
      toast.error(
        "Please fill in the job details for the selected experience entry"
      );
      setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
      return;
    }

    const jobTitle = selectedExperience.title;
    const jobSummary = selectedExperience.summary || "";

    try {
      const response = await runAi(
        `Generate a list of duties and responsibilities in HTML bullet points for job title "${jobTitle}" ${jobSummary}`
      );

      // 🔥 Remove ```html and ``` from the AI response
      const cleanSummary = response.replace(/```html|```/g, "").trim();

      const updatedExperienceList = [...experienceList];
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
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
