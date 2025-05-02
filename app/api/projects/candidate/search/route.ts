import { getElasticClient } from "@/utils/elastic"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const organization = request.nextUrl.searchParams.get("organization") || ""
  const isOnly = request.nextUrl.searchParams.get("isOnly") || ""
  const isShowNG = request.nextUrl.searchParams.get("isShowNG") || ""
  const desiredGender = request.nextUrl.searchParams.get("desiredGender") || ""
  const desiredAge = request.nextUrl.searchParams.get("desiredAge") || ""
  const desiredQualifications = request.nextUrl.searchParams.get("desiredQualifications") || ""
  const other = request.nextUrl.searchParams.get("other") || ""
  const projectId = request.nextUrl.searchParams.get("projectId") || ""
  const status = request.nextUrl.searchParams.get("status") || ""

  const elastic = await getElasticClient()

  const must = []
  if (organization !== "") must.push({ match: { organization: organization } })
  if (projectId !== "") must.push({ match: { projectId: projectId } })
  if (status !== "") must.push({ match: { status: status } })

  // -----    START NOTINTERTESTEDANDNG SECTION   ----- //
  if (isShowNG === 'isShowNG') {
    must.push({
      terms: {
        status: ['unsend', 'scouted', 'notinterested', 'ng']
      }
    })
  } else {
    must.push({
      terms: {
        status: ['unsend', 'scouted']
      }
    })
  }
  // *****    END NOTINTERTESTEDANDNG FILTERING SECTION   ***** //

  if (desiredGender && desiredGender.length > 0) {
    must.push({
      terms: {
        gender: desiredGender.split(',')
      },
    })
  }

  // -----    START AGE FILTERING SECTION   ----- //
  if (desiredAge && desiredAge.length > 0) {
    const ages = desiredAge.split(',')
    const ageRangeObjects = ages.map((age) => {
      const ageNumber = Number(age)
      if (ageNumber === 60) return { gte: ageNumber }
      else return { gte: ageNumber, lte: ageNumber + 9 }
    })
    const ageRangeQueries = ageRangeObjects.map((range) => ({
      range: { age: range },
    }))
    must.push({
      bool: {
        should: ageRangeQueries,
      },
    })
  }
  // *****    END AGE FILTERING SECTION   ***** //

  // -----    START QUALIFICATION FILTERING SECTION   ----- //
  if (desiredQualifications && desiredQualifications.length > 0) {
    const qualifications = desiredQualifications.split(',')
    const fieldQueries = qualifications.map((field) => ({
      term: { [field]: true },
    }))
    must.push({
      bool: {
        should: fieldQueries,
      },
    })
  }
  // *****    END QUALIFICATION FILTERING SECTION   ***** //

  // -----    START OTHER FILTERING SECTION   ----- //
  if (other && other.length > 0) {
    const others = other.split(',')
    const otherQueries = others.map((other) => ({
      term: { [other]: true },
    }))
    must.push({
      bool: {
        should: otherQueries,
      },
    })
  }
  // *****    END OTHER FILTERING SECTION   ***** //

  let result = await elastic.search({
    index: "leaderswantedprojectsscoutlist",
    size: 200,
    query: {
      bool: {
        must,
      },
    },
  })

  const project = result.hits.hits.map((item) => item._source)

  return NextResponse.json(project)
}
