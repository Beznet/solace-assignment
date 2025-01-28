import { NextResponse } from "next/server";
import { eq, ilike, or, sql } from "drizzle-orm";
import db from "@/db";
import { advocates } from "@/db/schema";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("searchTerm")?.toLowerCase();

  if (!searchTerm) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }

  try {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const results = await db
      .select()
      .from(advocates)
      .where(
        or(
          ilike(advocates.firstName, `%${searchTerm}%`),
          ilike(advocates.lastName, `%${searchTerm}%`),
          ilike(advocates.city, `%${searchTerm}%`),
          ilike(advocates.degree, `%${searchTerm}%`),
          ilike(sql`${advocates.specialties}::text`, `%${searchTerm}%`)
        )
      )
      .limit(limit)
      .offset(offset);

    const totalRecords = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(advocates)
      .where(
        or(
          ilike(advocates.firstName, `%${searchTerm}%`),
          ilike(advocates.lastName, `%${searchTerm}%`),
          ilike(advocates.city, `%${searchTerm}%`),
          ilike(advocates.degree, `%${searchTerm}%`),
          ilike(sql`${advocates.specialties}::text`, `%${searchTerm}%`)
        )
      );

    return NextResponse.json(
      {
        data: results,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalRecords[0].count / limit),
          totalRecords: totalRecords[0].count,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error searching for advocates:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
