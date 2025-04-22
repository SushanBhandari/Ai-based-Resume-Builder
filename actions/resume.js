"use server";

import db from "@/utils/db";
import Resume from "@/Models/resume";
import { currentUser } from "@clerk/nextjs/server";

// Utility: Get current user email
const getUserEmail = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!email) throw new Error("User email not found.");
  return email;
};

// Utility: Check if current user owns the resume
const checkOwnership = async (resumeId) => {
  const email = await getUserEmail();
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume not found.");
  if (resume.userEmail !== email) throw new Error("Unauthorized access.");
};

// Save new resume
export const saveResumetoDb = async (data) => {
  try {
    db();
    const userEmail = await getUserEmail();
    const { _id, ...rest } = data;
    const resume = await Resume.create({ ...rest, userEmail });
    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error(error.message || "Failed to save resume.");
  }
};

// Get all resumes of current user
export const getUserResumeFromDb = async () => {
  try {
    db();
    const userEmail = await getUserEmail();
    const resumes = await Resume.find({ userEmail });
    return JSON.parse(JSON.stringify(resumes));
  } catch (err) {
    throw new Error(err.message || "Failed to fetch resumes.");
  }
};

// Get single resume by ID
export const getResumeFromDb = async (_id) => {
  try {
    db();
    const resume = await Resume.findById(_id);
    if (!resume) throw new Error("Resume not found.");
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err.message || "Failed to fetch resume.");
  }
};

// Update entire resume
export const updateResumeFromDb = async (data) => {
  try {
    db();
    const { _id, ...rest } = data;
    await checkOwnership(_id);
    const resume = await Resume.findByIdAndUpdate(_id, rest, { new: true });
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err.message || "Failed to update resume.");
  }
};

// Update only experience
export const updateExperienceToDb = async ({ _id, experience }) => {
  try {
    db();
    await checkOwnership(_id);
    const resume = await Resume.findByIdAndUpdate(
      _id,
      { experience },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err.message || "Failed to update experience.");
  }
};

// Update only education
export const updateEducationToDb = async ({ _id, education }) => {
  try {
    db();
    await checkOwnership(_id);
    const resume = await Resume.findByIdAndUpdate(
      _id,
      { education },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err.message || "Failed to update education.");
  }
};

// Update only skills
export const updateSkillsToDb = async ({ _id, skills }) => {
  try {
    db();
    await checkOwnership(_id);
    const resume = await Resume.findByIdAndUpdate(
      _id,
      { skills },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err.message || "Failed to update skills.");
  }
};

// Delete resume
export const deleteResumeFromDb = async (_id) => {
  try {
    db();
    await checkOwnership(_id);
    const resume = await Resume.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err.message || "Failed to delete resume.");
  }
};
