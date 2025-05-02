import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {

  const body = await request.json()
  const { prefecture, keyword, event } = body
   
  const elastic = await getElasticClient();

  const must = [];
  must.push({ match: { status: 'finished' } });
  if (prefecture !== '') must.push({ match_phrase: { prefecture: prefecture} })
  if (keyword !== "") if (keyword !== "") must.push({
    bool: {
      should: [
        { match: { organizationName: keyword} },
        { match: {eventName: keyword} },
      ]
    }
  })
  if (event !== "") must.push({ match: { eventName: event } });

  let result = await elastic.search({
    index: "leaderswantedprojects",
    size: 200,
    query: {
      bool: {
        must,
      },
    },
  });

  const project = result.hits.hits.map((item) => item._source);
 
  return NextResponse.json(project);
}