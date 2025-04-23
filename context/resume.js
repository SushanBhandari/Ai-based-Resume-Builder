"use client";
import React, { Children, useEffect } from "react";
import {
  saveResumetoDb,
  getUserResumeFromDb,
  getResumeFromDb,
  updateResumeFromDb,
  updateExperienceToDb,
  updateEducationToDb,
  updateSkillsToDb,
  deleteResumeFromDb,
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
const skillField = {
  name: "",
  lelev: "",
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
  skills: [skillField],
};

export function ResumeProvider({ children }) {
  //state
  const [resume, setResume] = React.useState(initialState);
  const [resumes, setResumes] = React.useState([]);
  const [step, setStep] = React.useState([1]);

  //experience
  const [experienceList, setExperienceList] = React.useState([experienceField]);
  const [experienceLoading, setExperienceLoading] = React.useState({});
  //
  const [educationList, setEducationList] = React.useState([educationField]);
  //skills
  const [skillsList, setSkillsList] = React.useState([skillField]);
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
        "Please fill in the job details for the selected experience entry"
      );
      setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
      return;
    }

    const jobTitle = selectedExperience.title;
    const jobSummary = selectedExperience.summary || "";

    try {
      const response = await runAi(`
        Generate a list of duties and responsibilities 4 bullet points in HTML <ul> format for the job title "${jobTitle}". 
        Each bullet point should describe a key duty or responsibility. 
        If the following summary is provided, consider it: "${jobSummary}". 
        Only return the <ul> element.`);

      if (!response || response.length < 10) {
        toast.error("AI returned an incomplete summary.");
        return;
      }

      const cleanSummary = response.trim(); // Keeping the <ul> formatting

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
    setStep(5);
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
    updateEducation(newEntries);
  };

  //skill section
  React.useEffect(() => {
    if (resume.skills) {
      setSkillsList(resume.skills);
    }
  }, [resume]);

  const updateSkills = async (skillsList) => {
    //validation that each skill has both name and label
    const invalidSkills = skillsList.filter(
      (skill) => !skill.name || !skill.level
    );
    if (invalidSkills.length > 0) {
      toast.error("please fill the box skill and level");
      return;
    }
    try {
      const data = await updateSkillsToDb({
        ...resume,
        skills: skillsList,
      });
      setResume(data);
      toast.success("Skills Updated. Keep Working");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Skills");
    }
  };
  const handleSkillsChange = (e, index) => {
    const newEntries = [...skillsList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const handleSkillsSubmit = () => {
    updateSkills(skillsList);
    router.push(`/dashboard/resume/download/${resume._id}`);
  };

  const addSkill = () => {
    const newSkill = { ...skillField };
    setSkillsList([...skillsList, newSkill]);
    setResume((prevState) => ({
      ...prevState,
      skills: [...skillsList, newSkill],
    }));
  };
  const removeSkill = () => {
    if (skillsList.length === 1) return;
    const newEntries = skillsList.slice(0, skillsList.length - 1);
    setSkillsList(newEntries);
    //update the db with updated education array
    updateSkills(newEntries);
  };

  const deleteResume = async (_id) => {
    try {
      await deleteResumeFromDb(_id);
      setResume((prevResumes) =>
        resumes.filter((resume) => resume._id !== _id)
      );
      toast.success("Resume deleted successfully!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Oops! Failed to delete the resume.");
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
        educationList,
        handleEducationChange,
        handleEducationSubmit,
        addEducation,
        removeEducation,
        skillsList,
        setSkillsList,
        handleSkillsChange,
        handleSkillsSubmit,
        addSkill,
        removeSkill,
        deleteResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
