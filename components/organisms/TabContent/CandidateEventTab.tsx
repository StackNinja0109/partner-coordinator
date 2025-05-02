'use client'

import { EventTop } from "@/components/organisms/PageTop/Candidate/EventTop";
import CandidateEventDataTable from "@/components/organisms/Table/Candidate/CandidateEventDataTable";
import { useEffect } from "react";
import { getDoc, setDoc, Timestamp } from 'firebase/firestore'

import { DocRef } from '@/libs/firebase/firestore'
import { EventProject } from "@/features/events/shared/types";
import axios from "axios";

interface CandidateEventTabProps {
  event: EventProject
  isCommitteeAccount: boolean
  statusTabIndex: { status: string, tabIndex: number }
  onClick: (id: string) => void;
}

const CandidateEventTab = ({ event, isCommitteeAccount, statusTabIndex, onClick }: CandidateEventTabProps) => {

  useEffect(() => {
    const fetchUser = async () => {
      const prefecture = event.workplace.prefecture
      const city = event.workplace.city

      const currentCandidates = await axios.post('/api/users/candidate', {
        address: prefecture + city,
        event: '大学生',
        type: 'event',
      })

      const projectId = event.id
      const currentCandidatesObject = currentCandidates.data

      currentCandidatesObject.forEach(candidate => {
        const addCandidate = async () => {
          const userId = candidate.id
          const candidateRef = DocRef.eventProjectsScoutList(projectId, userId)
          const candidateDoc = await getDoc(candidateRef);
          if (!candidateDoc.exists()) {
            setDoc(candidateRef, {
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
              status: "未送信",
              userId,
              projectId,
            })
          }
        }
        addCandidate()
      })
    }
    fetchUser()
  }, [event])

  return (
    <div>
      <div className="py-5 border-t border-gray-gray">
        <EventTop 
          caption='候補'
          event={event}
          statusTabIndex={statusTabIndex}
        />
        <div className="mt-[16px]">
          <CandidateEventDataTable
            statusTabIndex={statusTabIndex}
            isCommitteeAccount={isCommitteeAccount}
            event={event}
            onClick={onClick} 
          />
        </div>
      </div>
    </div>
  )
}

export default CandidateEventTab