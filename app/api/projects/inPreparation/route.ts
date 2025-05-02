import { db } from "@/libs/firebase/firebase";
import { getElasticClient } from "@/utils/elastic";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {

  try {

    const body = await request.json();
    const { projectId } = body;
        
    let docRef = doc(db, "leadersWantedProjects", projectId);
    
    try {
      await updateDoc(docRef, {
        status: "inpreparation"
      });
    } catch (error) {
      throw error;
    }
    
    const elastic = await getElasticClient();

    const res = await elastic.update({
      index: "leaderswantedprojects",
      id: projectId,
      body: {
        doc: {
          status: "inpreparation"
        }
      }
    });

    return NextResponse.json(res);

  } catch (error) {
    throw error;
  }
}