import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await fetch(
    "https://65193f6b818c4e98ac6030e4.mockapi.io/movies",
    {
      next: {
        tags: ["products"],
      },
    }
  );

  const data = await res.json();

  return NextResponse.json({ data });
}
