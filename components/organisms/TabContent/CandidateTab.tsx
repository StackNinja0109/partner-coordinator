'use client'

import { Top } from "@/components/organisms/PageTop/Candidate/Top";
import CandidateDataTable from "@/components/organisms/Table/Candidate/CandidateDataTable";
import { useMemo, useState, useEffect } from "react";
import { getDoc, Timestamp, setDoc } from 'firebase/firestore'

import { DocRef } from '@/libs/firebase/firestore'
import { LeaderProject } from "@/features/projects/shared/types";
import axios from "axios";


interface CandidateTabProps {
  project: LeaderProject
  isCommitteeAccount: boolean
  statusTabIndex: { status: string, tabIndex: number }
  onClick: (id: string) => void
  setCandidateNotice: (status: boolean) => void
}

const CandidateTab = ({ project, isCommitteeAccount, statusTabIndex, onClick, setCandidateNotice }: CandidateTabProps) => {
  useEffect(() => {
    const fetchUser = async () => {
      const prefecture = project.workplace.prefecture
      const city = project.workplace.city
      const club = project.eventName

      const currentCandidates = await axios.post('/api/users/candidate', {
        address: prefecture + city,
        event: club,
        type: 'leader',
      })

      const projectId = project.id
      const currentCandidatesObject = currentCandidates.data

      currentCandidatesObject.forEach(candidate => {
        const addCandidate = async () => {
          const userId = candidate.id
          console.log(userId)
          const candidateRef = DocRef.leadersWantedProjectsScoutList(projectId, userId)
          const candidateDoc = await getDoc(candidateRef);
          if (!candidateDoc.exists()) {
            setDoc(candidateRef, {
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
              status: "未送信",
              userId: userId,
              projectId: projectId,
            })
          }
        }
        addCandidate()
      })
    }
    fetchUser()
  }, [project])

  return (
    <div>
      <div className="py-5 border-t border-gray-gray">
        <Top
          caption='候補'
          project={project}
          statusTabIndex={statusTabIndex}
        />
        <div className="mt-[16px]">
          <CandidateDataTable
            statusTabIndex={statusTabIndex}
            isCommitteeAccount={isCommitteeAccount}
            project={project}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  )
}

export default CandidateTab;