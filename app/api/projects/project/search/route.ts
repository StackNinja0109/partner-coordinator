import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { prefecture, keyword, event, isOnly } = body

  const elastic = await getElasticClient();

  const must = [];
  must.push({ match: { status: 'inpublic' } });
  if (prefecture !== '') must.push({ match_phrase: { prefecture: prefecture} })
  if (keyword !== "") must.push({
    bool: {
      should: [
        { match: { organizationName: keyword} },
        { match: {eventName: keyword} },
      ]
    }
  })


  if (event !== "") must.push({ match: { eventName: event } });
  
  if (isOnly === 'isShowRequiredOption') {
    const filterItems = ['candidate', 'message']
    const fieldQueries = filterItems.map((field) => ({
      term: { [field]: true },
    }))
    must.push({
      bool: {
        should: fieldQueries,
      },
    })
  }

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
