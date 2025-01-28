import { NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const data = await db.select().from(advocates).limit(limit).offset(offset);

    const totalRecords = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(advocates);

    return NextResponse.json(
      {
        data,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalRecords[0].count / limit),
          totalRecords: totalRecords[0].count,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching advocates:", error);

    return NextResponse.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
