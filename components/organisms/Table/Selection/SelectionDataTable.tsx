'use client'

import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { Timestamp } from "firebase/firestore"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MdDownload } from "react-icons/md";
import axios from "axios"

import Loading from "@/components/layouts/loading";
import Status from "@/components/atoms/Table/Status";
import { Name } from "@/types"
import { DocRef } from "@/libs/firebase/firestore";
import { updateDoc } from "firebase/firestore";
import SelectionDataTableHeader from "./SelectionDataTableHeader"
import SelectionDataTableRow from "./SelectionDataTableRow"
import SelectionDataTablePagination from "./SelectionDataTablePagination"
import SelectionPdfPage from "@/features/projects/pages/SelectionPdfPage"
import { projectSelectionAtom } from "@/recoil/atom/projectSelectionAtom"
import { fromTimestampToDate } from "@/utils/convert";
import { LeaderProject } from "@/features/projects/shared/types";

const getStatusToEnglish = (status: string): string => {
  if (status === '未対応') return 'notstarted'
  else if (status === '対応中') return 'inprogress'
  else if (status === '面談') return 'interview'
  else if (status === '採用') return 'adopted'
  else if (status === '一括変更') return 'change'
  else if (status === '不採用') return 'notadopted'
  return 'cancel';
}

export interface SelectionItem {
  userId: string
  projectId: string
  docId: string
  age: number
  gender: string
  name: Name
  type: string
  organization: string
  status: string
  isUnread: boolean
  interviewAt: Timestamp
  lastMessageAt: Timestamp
  applyOrScout: string
  isSetInterview: boolean
}

export interface SelectionSort {
  name: "name" | "age" | "gender" | "status" | "interviewAt" | "lastMessageAt"
  direction: "none" | "up" | "down"
}

interface ThisProps {
  statusTabIndex: { status: string, tabIndex: number }
  project: LeaderProject
  onClick: (id: string) => void
  setSelectionNotice: (status: boolean) => void
}

