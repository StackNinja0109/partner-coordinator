'use client'

import { useMemo, useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { DocRef, getDocIdWithData } from '@/libs/firebase/firestore'
import { getDoc } from 'firebase/firestore'
import { LeaderProject, initialLeaderProject } from '../shared/types'
import { useRecoilValue } from "recoil";
import { authUserState } from "@/recoil/atom/auth/authUserAtom";

export const useProjectDetailProvider = () => {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }
  const projectId = id
  const [isLoading, setIsLoading] = useState(false)

  const authUser = useRecoilValue(authUserState)
  const isCommitteeAccount = authUser.organizationType === '公的機関'

  // PROJECT INITIALIZATION SECTION
  const [project, setProject] = useState<LeaderProject>(initialLeaderProject)
  const [statusTabIndex, setStatusTabIndex] = useState({
    status: '',
    tabIndex: 0,
  })

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true)

      const [projectDoc] = await Promise.all([
        getDoc(DocRef.leadersWantedProjects(projectId)),
      ])

      let projectObject = getDocIdWithData(projectDoc)

      if (projectObject?.applyForProject) {
        const snapshot = await getDoc(
          DocRef.eventProjects(projectObject.applyForProject),
        )
        projectObject = {
          ...projectObject,
          applyForProject: snapshot.data()?.title,
        }
      }

      setProject(projectObject)
      setStatusTabIndex({
        status: projectObject.status,
        tabIndex: 0,
      })

      // const result = await axios.post(`/api/projects/candidate/search?status=unsend&projectId=${id}`);
      // setCandidateNotice(result.data.length > 0)

      setIsLoading(false)
    }

    fetchProject()
  }, []) // PROJECT INITIALIZATION SECTION

  // CANCEL MODAL(BACKBUTTON) SECTION
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  const openCancelModal = () => {
    setIsCancelModalOpen(true)
  }

  const closeCancelModal = () => {
    setIsCancelModalOpen(false)
  } // CANCEL MODAL(BACKBUTTON) SECTION

  const handlePutMemo = async (memo: string) => {
    fetch('/api/projects/addMemo', {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        memo: memo || '',
      }),
    })
  }

  // PROFILE TOGGLE SECTION
  const [isProfilebarOpen, setIsProfilebarOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleToggleBar = () => {
    setIsProfilebarOpen(!isProfilebarOpen)
  }

  const toggleProfilebar = useCallback((userId) => {
    setUserId(userId)
    setIsProfilebarOpen(!isProfilebarOpen)
  }, [userId, isProfilebarOpen]) // PROFILE TOGGLE SECTION

  const [candidateNotice, setCandidateNotice] = useState(false)
  const [selectionNotice, setSelectionNotice] = useState(false)

  return {
    router,
    isLoading,
    setIsLoading,
    isCommitteeAccount,
    project,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
    candidateNotice,
    setCandidateNotice,
    selectionNotice,
    setSelectionNotice,
    userId,
    projectId,
    isProfilebarOpen,
    setIsProfilebarOpen,
    toggleProfilebar,
    handleToggleBar,
    statusTabIndex,
    setStatusTabIndex,
    handlePutMemo,
  }
}
