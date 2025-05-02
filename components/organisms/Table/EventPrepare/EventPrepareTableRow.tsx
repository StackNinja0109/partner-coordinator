'use client'

import { useRouter } from "next/navigation"
import TimeStump from "@/components/atoms/Table/TimeStump"
import Counters from "@/components/molecules/Table/Counter"
import { EventPrepareTableItem } from "./EventPrepareTable"
import { fromTimestampToDate } from "@/utils/convert"

const EventPrepareTableRow = ({ item } : { item: EventPrepareTableItem }) => {

  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/events/${id}`);
  }

  return(
    <tr
      className="border-b h-[55px] border-gray-gray_light text-timestamp cursor-pointer"
      onClick={() => handleClick(item.id)}
    >
      <td className="px-3 text-body_sp">
        {item.title}
      </td>
      <td className="px-3">
        {item.organizer}
      </td>
      <td className="px-3">
        <Counters
          recruitCount={item.recruitCount > 0 ? item.recruitCount.toString() : '-'}
          adoptCount={item.adoptCount > 0 ? item.recruitCount.toString() : '-'}
          selectCount={item.selectCount > 0 ? item.recruitCount.toString() : '-'}
        />          
      </td>
      <td className="px-3">
        <TimeStump date={fromTimestampToDate(item.createdAt)} />
      </td>
    </tr>
  )
}

export default EventPrepareTableRow;