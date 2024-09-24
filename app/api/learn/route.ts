import { NextRequest, NextResponse } from "next/server";

const createVocabularySet = async ({
  name,
  createdAt,
}: {
  name: string;
  createdAt: typeof Date;
}) => {
  const res = await fetch(
    "https://66eee7fa3ed5bb4d0bf24f82.mockapi.io/api/v1/vocabularyDB/vocabularySet",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, createdAt }),
    }
  );
  if (!res.ok) return false;
  return true;
};

const getAllVocabularySet = async () => {
  const res = await fetch(
    "https://66eee7fa3ed5bb4d0bf24f82.mockapi.io/api/v1/vocabularyDB/vocabularySet",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (!res.ok) return { ok: false, data: undefined };
  return { ok: true, data: await res.json() };
};

const deleteVocabularySet = async (id: string) => {
  const res = await fetch(
    "https://66eee7fa3ed5bb4d0bf24f82.mockapi.io/api/v1/vocabularyDB/vocabularySet/" +
      id,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (!res.ok) return false;
  return true;
};

const updateVocabularySet = async (id: string, name: string) => {
  const res = await fetch(
    "https://66eee7fa3ed5bb4d0bf24f82.mockapi.io/api/v1/vocabularyDB/vocabularySet/" +
      id,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    }
  );
  if (!res.ok) return false;
  return true;
};

export async function POST(request: NextRequest) {
  try {
    const { name, createdAt } = await request.json();

    const res = await createVocabularySet({ name, createdAt });

    return new NextResponse(
      JSON.stringify({ ok: res, data: "hello from be" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

export async function GET() {
  try {
    const res = await getAllVocabularySet();
    return new NextResponse(JSON.stringify({ ok: res.ok, data: res.data }), {
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

export async function PUT(request: NextRequest) {
  try {
    const { id, name } = await request.json();
    const res = await updateVocabularySet(id, name);
    return new NextResponse(
      JSON.stringify({ ok: res, data: "hello from be" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const res = await deleteVocabularySet(id);
    return new NextResponse(
      JSON.stringify({ ok: res, data: "hello from be" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}
