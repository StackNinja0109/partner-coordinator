import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";
  const isOnly = request.nextUrl.searchParams.get("isOnly") || ""

  const elastic = await getElasticClient();

  const must = []
  must.push({ match: { status: 'inpublic' } });
  if (query !== "") {
    must.push({
      bool: {
        should: [
          { match: { organizer: query } },
          { match: { title: query } }
        ]
      }
    })
  }

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
    index: "eventprojects",
    size: 200,
    query: {
      bool: {
        must,
      },
    },
  })

  const event = result.hits.hits.map((item) => item._source)

  return NextResponse.json(event);
}
