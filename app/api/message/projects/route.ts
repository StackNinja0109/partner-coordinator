import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";
import { IMessageRoomProps } from "../messageType";

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { keyword } = body
  const elastic = await getElasticClient();

  const must = []

  if (keyword) must.push({
    bool: {
      should: [
        { match: { organizationName: keyword} },
        { match: { eventName: keyword }}
      ]
    }
  })
  
  let result = await elastic.search({
    index: "messagerooms",
    size: 200,
    query: {
      bool: {
        must,
      },
    },
  });

  let projects = {}

  result.hits.hits.forEach(item => {
    const messageRoomObject = item._source as IMessageRoomProps
    const { projectId, organizationName, eventName, gender, unreadCount, projectCreatedAt, lastMessage } = messageRoomObject
    if (!projects[projectId]) {
      projects[projectId] = {
        projectId,
        organizationName,
        eventName,
        gender,
        unreadCount,
        date: projectCreatedAt,
        lastMessage,
      }
    } else {
      projects[projectId] = {
        ...projects[projectId],
        unreadCount: projects[projectId].unreadCount + unreadCount,
      }
    }
  });

  return NextResponse.json(Object.values(projects));
}