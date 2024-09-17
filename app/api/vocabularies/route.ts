export const dynamic = "force-static";
import { NextResponse, type NextRequest } from "next/server";

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
