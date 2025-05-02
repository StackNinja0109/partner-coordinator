import { DocRef } from "@/libs/firebase/firestore";
import { getElasticClient } from "@/utils/elastic";
import { updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();
    const { interviewAt, docId } = body;

    const elastic = await getElasticClient();

    const res = await elastic.update({
      index: "leaderswantedprojectsselectionlist",
      id: docId,
      body: {
        doc: {
          interviewAt: interviewAt,
          isSetInterview: true,
        }
      }
    });

    return NextResponse.json(res);

  } catch (error) {
    throw error;
  }
}