"use server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAi = new GoogleGenerativeAI(apiKey);

export async function runAi(prompt) {
  const model = genAi.getGenerativeModel({
    model: "gemini-1.5-pro",
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
