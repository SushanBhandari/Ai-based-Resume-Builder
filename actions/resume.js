"use server";
import db from "@/utils/db";
import Resume from "@/Models/resume";
import { currentUser } from "@clerk/nextjs/server";

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