const SelectionDataTable = ({ project, onClick, statusTabIndex, setSelectionNotice }: ThisProps) => {

  const selections = useRecoilValue(projectSelectionAtom);
  const [tableItems, setTableItems] = useState<SelectionItem[]>([]);
  const [currentSort, setCurrentSort] = useState<SelectionSort>({ name: "lastMessageAt", direction: "down" })
  const [isLoading, setIsLoading] = useState(false);
  // -----    START SORT FUNCTION SECTION   ----- //
  useEffect(() => {
    setIsLoading(true);
    let temp_arr = [...selections]
    setTableItems(temp_arr.sort((a, b) => {
      let lhs, rhs;
      if (currentSort.name === 'interviewAt' || currentSort.name === 'lastMessageAt') {
        lhs = fromTimestampToDate(a[currentSort.name])
        rhs = fromTimestampToDate(b[currentSort.name])
      } else {
        lhs = a[currentSort.name]
        rhs = b[currentSort.name]
      }
      if (currentSort.direction !== "up") {
        return lhs < rhs ? 1 : lhs == rhs ? 0 : -1
      } else {
        return lhs < rhs ? -1 : lhs == rhs ? 0 : 1
      }
    }))
    setIsLoading(false)
  }, [selections, currentSort])   // *****    END SORT FUNCTION SECTION   ***** //

  const [checkAll, setCheckAll] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedSelectionsID, setSelectedSelectionsID] = useState<string[]>([])

  // -----    START UPDATE INTERVIEWTIME SECTION   ----- //
  const handleInterviewTime = async (time: Timestamp, docId: string) => {
    setIsLoading(true)
    await setTableItems(tableItems.map(item => (
      item.docId === docId ? {
        ...item,
        interviewAt: time,
        isSetInterview: true,
      } : item
    )))

    const result = await axios.post(`/api/projects/selection/interviewAt`, {
      interviewAt: time,
      docId: docId,
    })
    setIsLoading(false)
  }   // *****    END UPDATE INTERVIEWTIME SECTION   ***** //

  // -----    START UPDATE STATUS SECTION   ----- //
  const handleStatus = async (status: string, userId: string, projectId: string) => {
    setIsLoading(true)
    await setTableItems(tableItems.map(item => (
      item.userId === userId ? {
        ...item,
        status: getStatusToEnglish(status),
        isSetInterview: status === '未対応' || status === '対応中' || status === '辞退' || status === '面談' ? false : item.isSetInterview,
      } : item
    )))

    const updateSelection = async () => {
      let docRef = DocRef.leadersWantedProjectsSelectionList(
        projectId,
        userId,
      )

      try {
        await updateDoc(docRef, {
          status: status,
        })
      } catch (error) {
        throw error
      }
    }
    updateSelection()
    setIsLoading(false)
  }   // *****    END UPDATE STATUS SECTION   ***** //

  // -----    START UPDATE STATUS BATCHING SECTION   ----- //
  const handleUpdateStatus = async (status: string) => {
    setIsLoading(true)
    let items = [...tableItems]
    await selectedSelections.map(selection => {
      items = items.map(item => (
        item.docId === selection.docId ? {
          ...item,
          status: getStatusToEnglish(status),
          isSetInterview: status === '未対応' || status === '対応中' || status === '辞退' || status === '面談' ? false : item.isSetInterview,
        } : item
      ))

      
      async function updateSelection() {
        let docRef = DocRef.leadersWantedProjectsScoutList(selection.projectId, selection.userId)
        try {
          await updateDoc(docRef, {
            status: status,
          });
        } catch (error) {
          throw error;
        }
      }
      updateSelection()
    })
    setTableItems(items)
    setIsLoading(false)
  }
  // *****    END UPDATE STATUS BATCHING SECTION   ***** //

  useEffect(() => {
    if (tableItems.length === 0) {
      setCheckAll(false)
      return
    }

    let cur_page_items = tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    if (cur_page_items.filter(item => selectedSelectionsID.findIndex(sel_item => sel_item === item.docId) !== -1).length === cur_page_items.length) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }, [selectedSelectionsID, currentPage, tableItems, pageSize])

  const handleSelectChange = (item: SelectionItem, checked: boolean) => {
    if (checked) {
      setSelectedSelectionsID([...selectedSelectionsID, item.docId])
    } else {
      setSelectedSelectionsID(selectedSelectionsID.filter(sel_item => sel_item !== item.docId))
    }
  }

  const handleCheckAll = (checked: boolean) => {
    let cur_page_items = tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    if (checked) {
      setSelectedSelectionsID([...selectedSelectionsID, ...cur_page_items.filter(item => selectedSelectionsID.findIndex(sel_item => sel_item === item.docId) === -1).map(item => item.docId)])
    } else {
      setSelectedSelectionsID(selectedSelectionsID.filter(sel_item => cur_page_items.findIndex(item => item.docId === sel_item) === -1))
    }
    setCheckAll(checked)
  }

  const selectedSelections: SelectionItem[] = tableItems.filter(item => selectedSelectionsID.includes(item.docId))

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex items-center justify-end space-x-[10px]">
        <Status currentStatus='一括変更' handleChange={handleUpdateStatus} />
        <PDFDownloadLink
          document={
            <SelectionPdfPage data={selectedSelections} />
          }
          fileName="選考リスト.pdf"
        >
          <button
            disabled={selectedSelectionsID.length === 0}
            className={`inline-flex items-center justify-center text-core-blue text-mini gap-[2px] w-[70px] h-[26px] rounded border border-core-blue ${selectedSelectionsID.length > 0 ? 'opacity-100' : 'opacity-40'}`}
          >
            <MdDownload size={14} />
            <span>PDF出力</span>
          </button>
        </PDFDownloadLink>
      </div>
      <div className="h-full">
        <table className="w-full min-w-[800px]">
          <SelectionDataTableHeader checkAll={checkAll} setCheckAll={handleCheckAll} currentSort={currentSort} setCurrentSort={setCurrentSort} />
          <tbody>
            {tableItems.length > 0 ? (
              tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                <SelectionDataTableRow key={index} item={item}
                  is_selected={selectedSelectionsID.findIndex(sel_item => sel_item === item.docId) !== -1}
                  onSelected={(checked) => handleSelectChange(item, checked)} onClick={onClick}
                  handleInterviewTime={handleInterviewTime}
                  handleStatus={handleStatus}
                />
              ))
            ) :
              <tr>
                <td colSpan={9} className="py-5 text-center text-gray-gray_dark">
                  データはありません。
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <SelectionDataTablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} numberOfSelections={selections.length} />
    </div>
  )
}

export default SelectionDataTable