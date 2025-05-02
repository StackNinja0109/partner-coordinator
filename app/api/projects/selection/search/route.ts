import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const organization = request.nextUrl.searchParams.get("organization") || "";
  const isOnly = request.nextUrl.searchParams.get("isOnly") || "";
  const isDecline = request.nextUrl.searchParams.get("isDecline") || "";
  const projectId = request.nextUrl.searchParams.get("projectId") || "";

  const elastic = await getElasticClient();

  const must = [];
  if (organization !== "") must.push({ match: { organization: organization } });
  if (projectId !== "") must.push({ match: { projectId: projectId } });

  // -----    START UNREADMESSAGEONLY SECTION   ----- //
  if (isOnly === 'isUnreadMessagesOnly') {
    must.push({
      terms: {
        isUnread: [true]
      }
    })
  }
  // *****    END UNREADMESSAGEONLY SECTION   ***** //

  // -----    START ISSHOWRECTIONANDDECLINE SECTION   ----- //
  if (isDecline === 'isShowRejectionAndDecline') {
    must.push({
      terms: {
        status: ['notstarted', 'inprogress', 'interview', 'adopted', 'change', 'notadopted', 'cancel']
      }
    })
  } else {
    must.push({
      terms: {
        status: ['notstarted', 'inprogress', 'interview', 'adopted', 'change']
      }
    })
  }
  // *****    END ISSHOWRECTIONANDDECLINE SECTION   ***** //

  let result = await elastic.search({
    index: "leaderswantedprojectsselectionlist",
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
