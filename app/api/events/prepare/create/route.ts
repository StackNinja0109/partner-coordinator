import { createData } from "@/libs/firebase/firestore/project";
import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@elastic/elasticsearch";

export async function POST(
  request: NextRequest
) {

  try {

    const body = await request.json();
    const { projectId, project } = body;

    const { error } = await createData(
      "eventProjects",
      projectId,
      project
    );

    if (error) {
      throw error;
    }

    const elastic = await getElasticClient();

    const res = await elastic.index({
      index: "eventprojects",
      id: projectId,
      document: {
        id: projectId,
        title: project.title,
        schoolName: project.schoolName,
        gender: project.gender,
        organizer: project.organizer,
        status: project.status,
        createdAt: project.createdAt,
        recruitCount: 0,
        adoptCount: 0,
        selectCount: 0,
        candidate: false,
        message: false,
      },
    });

    return NextResponse.json(res);

  } catch (error) {
    throw error;
  }
}