'use client'

import Counters from "@/components/molecules/Table/Counter"
import TimeStump from "@/components/atoms/Table/TimeStump"
import { useRouter } from "next/navigation"
import { ProjectFinishTableItem } from "./ProjectFinishTable"
import { fromTimestampToDate } from "@/utils/convert"

export interface ProjectFinishTableRowProps{
  item: ProjectFinishTableItem;
}

const ProjectFinishTableRow = ({item} : ProjectFinishTableRowProps) => {

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
        <TimeStump date={fromTimestampToDate(item.finishedAt)} />
      </td>
    </tr>
  )
}

export default ProjectFinishTableRow;