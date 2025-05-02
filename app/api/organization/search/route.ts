import { getElasticClient } from "@/utils/elastic";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface IOrganization {
    createdAt: Timestamp
    updatedAt: Timestamp
    organizationId: string
    organizationType: string
    organizationTypeText: string
    name: string
    phoneNumber: string
    isSuspended: boolean
    deletedAt?: Timestamp
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { query, organizationType } = body;

  if (organizationType === '') return NextResponse.json([])
  const elastic = await getElasticClient()

  const must = []
  must.push({ match: { organizationTypeText: organizationType } })
  if (query) must.push({ match: { name: query } })

  let result = await elastic.search({
    index: "organizations",
    size: 200,
    query: {
      bool: {
        must,
      },
    },
  });

  const organizations = result.hits.hits.map((item) => item._source);

  return NextResponse.json(organizations);
}
