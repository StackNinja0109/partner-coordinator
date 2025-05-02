'use client'

import { Top } from '@/components/organisms/PageTop/ProjectFinish/Top';
import ProjectFinishTable from '@/components/organisms/Table/ProjectFinish/ProjectFinishTable';
import { getClubNames } from '@/utils/clubs';
import { ISelectOptionsProps } from '@/components/atoms';
import { useEffect, useState } from 'react';

function ProjectFinishPage() {
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
        caption='終了'
        eventOptions={eventOptions}
      />
      <ProjectFinishTable />
    </div>
  );
};

export default ProjectFinishPage;