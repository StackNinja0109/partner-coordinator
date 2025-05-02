import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectId, userId } = body;

  const elastic = await getElasticClient()

  const must = []
  must.push({ match: { projectId: projectId } })
  must.push({ match: { userId: userId } })

  let result = await elastic.search({
    index: "leaderswantedprojectsscoutlist",
    size: 200,
    query: {
      bool: {
        must,
      },
    },
  });

  const user = result.hits.hits.map((item) => item._source);

  return NextResponse.json(user);
}
