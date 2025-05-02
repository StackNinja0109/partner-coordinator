import { DocRef, getDocIdWithData } from '@/libs/firebase/firestore'
import { getDoc, updateDoc } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  const body = await request.json()

  const { id, memo } = body

  const queryCurrentRecruitment = await getDoc(DocRef.leadersWantedProjects(id))

  if (!queryCurrentRecruitment.exists()) {
    throw 'Document does not exist'
  }

  const recruitmentData = getDocIdWithData(queryCurrentRecruitment)

  if (recruitmentData.memo === memo) {
    return NextResponse.json({})
  }

  await Promise.all([
    updateDoc(DocRef.leadersWantedProjects(id), {
      memo,
    }),
  ])

  return NextResponse.json({ id, memo })
}
