"use server";
import db from "@/utils/db";
import Resume from "@/Models/resume";
import { currentUser } from "@clerk/nextjs/server";
import { throwDeprecation } from "process";

const checkOwnerShip = async (resumeId) => {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      throw new Error("User not found");
    }
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      throw new Error("Resume not found");
    }
    if (resume.userEmail !== userEmail) {
      throw new Error("Unauthorized");
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const saveResumetoDb = async (data) => {
  try {
    db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const { _id, ...rest } = data;

    const resume = await Resume.create({ ...rest, userEmail });
    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserResumeFromDb = async () => {
  try {
    db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const resumes = await Resume.find({ userEmail });
    return JSON.parse(JSON.stringify(resumes));
  } catch (err) {
    throw new Error(err);
  }
};

export const getResumeFromDb = async (_id) => {
  try {
    db();
    const resume = await Resume.findById(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateResumeFromDb = async (data) => {
  try {
    db();
    const { _id, ...rest } = data;
    //check ownership
    await checkOwnerShip(_id);

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { ...rest },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};
export const updateExperienceToDb = async (data) => {
  try {
    db();
    const { _id, experience } = data;
    //check ownership
    await checkOwnerShip(_id);
    const resume = await Resume.findByIdAndUpdate(
      _id,
      { experience },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateEducationToDb = async (data) => {
  try {
    db();
    const { _id, education } = data;
    //check ownership
    await checkOwnerShip(_id);
    const resume = await Resume.findByIdAndUpdate(
      _id,
      { education },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateSkillsToDb = async (data) => {
  try {
    db();
    const { _id, skills } = data;
    //check ownership
    await checkOwnerShip(_id);
    const resume = await Resume.findByIdAndUpdate(
      _id,
      { skills },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};
export const deleteResumeFromDb = async (_id) => {
  try {
    db();
    await checkOwnerShip(_id);
    const resume = await Resume.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err.message || "Failed to delete resume from database");
  }
};
