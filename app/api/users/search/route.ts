import { getElasticClient } from "@/utils/elastic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) { 
  const body = await request.json()
  const { prefecture, keyword, event, desiredGender, desiredAge, desiredQualifications, other} = body

  const elastic = await getElasticClient();
  
  const must = [];

  if (prefecture !== '') must.push({ match_phrase: { prefecture: prefecture} })
  must.push({ match: { isDeletedAccount: false} })
  
  if (keyword !== "") {
    must.push({
      bool: {
        should: [
          { match: { organization: keyword} }, 
          { match: { onlyClubs: keyword} }, 
          { match: { type: keyword} }, 
        ]
      }
    })
  }

  if (event !== "") must.push({ match: { onlyClubs: event } });

  if (desiredGender && desiredGender.length > 0) {
    must.push({
      terms: {
        gender: desiredGender.split(',')
      },
    });
  }

  // -----    START AGE FILTERING SECTION   ----- //
  if (desiredAge && desiredAge.length > 0) {
    const ages = desiredAge.split(',');
    const ageRangeObjects = ages.map((age) => {
      const ageNumber = Number(age);
      if (ageNumber === 60) return { gte: ageNumber };
      else return { gte: ageNumber, lte: ageNumber + 9 };
    });
    const ageRangeQueries = ageRangeObjects.map((range) => ({
      range: { age: range },
    }));
    must.push({
      bool: {
        should: ageRangeQueries,
      },
    });
  }
  // *****    END AGE FILTERING SECTION   ***** //

  // -----    START QUALIFICATION FILTERING SECTION   ----- //
  if (desiredQualifications && desiredQualifications.length > 0) {
    const qualifications = desiredQualifications.split(',');
    const fieldQueries = qualifications.map((field) => ({
      term: { [field]: true },
    }));
    must.push({
      bool: {
        should: fieldQueries,
      },
    });
  }
  // *****    END QUALIFICATION FILTERING SECTION   ***** //

  // -----    START OTHER FILTERING SECTION   ----- //
  if (other && other.length > 0) {
    const others = other.split(',');
    const otherQueries = others.map((other) => ({
      term: { [other]: true },
    }));
    must.push({
      bool: {
        should: otherQueries,
      },
    });
  }
  // *****    END OTHER FILTERING SECTION   ***** //

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
