'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button, {
  ButtonColor,
  ButtonShape,
  ButtonType,
} from '@/components/atoms/Button/Button'
import { IoIosWarning } from 'react-icons/io'
import { MdCampaign } from 'react-icons/md'

import Schedule from '@/components/molecules/Table/Schedule'
import Modal from '@/components/molecules/Modal/Modal'
import { LeaderProject } from '@/features/projects/shared/types'
import Loading from '@/components/layouts/loading'
import { projectsRepository } from '@/features/projects/repositories/projectsRepository'

const trStyle = 'border-b border-gray-gray'

const firstTdStyle = [
  'px-[10px] py-5',
  'text-small pc:text-h4',
  'w-[100px] min-w-[100px] pc:w-[150px]',
].join(' ')

const secondTdStyle = ['px-5 py-5', 'text-timestamp pc:text-body_sp'].join(' ')

interface RecruitmentTabProps {
  project: LeaderProject
  statusTabIndex: { status: string; tabIndex: number }
  setStatusTabIndex: ({
    status,
    tabIndex,
  }: {
    status: string
    tabIndex: number
  }) => void
}

const RecruitmentTab: React.FC<RecruitmentTabProps> = ({
  project,
  statusTabIndex,
  setStatusTabIndex,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const id = project.id ? project.id : ''

  // EDIT PROJECT
  const handleClickEdit = () => {
    router.push(`/projects/prepare/${id}/edit`)
  } // EDIT PROJECT

  // START RECRUITMENT
  const [isStartModalOpen, setIsStartModalOpen] = useState(false)
  const handleClickStart = async () => {
    openStartModal()
  }
  const openStartModal = () => {
    setIsStartModalOpen(true)
  }

  const closeStartModal = () => {
    setIsStartModalOpen(false)
  }

  const startRecruitment = async () => {
    setIsLoading(true)
    await projectsRepository.inPublicProject({
      projectId: id,
    })
    setStatusTabIndex({
      status: 'inpublic',
      tabIndex: 1,
    })
    setIsLoading(false)
    closeStartModal()
  } // START RECRUITMENT

  // DELETE PROJECT
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const deleteProject = async () => {
    setIsLoading(true)
    await projectsRepository.deleteProject({
      projectId: id,
    })
    setIsLoading(false)
    router.push('/projects/prepare')
  } // DELETE PROJECT

  // BACK PREPARATION SECTION
  const handleClickToPrepare = async () => {
    setIsLoading(true)
    await projectsRepository.inPreparationProject({
      projectId: id,
    })
    setStatusTabIndex({
      status: 'inpreparation',
      tabIndex: 0,
    })
    setIsLoading(false)
    router.push(`/projects/${id}`)
  } // BACK PREPARATION SECTION

  // FINISH RECRUITMENT
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
  const openFinishModal = () => {
    setIsFinishModalOpen(true)
  }

  const closeFinishModal = () => {
    setIsFinishModalOpen(false)
  }

  const handleClickFinish = async () => {
    setIsLoading(true)
    await projectsRepository.inFinishProject({
      projectId: id,
    })
    setStatusTabIndex({
      status: 'finished',
      tabIndex: 0,
    })
    setIsLoading(false)
    closeFinishModal()
    router.push(`/projects/${id}`)
  } // FINISH RECRUITMENT

  const {
    organizationName,
    applyForProject,
    workplace,
    workingHours,
    activityDescription,
    desiredSalary,
    desiredGender,
    desiredAge,
    desiredQualifications,
    desiredTalent,
    desiredNote,
  } = project

  return (
    <div>
      <table className="w-full border-t border-gray-gray">
        <tbody>
          <tr className={trStyle}>
            <td className={firstTdStyle}>募集申請先</td>
            <td className={secondTdStyle}>{organizationName}</td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>主な勤務地</td>
            <td className={secondTdStyle}>
              {workplace.prefecture}
              {workplace.city}
              {workplace.address1}
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>勤務時間</td>
            <td className={secondTdStyle}>
              <Schedule
                className="w-[537px]"
                schedule={workingHours}
                size="default"
              />
              <div className="mt-[10px]">{workingHours.note}</div>
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>活動の紹介</td>
            <td className={secondTdStyle}>
              {activityDescription.split('\n').map((item, index) => (
                <div key={index} className="mt-1">
                  {item}
                </div>
              ))}
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>給与・報酬</td>
            <td className={secondTdStyle}>
              {desiredSalary.split('\n').map((item, index) => (
                <div key={index} className="mt-1">
                  {item}
                </div>
              ))}
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>性別</td>
            <td className={secondTdStyle}>{desiredGender}</td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>年齢</td>
            <td className={secondTdStyle}>{desiredAge.join('、')}</td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>資格に関する希望</td>
            <td className={secondTdStyle}>
              {desiredQualifications ?? desiredQualifications}
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>求める人材</td>
            <td className={secondTdStyle}>{desiredTalent ?? desiredTalent}</td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>備考</td>
            <td className={secondTdStyle}>{desiredNote ?? desiredNote}</td>
          </tr>
        </tbody>
      </table>
      {statusTabIndex.status === 'inpreparation' && (
        <>
          <p className="mt-10 text-center text-body_sp pc:text-body_pc">
            給与・報酬面など内容を確認のうえ, 募集を開始してください
          </p>
          <div className="flex justify-center gap-5 mt-[30px]">
            <Button
              className="w-[150px] pc:w-[200px] h-12 pc:h-[56px]"
              buttonType={ButtonType.SECONDARY}
              text="編集する"
              color={ButtonColor.SUB}
              shape={ButtonShape.ELLIPSE}
              onclick={handleClickEdit}
            />
            <Button
              className="w-[150px] pc:w-[200px] h-12 pc:h-[56px]"
              text="募集を開始する"
              shape={ButtonShape.ELLIPSE}
              onclick={handleClickStart}
            />
          </div>
          <div className="text-center mt-[30px]">
            <button
              type="button"
              className="mx-auto underline text-core-red text-body_sp pc:text-body_pc"
              onClick={openDeleteModal}
            >
              この募集を削除する
            </button>
          </div>

          <Modal isOpen={isStartModalOpen} onClose={closeStartModal}>
            <div className="text-center">
              <p className="text-h4 pc:text-h3">募集を開始しました</p>
              <span className="inline-block text-[60px] pc:text-[80px] mt-5 mx-auto text-core-blue">
                <MdCampaign />
              </span>
              <p className="mt-5 text-body_sp pc:text-body_pc">
                候補を確認して
                <br />
                スカウトを送信してください
              </p>
              <div className="flex justify-center mt-5">
                <Button
                  className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                  color={ButtonColor.SUB}
                  shape={ButtonShape.ELLIPSE}
                  text="候補を確認する"
                  onclick={startRecruitment}
                />
              </div>
            </div>
          </Modal>
          <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
            <div className="text-center">
              <p className="text-h4 pc:text-h3">募集を削除する</p>
              <span className="inline-block text-[60px] pc:text-[80px] mt-5 mx-auto text-core-red">
                <IoIosWarning />
              </span>
              <p className="mt-5 text-body_sp pc:text-body_pc">
                編集の内容は破棄されます
                <br />
                よろしいですか？
              </p>
              <div className="flex gap-3 mt-5 pc:gap-5">
                <Button
                  className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                  color={ButtonColor.CANCEL}
                  shape={ButtonShape.ELLIPSE}
                  text="キャンセル"
                  onclick={closeDeleteModal}
                />
                <Button
                  className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                  color={ButtonColor.WARNING}
                  shape={ButtonShape.ELLIPSE}
                  text="削除する"
                  onclick={deleteProject}
                />
              </div>
            </div>
          </Modal>
        </>
      )}
      {statusTabIndex.status === 'inpublic' && (
        <>
          <p className="mt-10 text-center text-body_sp pc:text-body_pc">
            内容を編集する場合は準備中にしてください
          </p>
          <div className="flex justify-center gap-5 mt-[30px]">
            <Button
              className="w-[150px] pc:w-[200px] h-12 pc:h-[56px]"
              buttonType={ButtonType.DEFAULT}
              text="準備中にする"
              color={ButtonColor.CANCEL}
              shape={ButtonShape.ELLIPSE}
              onclick={handleClickToPrepare}
            />
            <Button
              className="w-[150px] pc:w-[200px] h-12 pc:h-[56px]"
              text="募集を終了する"
              shape={ButtonShape.ELLIPSE}
              onclick={openFinishModal}
            />
          </div>

          <Modal isOpen={isFinishModalOpen} onClose={closeFinishModal}>
            <div className="text-center">
              <p className="text-h4 pc:text-h3">募集を終了する</p>
              <span className="inline-block text-[60px] pc:text-[80px] mt-5 mx-auto text-core-red">
                <IoIosWarning />
              </span>
              <p className="mt-5 text-body_sp pc:text-body_pc">
                この募集を終了します
                <br />
                よろしいですか？
                <br />※ 終了した募集を再開することはできません
              </p>
              <div className="flex gap-3 mt-5 pc:gap-5">
                <Button
                  className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                  color={ButtonColor.CANCEL}
                  shape={ButtonShape.ELLIPSE}
                  text="キャンセル"
                  onclick={closeFinishModal}
                />
                <Button
                  className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                  color={ButtonColor.WARNING}
                  shape={ButtonShape.ELLIPSE}
                  text="終了する"
                  onclick={handleClickFinish}
                />
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}

export default RecruitmentTab
