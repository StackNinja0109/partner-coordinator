import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { address, event, type } = body;

  const elastic = await getElasticClient()

  const must = []
  if (type === 'leader')  must.push({ match_phrase: { onlyClubs: event} })
  else if (type === 'event') must.push({ match_phrase: { type: event} })
  must.push({ match_phrase: { areasOfActivityToCities: address} })

  let result = await elastic.search({
    index: "privateusers",
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
