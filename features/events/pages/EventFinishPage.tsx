'use client'

import { Top } from '@/components/organisms/PageTop/EventFinish/Top'
import EventFinishTable from '@/components/organisms/Table/EventFinish/EventFinishTable'

export default function EventFinishPage() {
  
  return (
    <div className="w-full px-10 min-w-[1200px] overflow-auto flex flex-col gap-">
      <Top caption='終了' />
      <EventFinishTable />
    </div>
  );
};