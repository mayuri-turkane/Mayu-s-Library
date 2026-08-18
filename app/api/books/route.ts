import { NextRequest, NextResponse } from "next/server";

import {
  getBooksByGenre,
  searchOpenLibrary,
} from "../../../lib/open-library";

export async function GET(
  request: NextRequest
) {
  try {
    const searchParams =
      request.nextUrl.searchParams;

    const query =
      searchParams.get("q")?.trim();

    const genre =
      searchParams.get("genre")?.trim();

    const limit = Math.min(
      Number(searchParams.get("limit")) || 8,
      12
    );

    let books;

    if (genre) {
      books = await getBooksByGenre(
        genre,
        limit
      );
    } else {
      books = await searchOpenLibrary(
        query || "fiction",
        limit
      );
    }

    return NextResponse.json({
      success: true,
      books,
      count: books.length,
    });
  } catch (error) {
    console.error(
      "Book API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        books: [],
        count: 0,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load books from Open Library.",
      },
      {
        status: 500,
      }
    );
  }
}