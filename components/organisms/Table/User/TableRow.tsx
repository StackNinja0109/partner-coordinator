'use client'

import { TableItem } from "./Table"
import TimeStump from "@/components/atoms/Table/TimeStump"
import { fromTimestampToDate } from "@/utils/convert"
import { v4 } from 'uuid'

export interface ThisProps {
  item: TableItem
  authority: boolean
  onClick: (id: string) => void
}

const TableRow = ({ item, authority, onClick }: ThisProps) => {

  return (
    <tr className="border-b h-[55px] border-gray-gray_light text-body_sp">
      <td onClick={() => onClick(item.id)} className="px-1 pc:px-3 text-body_sp cursor-pointer">
        {authority? item.userName : item.userIdOfPrefecture}
      </td>
      <td className="p-1 max-w-[450px]">
        <div className="flex flex-col gap-2">
          {item.groupedClubStrings.map(groupedClub => (
            <div key={v4()} className="truncate">{groupedClub}</div>
          ))}
        </div>
      </td>
      <td className="p-1">
        {item.age}
      </td>
      <td className="p-1">
        {item.gender}
      </td>
      <td className="p-1">
        {item.type}
      </td>
      <td className="p-1 truncate">
        {item.organization}
      </td>
      <td className="p-1">
        <TimeStump date={fromTimestampToDate(item.createdAt)} />
      </td>
      <td className="p-1">
        <TimeStump date={fromTimestampToDate(item.updatedAt)} />
      </td>
    </tr>
  )
}

export default TableRow