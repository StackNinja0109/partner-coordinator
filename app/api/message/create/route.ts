import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json()
	const { id, document } = body
	const elastic = await getElasticClient();

	let result = await elastic.index({
		index: "messagerooms",
		id,
		document,
	});

	return NextResponse.json(result);
}