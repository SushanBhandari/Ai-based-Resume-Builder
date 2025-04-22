"use server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAi = new GoogleGenerativeAI(apiKey);

// Main function to run AI prompt
export async function runAi(prompt) {
  try {
    const model = genAi.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    // Return a safe fallback or throw
    return "Sorry, I couldn't process your request right now. Please try again later.";
  }
}
