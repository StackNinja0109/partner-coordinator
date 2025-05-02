import { db } from "@/libs/firebase/firebase";
import { getElasticClient } from "@/utils/elastic";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {

  try {

    const body = await request.json();
    const { projectId } = body;
    
    let docRef = doc(db, "leadersWantedProjects", projectId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }

    const elastic = await getElasticClient();

    const res = await elastic.delete({
      index: "leaderswantedprojects",
      id: projectId,
    });
    return NextResponse.json(res);

  } catch (error) {
    throw error;
  }
}