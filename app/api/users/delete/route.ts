import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {

  try {

    const body = await request.json();
    const { userId } = body;
    const elastic = await getElasticClient();

    const res = await elastic.delete({
      index: "privateusers",
      id: userId,
    });

    return NextResponse.json(res);

  } catch (error) {
    throw error;
  }
}