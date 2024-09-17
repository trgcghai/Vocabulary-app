export const dynamic = "force-static";
import { NextResponse, type NextRequest } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const fetchTranslate = async (text: string, source: string, target: string) => {
  const url = "https://deep-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "9dd4aa8df6msh9277c82bf9fa2f9p149337jsn1e82434409ba",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      source: source,
      target: target,
    }),
  };
  const res = await fetch(url, options);
  if (!res.ok) return undefined;
  return res.json();
};

export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json();
    console.log(JSON.stringify({ q: text, source: from, target: to }));
    const data = await fetchTranslate(text, from, to);

    return new NextResponse(JSON.stringify({ data }), {
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
