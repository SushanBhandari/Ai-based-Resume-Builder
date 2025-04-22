"use client";

import React, { useEffect } from "react";
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
  year: "",
};

const skillField = {
  name: "",
  level: "", // Fixed typo here
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
  const [resume, setResume] = React.useState(initialState);
  const [resumes, setResumes] = React.useState([]);
  const [step, setStep] = React.useState(1);

  const [experienceList, setExperienceList] = React.useState([experienceField]);
  const [experienceLoading, setExperienceLoading] = React.useState({});

  const [educationList, setEducationList] = React.useState([educationField]);
  const [skillsList, setSkillsList] = React.useState([skillField]);

  const router = useRouter();
  const { _id } = useParams();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("/resume/create")) {
      setResume(initialState);
      setStep(1);
    }
  }, [pathname]);

  useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
  }, []);

  useEffect(() => {
    getUserResume();
  }, []);

  useEffect(() => {
    if (_id) getResume(_id);
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
      toast.error("Failed to save resume");
    }
  };

  const getUserResume = async () => {
    try {
      const data = await getUserResumeFromDb();
      setResumes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch resumes");
    }
  };

  const getResume = async () => {
    try {
      const data = await getResumeFromDb(_id);
      setResume(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get resume");
    }
  };

  const updateResume = async () => {
    try {
      const data = await updateResumeFromDb(resume);
      setResume(data);
      toast.success("Resume updated. Keep working");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update resume");
    }
  };

  const deleteResume = async (_id) => {
    try {
      await deleteResumeFromDb(_id);
      setResumes((prev) => prev.filter((r) => r._id !== _id));
      toast.success("Resume deleted successfully!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Oops! Failed to delete the resume.");
    }
  };

  // Centralize list syncing
  const syncListWithResume = (key, list) => {
    setResume((prev) => ({ ...prev, [key]: list }));
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
        setExperienceList,
        experienceLoading,
        setExperienceLoading,
        educationList,
        setEducationList,
        skillsList,
        setSkillsList,
        syncListWithResume,
        deleteResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
