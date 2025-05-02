'use client'

import { useEffect, useState } from 'react'
import CandidateDataTableHeader from './CandidateDataTableHeader'
import CandidateDataTableRow from './CandidateDataTableRow'
import CandidateDataTablePagination from './CandidateDataTablePagination'
import { useRecoilValue } from 'recoil'
import { projectCandidateAtom } from '@/recoil/atom/projectCandidateAtom'
import { Name } from '@/types'
import { DocRef, generateDocId } from '@/libs/firebase/firestore'
import { updateDoc } from 'firebase/firestore'
import { Timestamp, setDoc } from 'firebase/firestore'
import CandidateScoutTable from '@/components/organisms/Table/Candidate/CandidateScoutTable'
import Modal from '@/components/molecules/Modal/Modal'
import Button, {
  ButtonColor,
  ButtonShape,
} from '@/components/atoms/Button/Button'
import { authUserState } from '@/recoil/atom/auth/authUserAtom'
import axios from 'axios'
import Loading from '@/components/layouts/loading'
import { LeaderProject } from '@/features/projects/shared/types'
import { fromTimestampToDate } from '@/utils/convert'
import { Message } from '@/features/messages/models/message.model'

export interface CandidateItem {
  docId: string
  projectId: string
  userId: string
  age: number
  gender: string
  name: Name
  type: string
  email: string
  organization: string
  candidateAt: Timestamp
  status: string
  scoutAt: Timestamp
  userIdOfPrefecture: string
}

export interface CandidateSort {
  name: 'userId' | 'age' | 'gender' | 'candidateAt' | 'status' | 'scoutAt'
  direction: 'none' | 'up' | 'down'
}

interface ThisProps {
  statusTabIndex: { status: string; tabIndex: number }
  isCommitteeAccount: boolean
  project: LeaderProject
  onClick: (id: string) => void
}

