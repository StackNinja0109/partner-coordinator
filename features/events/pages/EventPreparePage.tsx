'use client'

import { Top } from '@/components/organisms/PageTop/EventPrepare/Top';
import EventPrepareTable from '@/components/organisms/Table/EventPrepare/EventPrepareTable';

export default function EventPreparePage() {

  return (
    <div className="w-full px-10 min-w-[1200px] overflow-auto flex flex-col">
      <Top
        caption='準備中'
      />
      <EventPrepareTable />
    </div>
  );
};