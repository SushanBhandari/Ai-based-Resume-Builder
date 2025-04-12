"use client";
import React, { Children } from "react";
import { saveResumetoDb } from "@/actions/resume";
import toast from "react-hot-toast";
import { set } from "mongoose";
const ResumeContext = React.createContext();
const initialState = {
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColour: "",
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = React.useState(initialState);
  const [step, setStep] = React.useState(1);
  React.useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      try {
        setResume(JSON.parse(savedResume));
      } catch (err) {
        console.error("Error prasing saver resume:", err);
      }
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem("resume", JSON.stringify(resume));
  }, [resume]);

  const saveResume = async () => {
    try {
      const data = await saveResumetoDb(resume);
      setResume(data);
      toast.success("Resume saved. Keep working");
      setStep(2);
    } catch (error) {
      console.error(error);
      toast.alert("Failed to save resume");
    }
  };

  return (
    <ResumeContext.Provider
      value={{ step, setStep, resume, setResume, saveResume }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
