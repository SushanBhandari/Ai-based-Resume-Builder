"use client";
import React, { Children } from "react";
import {
  saveResumetoDb,
  getUserResumeFromDb,
  getResumeFromDb,
  updateResumeFromDb,
} from "@/actions/resume";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

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
  //state
  const [resume, setResume] = React.useState(initialState);
  const [step, setStep] = React.useState(1);
  const [resumes, setResumes] = React.useState([]);
  //hooks
  const router = useRouter();
  const { _id } = useParams();

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
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
