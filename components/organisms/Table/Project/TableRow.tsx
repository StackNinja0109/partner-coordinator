'use client'

import Counters from "@/components/molecules/Table/Counter"
import { TableItem } from "./Table"
import Candidacy from "@/components/atoms/Table/Candidacy"
import Message from "@/components/atoms/Table/Message"
import TimeStump from "@/components/atoms/Table/TimeStump"
import { useRouter } from "next/navigation"
import { fromTimestampToDate } from "@/utils/convert"

export interface TableRowProps{
  item: TableItem;
}

const TableRow = ({item} : TableRowProps) => {

  const router = useRouter();
  
  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  }

  return(
    <tr
      className="border-b h-[55px] border-gray-gray_light text-timestamp cursor-pointer"
      onClick={() => handleClick(item.id)}
    >
      <td className="px-3 text-body_sp">
        {item.organizationName}
      </td>
      <td className="px-3">
        {item.eventName}
      </td>
      <td className="px-3">
        {item.gender}
      </td>
      <td className="px-3">
        <Counters
          recruitCount="-"
          adoptCount="-"
          selectCount="-"
        />          
      </td>
      <td className="px-3">
        <Candidacy status={item.candidate} />
      </td>
      <td className="px-3">
        <Message status={item.candidate} />
      </td>
      <td className="px-3">
        <TimeStump date={fromTimestampToDate(item.startedAt)} />
      </td>
    </tr>
  )
}

export default TableRow;