import { db } from "@/libs/firebase/firebase";
import { getElasticClient } from "@/utils/elastic";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {

  try {

    const body = await request.json();
    const { eventId } = body;
        
    let docRef = doc(db, "eventProjects", eventId);
    
    try {
      await updateDoc(docRef, {
        status: "inpublic",
      });
    } catch (error) {
      throw error;
    }
    
    const elastic = await getElasticClient();

    const res = await elastic.update({
      index: "eventprojects",
      id: eventId,
      body: {
        doc: {
          status: "inpublic",
          startedAt: Timestamp.now(),
        }
      }
    });

    return NextResponse.json(res);

  } catch (error) {
    throw error;
  }
}