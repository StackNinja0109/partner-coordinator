'use client'

import Table from '@/components/organisms/Table/Project/Table'
import { Top } from '@/components/organisms/PageTop/Project/Top'
import { ISelectOptionsProps } from '@/components/atoms'
import { getClubNames } from '@/utils/clubs'
import { use, useEffect, useState } from 'react'

export default function ProjectPage() {
  const [eventOptions, setEventOptions] = useState<ISelectOptionsProps[]>([])
  useEffect(() => {
    const fetchClubNames = async () => {
      setEventOptions(await getClubNames())
    }
    fetchClubNames()
  }, [])

  return (
    <div className="w-full h-full px-10 min-w-[1200px] overflow-auto">
      <Top
        caption='募集中'
        eventOptions={eventOptions}
      />
      <Table />
    </div>
  );
}