'use client'

import { useMemo, useCallback, useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Timestamp, getDoc } from 'firebase/firestore'

import { DocRef, getDocIdWithData } from '@/libs/firebase/firestore'
import { EventProject } from '../shared/types'
import { useRecoilValue } from "recoil";
import { authUserState } from "@/recoil/atom/auth/authUserAtom";

export const useEventDetailProvider = () => {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }
  const [isLoading, setIsLoading] = useState(false)
  const eventId = id

  const authUser = useRecoilValue(authUserState)
  const isCommitteeAccount = authUser.organizationType === '公的機関'

  // -----    START EVENT INITIALIZATION SECTION   ----- //
  const [event, setEvent] = useState<EventProject>({
    id: eventId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    title: '',
    organizer: '',
    schoolName: [],
    numberOfApplicants: 0,
    workplace: {
      zip: 0,
      city: '',
      prefecture: '',
      address1: '',
    },
    officeHours: [],
    officeHoursNote: '',
    jobDescription: '',
    gender: '',
    salary: '',
    name: {
      sei: '',
      mei: '',
      seiKana: '',
      meiKana: '',
    },
    address: {
      zip: 0,
      city: '',
      prefecture: '',
      address1: '',
    },
    phoneNumber: '',
    email: '',
    status: '',
    memo: '',
  })

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true)

      const [event] = await Promise.all([
        getDoc(DocRef.eventProjects(eventId)),
      ])
      const eventData = getDocIdWithData(event)

      setEvent({ ...eventData })
      setIsLoading(false)
    }

    fetchEvent()
  }, [])

  // *****    END PROJECT INITIALIZATION SECTION   ***** //

  // -----    START CANCEL MODAL(BACKBUTTON) SECTION   ----- //
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  const openCancelModal = () => {
    setIsCancelModalOpen(true)
  }

  const closeCancelModal = () => {
    setIsCancelModalOpen(false)
  }
  // *****    END CANCEL MODAL(BACKBUTTON) SECTION   ***** //

  const [text, setText] = useState('')

  const handleTextChange = (newText: string) => {
    setText(newText)
  }

  const handleFileUpload = (files: FileList) => {
    console.log('Selected files:', files)
  }

  // -----    START PROFILE TOGGLE SECTION   ----- //
  const [isProfilebarOpen, setIsProfilebarOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleToggleBar = () => {
    setIsProfilebarOpen(!isProfilebarOpen);
  }

  const toggleProfilebar = useCallback((id: string) => {
    setUserId(id)
    setIsProfilebarOpen(!isProfilebarOpen)
  }, [userId, isProfilebarOpen]) // PROFILE TOGGLE SECTION

  
  // *****    END PROFILE TOGGLE SECTION   ***** //

  const [statusTabIndex, setStatusTabIndex] = useState({
    status: event.status,
    tabIndex: 0,
  })

  useEffect(() => {
    setStatusTabIndex({
      status: event.status,
      tabIndex: 0,
    })
  }, [event.status])

  return {
    router,
    isLoading,
    setIsLoading,
    isCommitteeAccount,
    event,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
    text,
    handleTextChange,
    handleFileUpload,
    userId,
    isProfilebarOpen,
    setIsProfilebarOpen,
    toggleProfilebar,
    handleToggleBar,
    statusTabIndex,
    setStatusTabIndex,
  }
}
