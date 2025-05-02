import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";

  const elastic = await getElasticClient();

  const must = [];
  must.push({ match: { status: 'inpreparation' } });
  if (query !== "") {
    must.push({
      bool: {
        should: [
          { match: { organizer: query } },
          { match: { title: query } }
        ]
      }
    });
  }

  let result = await elastic.search({
    index: "eventprojects",
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
