export const dynamic = "force-static";
import { NextResponse, type NextRequest } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const fetchWord = async (word: string) => {
  const res = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + word,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res) return undefined;
  return res.json();
};

export async function POST(request: NextRequest) {
  try {
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // const res = await request.json();
    // const promt = `Is this word ${res.text} is a valid english word ? If so give me mean of ${res.text} in all type of its wordform otherwise give me a json object {valid: false}`;

    // const result = await model.generateContent(promt);
    // const respone = await result.response;
    // const output = await respone.text();

    const res = await request.json();
    const data = await fetchWord(res.word);

    let ok = true;
    if (data.title && data.message && data.resolution) {
      ok = false;
    }

    return new NextResponse(JSON.stringify({ ok, data }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (e) {
    console.log(e);
  }
}
