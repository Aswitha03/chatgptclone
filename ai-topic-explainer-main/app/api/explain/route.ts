import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Please enter a topic" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY!
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `Explain the topic "${topic}" in simple terms for a student.`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    return NextResponse.json({
      explanation: text,
    });
  }catch (error) {
  console.error("API Error:", error);

  return NextResponse.json(
    { error: "Failed to generate explanation" },
    { status: 500 }
  );
}
}

