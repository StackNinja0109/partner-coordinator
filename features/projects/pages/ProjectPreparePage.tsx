'use client'

import { Top } from '@/components/organisms/PageTop/ProjectPrepare/Top';
import ProjectPrepareTable from '@/components/organisms/Table/ProjectPrepare/ProjectPrepareTable';
import { getClubNames } from '@/utils/clubs';
import { ISelectOptionsProps } from '@/components/atoms';
import { useEffect, useState } from 'react';

export default function ProjectPreparePage() {

  const [eventOptions, setEventOptions] = useState<ISelectOptionsProps[]>([])
  useEffect(() => {
    const fetchClubNames = async () => {
      setEventOptions(await getClubNames())
    }
    fetchClubNames()
  }, [])

  return (
    <div className="w-full h-full px-10 min-w-[1200px] overflow-auto flex flex-col">
      <Top
        caption='準備中'
        eventOptions={eventOptions}
      />
      <ProjectPrepareTable />
    </div>
  );
};