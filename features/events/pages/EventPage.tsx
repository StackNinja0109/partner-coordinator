'use client'

import { Top } from '@/components/organisms/PageTop/Event/Top';
import Table from '@/components/organisms/Table/Event/Table';

export default function EventPage() {

  return (
    <div className="w-full px-10 min-w-[1200px] overflow-auto">
      <Top
        caption='募集中'
      />
      <Table />
    </div>
  );
}