'use client'

import TimeStump from "@/components/atoms/Table/TimeStump"
import { CandidateItem } from "./CandidateDataTable"
import { fromTimestampToDate } from "@/utils/convert"

export interface CandidateScoutTableRowProps {
  isCommitteeAccount: boolean
  item: CandidateItem
}

const CandidateScoutTableRow = ({ isCommitteeAccount, item }: CandidateScoutTableRowProps) => {

  return (
    <tr className="border-b h-[55px] border-gray-gray_light text-timestamp text-gray-black">
      <td>
        <div className="flex items-center text-body_sp">
          {isCommitteeAccount ? item.name.sei + item.name.mei : item.userIdOfPrefecture}
        </div>
      </td>
      <td>
        <div className="flex items-center">
          {item.age}
        </div>
      </td>
      <td>
        <div className="flex items-center">
          {item.gender === 'male' ? '男' : item.gender === 'female' ? '女' : '無回答'}
        </div>
      </td>
      <td>
        <div className="flex items-center">
          {item.type}
        </div>
      </td>
      <td>
        <div className="flex items-center">
          <div>
            {item.organization}
          </div>
        </div>
      </td>

      <td>
        <div className="flex items-center">
          <div>
            <TimeStump date={fromTimestampToDate(item.candidateAt)} />
          </div>
        </div>
      </td>

      <td>
        <div className="flex items-center">
          {item.status === 'unsend' ?
            <span className="text-timestamp leading-[17.38px] text-core-red font-normal">未送信</span> :
            item.status === 'scouted' ?
              <span className="text-timestamp leading-[17.38px] text-core-blue font-normal">スカウト済</span> :
              <span className="text-timestamp leading-[17.38px] font-normal">{item.status === 'notinterested' ? '興味なし' : 'NG'}</span>
          }
        </div>
      </td>

      <td>
        <div className="flex items-center">
          {item.status === 'scouted' &&
            <TimeStump date={fromTimestampToDate(item.scoutAt)} />
          }
        </div>
      </td>
    </tr>
  )
}

export default CandidateScoutTableRow