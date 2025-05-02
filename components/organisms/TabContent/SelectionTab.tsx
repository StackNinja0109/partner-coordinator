'use client'

import { useState, useEffect } from "react";
import { SelectionSearch } from "@/components/organisms";
import SelectionDataTable from "@/components/organisms/Table/Selection/SelectionDataTable";
import { doc, getDoc, onSnapshot, collectionGroup, Timestamp } from 'firebase/firestore'


import { LeaderSelectionList } from "@/features/projects/models/leaderSelectionList.model";
import { projectsSelectionRepository } from "@/features/projects/repositories/projectsSelectionRepository";
import { db } from '@/libs/firebase/firebase';
import { LeaderProject } from "@/features/projects/shared/types";
import Loading from "@/components/layouts/loading";

interface SelectionTabProps {
  project: LeaderProject
  statusTabIndex: { status: string, tabIndex: number }
  onClick: (id: string) => void
  setSelectionNotice: (status: boolean) => void
}

const SelectionTab = ({ project, statusTabIndex, onClick, setSelectionNotice }: SelectionTabProps) => {
  return (
    <div>
      <div className="py-5 border-t border-gray-gray">
        <SelectionSearch 
          caption="選考"
          project={project}
          statusTabIndex={statusTabIndex}
        />
        <div className="mt-[16px]">
          <SelectionDataTable
            statusTabIndex={statusTabIndex}
            project={project}
            onClick={onClick} 
            setSelectionNotice={setSelectionNotice}
          />
        </div>
      </div>
    </div>
  )
}

export default SelectionTab;