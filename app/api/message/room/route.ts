import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {
  const projectId = request.nextUrl.searchParams.get("projectId") || ""
  const userId = request.nextUrl.searchParams.get("userId") || ""
  const elastic = await getElasticClient();

  const must = []
  must.push({ match: { projectId: projectId } })
  must.push({ match: { userId: userId } })
  
  let result = await elastic.search({
    index: "messagerooms",
    size: 200,
    query: {
      bool: {
        must,
      },
    },
  });

  const users = result.hits.hits.map(item => item._source);

  return NextResponse.json(users);
}