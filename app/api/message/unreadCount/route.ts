import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";
import { IMessageRoomProps } from "../messageType";

export async function POST(
	request: NextRequest
) {
	const body = await request.json()
	const { projectId } = body
	const elastic = await getElasticClient();

	const must = []
	must.push({ match: { projectId: projectId } })

	let result = await elastic.search({
		index: "messagerooms",
		size: 200,
		query: {
			bool: {
				must,
			},
		},
	});

	let unreadCount = 0
	const users = result.hits.hits.forEach(item => {
		const messageRoomObject = item._source as IMessageRoomProps
		unreadCount += messageRoomObject.unreadCount
	});

	return NextResponse.json({
		unreadCount,
	});
}