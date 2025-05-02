import { db } from '@/libs/firebase/firebase'
import { getElasticClient } from '@/utils/elastic'
import { doc, setDoc } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, project } = body

    let docRef = doc(db, 'leadersWantedProjects', projectId)

    try {
      await setDoc(docRef, project)
    } catch (error) {
      throw error
    }

    const elastic = await getElasticClient()

    const elasticData = {
      id: projectId,
      organizationName: project.organizationName,
      eventName: project.eventName,
      workplace: `${project.workplace.prefecture} ${project.workplace.city} ${project.workplace.address1}`,
      gender: project.gender,
      eventType: project.eventType,
      status: project.status,
      createdAt: project.createdAt,
      recruitCount: 0,
      adoptCount: 0,
      selectCount: 0,
      // use 0 and 1 instead of boolean, please
      // candidate: false,
      // message: false,
    }

    const res = await elastic.update({
      index: 'leaderswantedprojects',
      id: projectId,
      body: {
        doc: elasticData,
      },
    })

    return NextResponse.json(res)
  } catch (error) {
    throw error
  }
}
