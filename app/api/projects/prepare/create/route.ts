import { getElasticClient } from '@/utils/elastic'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, project } = body

    // try {
    //   await setDoc(doc(db, 'leadersWantedProjects', projectId), project, {
    //     merge: true,
    //   });
    // } catch (error) {
    //   console.log('API/PROJECTS/PREPARE/CREATE: ', error)
    //   throw error
    // }

    // const { error } = await createData(
    //   'leadersWantedProjects',
    //   projectId,
    //   project,
    // )

    // // if (error) {
    // //   throw error
    // // }

    // const elastic = await getElasticClient()

    // const res = await elastic.index({
    //   index: 'leaderswantedprojects',
    //   id: projectId,
    //   document: {
    //     id: projectId,
    //     createdAt: project.createdAt,
    //     organizationName: project.organizationName,
    //     eventName: project.eventName,
    //     status: project.status,
    //     gender: project.gender,
    //     recruitCount: 0,
    //     adoptCount: 0,
    //     selectCount: 0,
    //     // use 0 and 1 instead of boolean, please
    //     // candidate: false,
    //     // message: false,
    //   },
    // })

    // return NextResponse.json(res)
  } catch (error) {
    throw error
  }
}
