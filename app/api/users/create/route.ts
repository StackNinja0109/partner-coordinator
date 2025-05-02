import { getElasticClient } from "@/utils/elastic"
import { NextRequest, NextResponse } from "next/server"
import { Client } from "@elastic/elasticsearch"

async function createIndexIfNotExists(elastic: Client) {
  const indexExists = await elastic.indices.exists({ index: "privateusers" });
  if (!indexExists) {
    await elastic.indices.create({
      index: "privateusers",
      body: {
        mappings: {
          properties: {
            club: { type: "text", analyzer: "kuromoji" },
            type: { type: "text", analyzer: "kuromoji" },
            organization: { type: "text", analyzer: "kuromoji" },
          },
        },
      },
    });
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();
    const { userId, document } = body;
    const elastic = await getElasticClient();
    await createIndexIfNotExists(elastic);

    const res = await elastic.index({
      index: "privateusers",
      id: userId,
      document: document,
    })

    return NextResponse.json(res);

  } catch (error) {
    throw error;
  }
}