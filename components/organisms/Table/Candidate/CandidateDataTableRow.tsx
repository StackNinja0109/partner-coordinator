'use client'

import { CandidateItem } from "./CandidateDataTable"
import CheckBox from "./CheckBox"
import { DocRef, getDocIdWithData } from "@/libs/firebase/firestore";
import { collection, query, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase/firebase";
import { PrivateUser } from "@/features/users/models/privateUser.model";
import { fromTimestampToDate } from "@/utils/convert";

import { useRecoilState } from "recoil";
import TimeStump from "@/components/atoms/Table/TimeStump";
import { CandidateEventItem } from "./CandidateEventDataTable";

export interface CandidateDataTableRowProps{
  item: CandidateItem | CandidateEventItem
  isCommitteeAccount: boolean
  is_selected: boolean;
  onSelected: (data: boolean) => void;
  onClick: (id: string) => void;
}

const CandidateDataTableRow = ({item, isCommitteeAccount, is_selected, onSelected, onClick} : CandidateDataTableRowProps) => {

  return(
    <tr className="border-b h-[55px] border-gray-gray_light text-timestamp text-gray-black">
      <td onClick={() => onClick(item.userId)} className="cursor-pointer">
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
          { item.status === 'unsend' ? 
            <span  className="text-timestamp leading-[17.38px] text-core-red font-normal">未送信</span> :
            item.status === 'scouted' ? 
            <span className="text-timestamp leading-[17.38px] text-core-blue font-normal">スカウト済</span> :
            <span className="text-timestamp leading-[17.38px] font-normal">{item.status === 'notinterested' ? '興味なし' : 'NG'}</span>
          }
        </div>
      </td>
      
      <td>
        <div className="flex items-center">
          { item.status === 'scouted' && 
            <TimeStump date={fromTimestampToDate(item.scoutAt)} />
          }
        </div>
      </td>
      <td>
        <CheckBox  checked={is_selected} onChange={onSelected} />
      </td>
    </tr>
  )
}

export default CandidateDataTableRow