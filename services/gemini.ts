import { GoogleGenAI } from "@google/genai";

// NOTE: In a real production app, never expose API keys on the client side.
// This should be proxied through a backend.
// For this demo, we assume the key is in process.env.API_KEY
const apiKey = process.env.API_KEY || '';

let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  if (!aiClient) {
    return "I'm sorry, my brain (API Key) is missing. Please check the configuration.";
  }

  try {
    const model = 'gemini-3-flash-preview'; 
    const systemInstruction = `You are a friendly, enthusiastic, and knowledgeable Paleontologist Assistant named 'DinoBuddy'. 
    Your audience is children (ages 6-12) and curious adults. 
    Keep your answers educational, scientifically accurate but easy to understand.
    Use analogies kids can understand (e.g., "as heavy as a school bus").
    If asked about things not related to dinosaurs or prehistory, gently steer the conversation back to dinosaurs.
    Format your responses with clean Markdown if necessary (bold for emphasis).
    Be concise.`;

    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Add new message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await aiClient.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 300, 
      }
    });

    return response.text || "Roar! I couldn't think of an answer just now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong while consulting the fossil records (API Error). Try again later!";
  }
};
