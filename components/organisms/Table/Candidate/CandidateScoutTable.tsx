'use client'

import { useEffect, useState } from "react"
import CandidateScoutTableHeader from "./CandidateScoutTableHeader"
import CandidateScoutTableRow from "./CandidateScoutTableRow"
import { CandidateItem, CandidateSort } from "./CandidateDataTable"
import { CandidateEventItem } from "./CandidateEventDataTable"
import { fromTimestampToDate } from "@/utils/convert"

export interface CandidateScoutTableProps {
  isCommitteeAccount: boolean
  candidates: CandidateItem[] | CandidateEventItem[]
}

const CandidateScoutTable = ({isCommitteeAccount, candidates} : CandidateScoutTableProps) =>{
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSort, setCurrentSort] = useState<CandidateSort>({name: "candidateAt", direction: "down"})

  useEffect(() => {
    candidates.sort((a, b) => {
      let lhs, rhs;
      if (currentSort.name === 'candidateAt' || currentSort.name === 'scoutAt') {
        lhs = fromTimestampToDate(a[currentSort.name])
        rhs = fromTimestampToDate(b[currentSort.name])
      } else {
        lhs = a[currentSort.name];
        rhs = b[currentSort.name];
      }
      if (currentSort.direction !== "up") {
        return lhs < rhs ? 1 : lhs == rhs ? 0 : -1;
      } else {
        return lhs < rhs ? -1 : lhs == rhs ? 0 : 1;
      }
    })
  }, [candidates, currentSort])

  return(
    <div>
      <div className="overflow-auto">
        <table className="w-full min-w-[800px]">
          <CandidateScoutTableHeader  currentSort={currentSort} setCurrentSort={setCurrentSort}  />
          <tbody>
            {candidates.length > 0 ?(
              candidates.sort((a, b) => { 
                if(currentSort.direction !== "up"){
                  if(a[currentSort.name] > b[currentSort.name]) return 1
                  if(a[currentSort.name] == b[currentSort.name]) return 0
                  if(a[currentSort.name] < b[currentSort.name]) return -1
                }else{
                  if(a[currentSort.name] > b[currentSort.name]) return -1
                  if(a[currentSort.name] == b[currentSort.name]) return 0
                  if(a[currentSort.name] < b[currentSort.name]) return 1
                }
                return 0
              }).slice(currentPage * 7, (currentPage+1) * 7).map(item => (
                <CandidateScoutTableRow 
                  key={item.userId}
                  isCommitteeAccount={isCommitteeAccount}
                  item={item}  
                />
              ))
            ):
              <tr>
                <td colSpan={9}>
                  No Scout
                </td>
              </tr>
            }
          
          </tbody>
        </table>
      </div>
      {/* <CandidateScoutTablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} candidates={candidates}  /> */}
    </div>
  )
}


export default CandidateScoutTable