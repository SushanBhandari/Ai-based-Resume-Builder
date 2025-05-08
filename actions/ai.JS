"use server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function runAi(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // ✅ Light, fast version
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    return "Sorry, I couldn't process your request right now. Please try again later.";
  }
}
