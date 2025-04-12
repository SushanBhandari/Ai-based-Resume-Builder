"use client";
import React, { Children } from "react";
const ResumeContext = React.createContext();
const initialState = {
  name: "",
  job: "",
  assress: "",
  phone: "",
  email: "",
  themeColour: "",
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = React.useState(initialState);
  const [step, setStep] = React.useState(1);
  return (
    <ResumeContext.Provider value={{ step, setStep, resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
