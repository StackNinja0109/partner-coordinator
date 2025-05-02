import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";
import { IMessageRoomProps } from "../messageType";

export async function POST(
  request: NextRequest
) {
  const body = await request.json()
  const { selectedProjectId } = body
  const elastic = await getElasticClient();

  const must = []
  must.push({ match: { projectId: selectedProjectId } })

  let result = await elastic.search({
    index: "messagerooms",
    size: 200,
    query: {
      bool: {
        must,
      },
    },
  });

  const users = result.hits.hits.map(item => {
    const messageRoomObject = item._source as IMessageRoomProps
    const { roomId, userId, projectId, userName, unreadCount, avatar, lastAccessedAt } = messageRoomObject
    return {
      roomId,
      userId,
      projectId,
      name: userName,
      unreadCount,
      avatar,
      userLastAccessAt: lastAccessedAt,
    }
  });

  return NextResponse.json(users);
}