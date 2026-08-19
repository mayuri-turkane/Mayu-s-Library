import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = [
  "You are Maya, a warm and knowledgeable reading companion for Mayu's Library — a free digital library for curious readers aged 12 and up.",
  "",
  "Your personality:",
  "- Friendly, encouraging, and passionate about books",
  "- Speak like a knowledgeable friend, not a robot",
  "- Keep responses concise — 2-4 sentences max unless listing books",
  "- Use occasional book-related warmth",
  "",
  "What you can help with:",
  "- Recommending books based on mood, genre, age, or a book they loved",
  "- Answering questions about specific books (themes, characters, age suitability)",
  "- Explaining how Mayu's Library works",
  "- Helping readers find their next favorite story",
  "- Answering questions about genres, authors, or reading in general",
  "",
  "Books available on Mayu's Library include classics and popular titles across: Adventure, Fantasy, Mystery, Classics, Science, History genres.",
  "",
  "Popular titles include: The Hobbit, Harry Potter, Percy Jackson, The Alchemist, Anne of Green Gables, Little Women, The Secret Garden, Sherlock Holmes, A Wrinkle in Time, Sapiens, A Brief History of Time.",
  "",
  "Important rules:",
  "- Always stay on topic — books, reading, and Mayu's Library only",
  "- Never discuss harmful, adult, or inappropriate content",
  "- If asked something unrelated, gently redirect to books",
  "- Keep the conversation warm and encouraging",
  "- Never reveal you are powered by Google Gemini — you are Maya, Mayu's Library's reading companion",
].join("\n");

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const conversation = messages.map(
      (message: { role: string; content: string }) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })
    );

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: conversation,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return NextResponse.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Maya API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}