const CandidateDataTable = ({
  project,
  isCommitteeAccount,
  onClick,
  statusTabIndex,
}: ThisProps) => {
  const candidates = useRecoilValue(projectCandidateAtom)
  const [tableItems, setTableItems] = useState<CandidateItem[]>([])
  const [currentSort, setCurrentSort] = useState<CandidateSort>({
    name: 'candidateAt',
    direction: 'down',
  })
  const [isLoading, setIsLoading] = useState(false)
  // -----    START SORT FUNCTION SECTION   ----- //
  useEffect(() => {
    setIsLoading(true)
    let temp_arr = [...candidates]

    setTableItems(
      temp_arr.sort((a, b) => {
        let lhs, rhs
        if (
          currentSort.name === 'candidateAt' ||
          currentSort.name === 'scoutAt'
        ) {
          lhs = fromTimestampToDate(a[currentSort.name])
          rhs = fromTimestampToDate(b[currentSort.name])
        } else {
          lhs = a[currentSort.name]
          rhs = b[currentSort.name]
        }
        if (currentSort.direction !== 'up') {
          return lhs < rhs ? 1 : lhs == rhs ? 0 : -1
        } else {
          return lhs < rhs ? -1 : lhs == rhs ? 0 : 1
        }
      }),
    )
    setIsLoading(false)
  }, [candidates, currentSort])
  // *****    END SORT FUNCTION SECTION   ***** //

  const authUser = useRecoilValue(authUserState)
  const coordinatorId = authUser.user?.uid || ''

  const [checkAll, setCheckAll] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedCandidatesID, setSelectedCandidatesID] = useState<string[]>([])

  useEffect(() => {
    if (tableItems.length === 0) {
      setCheckAll(false)
      return
    }

    let cur_page_items = tableItems.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize,
    )
    if (
      cur_page_items.filter(
        (item) =>
          selectedCandidatesID.findIndex(
            (sel_item) => sel_item === item.userId,
          ) !== -1,
      ).length === cur_page_items.length
    ) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }, [selectedCandidatesID, currentPage, tableItems, pageSize])

  const handleChange = (item: CandidateItem, checked: boolean) => {
    if (checked) {
      setSelectedCandidatesID([...selectedCandidatesID, item.userId])
    } else {
      setSelectedCandidatesID(
        selectedCandidatesID.filter((sel_item) => sel_item !== item.userId),
      )
    }
  }

  const handleCheckAll = (checked: boolean) => {
    let cur_page_items = tableItems.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize,
    )

    if (checked) {
      setSelectedCandidatesID([
        ...selectedCandidatesID,
        ...cur_page_items
          .filter(
            (item) =>
              selectedCandidatesID.findIndex(
                (sel_item) => sel_item === item.userId,
              ) === -1,
          )
          .map((item) => item.userId),
      ])
    } else {
      setSelectedCandidatesID(
        selectedCandidatesID.filter(
          (sel_item) =>
            cur_page_items.findIndex((item) => item.userId === sel_item) === -1,
        ),
      )
    }

    setCheckAll(checked)
  }

  const selectedCandidates: CandidateItem[] = tableItems.filter((item) =>
    selectedCandidatesID.includes(item.userId),
  )
  const [scoutModalOpen, setScoutModalOpen] = useState(false)

  const onNgClick = async () => {
    setIsLoading(true)
    let items = [...tableItems]
    await selectedCandidates.map((candidate) => {
      items = items.map((item) =>
        item.userId === candidate.userId
          ? {
              ...item,
              status: 'ng',
            }
          : item,
      )

      async function updateCandidate() {
        let docRef = DocRef.leadersWantedProjectsScoutList(
          candidate.projectId,
          candidate.userId,
        )

        try {
          await updateDoc(docRef, {
            status: 'NG',
          })
        } catch (error) {
          throw error
        }
      }
      updateCandidate()
    })

    setTableItems(items)
    setIsLoading(false)
  }

  const onScoutClick = () => {
    if (selectedCandidates.length === 0) return
    setScoutModalOpen(true)
  }

  const handleScoutSend = async () => {
    setIsLoading(true)
    let items = [...tableItems]
    await selectedCandidates.map((candidate) => {
      const updateCandidate = async () => {
        let docRef = DocRef.leadersWantedProjectsScoutList(
          candidate.projectId,
          candidate.userId,
        )
        try {
          await updateDoc(docRef, {
            status: 'スカウト済',
          })
        } catch (error) {
          throw error
        }
      }
      updateCandidate()

      const sendScoutMsg = async () => {
        const projectId = candidate.projectId
        const userId = candidate.userId

        const messageRoomId = generateDocId()
        const messageRoomDocData = {
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          projectId: projectId,
          userId: userId,
          projectType: 'leader',
          memberIds: [coordinatorId, userId],
          lastMessage: '応募スカウトされました。',
          members: [
            {
              lastAccessedAt: Timestamp.now(),
              unreadCount: 0,
              userId: coordinatorId,
            },
            {
              lastAccessedAt: Timestamp.now(),
              unreadCount: 1,
              userId,
            },
          ],
        }
        await setDoc(DocRef.messageRooms(messageRoomId), messageRoomDocData)

        const messageDocId1 = generateDocId()
        const messageDocData1: Message = {
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          type: 'scout',
          text: 'スカウトを送信しました',
          projectId: projectId,
          senderId: coordinatorId,
        }
        await setDoc(
          DocRef.messages(messageRoomId, messageDocId1),
          messageDocData1,
        )
      }
      sendScoutMsg()

      items = items.map((item) =>
        item.userId === candidate.userId
          ? {
              ...item,
              status: 'scouted',
            }
          : item,
      )
    })

    const statusResult = await axios.post(
      `/api/projects/candidate/search?projectId=${project.id}&status=unsend`,
    )

    selectedCandidates.map(async (item) => {
      let content = `${item.name.sei} ${item.name.mei} 様\n
      あなたにスカウトが届きました！\n
      詳細を確認し、回答をお願いします\n。
      ------------------------------------------------------------------\n
      本メールは送信専用メールアドレスから配信されています。
      ご返信頂いても対応できませんので、あらかじめご了承ください。

      ------------------------------------------------------------------
      【AS-FEEL】`
      const params = {
        to: item.email,
        subject: `あなたにスカウトが届きました【AS-FEEL】`,
        content: content,
      }
      // const result = await axios.post(`/api/sendEmail`, params)
    })

    setTableItems(items)
    setIsLoading(false)
    setScoutModalOpen(false)
  }

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex items-center justify-end space-x-[10px]">
        <span className="text-[10px] leading-[14.8px] text-gray-black">
          一括操作 :
        </span>
        <div
          className={`w-[70px] h-[26px] bg-[#307DC1] py-[4px] px-[8px] rounded-[4px] ${
            selectedCandidates.length > 0 ? 'opacity-100' : 'opacity-40'
          } text-[#FDFDFD] text-timestamp flex items-center justify-center cursor-pointer`}
          onClick={onNgClick}
        >
          NG
        </div>
        <div
          className={`w-[70px] h-[26px] bg-[#307DC1] py-[4px] px-[8px] rounded-[4px] ${
            selectedCandidates.length > 0 ? 'opacity-100' : 'opacity-40'
          } text-[#FDFDFD] text-timestamp flex items-center justify-center cursor-pointer`}
          onClick={onScoutClick}
        >
          スカウト
        </div>
      </div>
      <div className="overflow-auto">
        <table className="w-full min-w-[800px]">
          <CandidateDataTableHeader
            checkAll={checkAll}
            setCheckAll={handleCheckAll}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
          <tbody>
            {tableItems.length > 0 &&
            statusTabIndex.status !== 'inpreparation' ? (
              tableItems
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map((item, index) => (
                  <CandidateDataTableRow
                    key={index}
                    item={item}
                    isCommitteeAccount={isCommitteeAccount}
                    is_selected={
                      selectedCandidates.findIndex(
                        (sel_item) => sel_item.userId === item.userId,
                      ) !== -1
                    }
                    onSelected={(checked) => handleChange(item, checked)}
                    onClick={onClick}
                  />
                ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="py-5 text-center text-gray-gray_dark"
                >
                  データはありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CandidateDataTablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        numberOfCandidates={candidates.length}
      />
      <Modal isOpen={scoutModalOpen} onClose={() => setScoutModalOpen(false)}>
        <div className="w-[75vw] pc:w-[800px] flex flex-col items-center gap-5 pc:gap-[30px]">
          <div className="text-center text-h5 pc:text-h3">
            選択中の{selectedCandidates.length}名にスカウトを送信しますか？
          </div>
          <div className="w-full">
            <CandidateScoutTable
              isCommitteeAccount={isCommitteeAccount}
              candidates={selectedCandidates} 
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3 pc:gap-5">
            <Button
              className="w-[140px] pc:w-[200px] py-2 pc:py-[17.5px] text-small pc:text-body_sp"
              color={ButtonColor.CANCEL}
              shape={ButtonShape.ELLIPSE}
              text="キャンセル"
              onclick={() => setScoutModalOpen(false)}
            />
            <Button
              className="w-[140px] pc:w-[200px] py-2 pc:py-[17.5px] text-small pc:text-body_sp"
              color={ButtonColor.SUB}
              shape={ButtonShape.ELLIPSE}
              text="スカウトを送信する"
              onclick={handleScoutSend}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CandidateDataTable
