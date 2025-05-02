'use client'

import { MdMail, MdOutlineStickyNote2, MdPhone } from 'react-icons/md'
import { IoIosWarning } from 'react-icons/io'

import { Tab } from '@headlessui/react'
import BackButton from '@/components/atoms/Button/BackButton'
import Button, { ButtonColor, ButtonShape } from '@/components/atoms/Button/Button'
import Modal from '@/components/molecules/Modal/Modal'

import { TimeStamp } from '@/components/parts/Message/TimeStamp'
import Counters from '@/components/molecules/Table/Counter'
import TabList from '@/components/atoms/PageTop/TabList'

import RecruitmentTab from '@/components/organisms/TabContent/RecruitmentTab'
import CandidateTab from '@/components/organisms/TabContent/CandidateTab'
import SelectionTab from '@/components/organisms/TabContent/SelectionTab'

import { useProjectDetailProvider } from '../providers/useProjectDetailProvider'
import Loading from '@/components/layouts/loading'
import { fromTimestampToString } from '@/utils/convert'

import ProfilePage from '@/features/users/pages/ProfilePage'
import React from 'react'
import { Timestamp } from 'firebase/firestore'
import { DropdownNote } from '@/components/atoms/DropdownNote'
import { PCFooter } from '@/components/organisms'

const getStatusToJapanese = (value: string) => {
  switch (value) {
    case 'inpreparation':
      return '準備中'
    case 'inpublic':
      return '募集中'
    case 'finished':
      return '募集終了'
    default:
      break
  }
}

function ProjectDetailPage() {
  const {
    router,
    isLoading,
    setIsLoading,
    isCommitteeAccount,
    project,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
    candidateNotice,
    setCandidateNotice,
    selectionNotice,
    setSelectionNotice,
    userId,
    projectId,
    isProfilebarOpen,
    setIsProfilebarOpen,
    toggleProfilebar,
    handleToggleBar,
    statusTabIndex,
    setStatusTabIndex,
    handlePutMemo,
  } = useProjectDetailProvider()

  const {
    id,
    organizationName,
    eventName,
    gender,
    name,
    position,
    email,
    phoneNumber,
    createdAt,
    recruitment,
    applyForProject,
    memo,
  } = project

  
  const [memoValue, setMemoValue] = React.useState(memo)

  const handleChangeMemo = (value: string) => {
    setMemoValue(value)
  }

  const handleAddMemo = async (open: boolean) => {
    if (open || memoValue === memo) return
    await handlePutMemo(memoValue)
  }

  React.useEffect(() => {
    setMemoValue(memo)
  }, [memo])

  const handleTabChange = (index: number) => {
    setStatusTabIndex({
      ...statusTabIndex,
      tabIndex: index,
    })
  }

  const handleBackward = () => {
    if (statusTabIndex.status === 'inpreparation')
      router.push('/projects/prepare')
    else if (statusTabIndex.status === 'inpublic') router.push('/projects')
    else router.push('/projects/finish')
  }

  return (
    <div className="flex flex-col flex-grow w-full p-5 pb-0 text-center pc:p-10 pc:pb-0 bg-gray-white">
      {isLoading && <Loading />}
      <div className="w-full flex-grow">
        <BackButton
          className="absolute top-5 pc:top-10 left-5 pc:left-10"
          onClick={openCancelModal}
        />
        <div className="max-w-[980px] mx-auto text-left">

          {/* BRIEFLY PROJECT SUMMARY */}
          <div className="flex flex-wrap justify-between gap-[10px] pt-8 pc:pt-0">
            <div>
              <h1 className="text-h5 pc:text-h2">
                {organizationName}&nbsp;&nbsp;/&nbsp;&nbsp;{eventName}&nbsp;&nbsp;{gender}
              </h1>
              <p className="mt-[10px] text-mini pc:text-small">
                学校担当者&nbsp;:&nbsp;{name.sei} {name.mei}
                &nbsp;&nbsp;/&nbsp;&nbsp;{name.seiKana} {name.meiKana}
                {position && `(${position})`}
              </p>
              <div className="flex mt-[2.5px] gap-2">
                <div className="flex items-center gap-[2px]">
                  <span className="text-[14px] pc:text-[16px]">
                    <MdMail />
                  </span>
                  <span className="text-mini pc:text-small">{email}</span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <span className="text-[14px] pc:text-[16px]">
                    <MdPhone />
                  </span>
                  <span className="text-mini pc:text-small">{phoneNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col pc:items-end justify-between gap-[10px]">
              <TimeStamp
                label={'登録日 : ' + fromTimestampToString(createdAt as Timestamp)}
              />
              <div className="flex flex-wrap gap-[10px] pc:gap-5">
                <div className="inline-flex justify-center items-center text-mini pc:text-timestamp w-[60px] h-[31px] border border-gray-black">
                  {getStatusToJapanese(statusTabIndex.status)}
                </div>
                <Counters
                  recruitCount={recruitment}
                  adoptCount="-"
                  selectCount="-"
                />
              </div>
            </div>
          </div>{' '}   {/* BRIEFLY PROJECT SUMMARY */}
          
          {/* -----    START TAB SECTION   ----- */}
          <div className="mt-10">
            <Tab.Group
              selectedIndex={statusTabIndex.tabIndex}
              onChange={handleTabChange}
            >
              <div className="flex justify-between">
                <Tab.List>
                  <Tab className="outline-none">
                    {({ selected }) => (
                      <TabList label="募集内容" selected={selected} />
                    )}
                  </Tab>
                  <Tab className="outline-none">
                    {({ selected }) => (
                      <TabList
                        label="候補"
                        selected={selected}
                        notice={
                          candidateNotice &&
                          statusTabIndex.status !== 'inpreparation'
                        }
                      />
                    )}
                  </Tab>
                  <Tab className="outline-none">
                    {({ selected }) => (
                      <TabList
                        label="選考"
                        selected={selected}
                        notice={
                          selectionNotice &&
                          statusTabIndex.status !== 'inpreparation'
                        }
                      />
                    )}
                  </Tab>
                </Tab.List>
                <DropdownNote
                  value={memoValue}
                  onChange={handleChangeMemo}
                  onOpenChange={handleAddMemo}
                >
                  <div className="flex cursor-pointer">
                    <MdOutlineStickyNote2
                      fontSize={24}
                      className="text-core-blue"
                    />
                    <span className="text-h5 text-core-blue">メモを入力</span>
                  </div>
                </DropdownNote>
              </div>
              <Tab.Panels>
                <Tab.Panel>
                  <RecruitmentTab
                    project={project}
                    statusTabIndex={statusTabIndex}
                    setStatusTabIndex={setStatusTabIndex}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <CandidateTab
                    project={project}
                    isCommitteeAccount={isCommitteeAccount}
                    statusTabIndex={statusTabIndex}
                    onClick={toggleProfilebar}
                    setCandidateNotice={setCandidateNotice}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <SelectionTab
                    project={project}
                    statusTabIndex={statusTabIndex}
                    onClick={toggleProfilebar}
                    setSelectionNotice={setSelectionNotice}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>    {/* *****    END TAB SECTION   ***** */}
        </div>
        
        <ProfilePage
          userId={userId}
          projectId={projectId}
          isProfilebarOpen={isProfilebarOpen}
          handleToggleBar={handleToggleBar}
          authority={statusTabIndex.tabIndex === 2 || isCommitteeAccount}
          setIsLoading={setIsLoading}
        />

        <Modal isOpen={isCancelModalOpen} onClose={closeCancelModal}>
          <div className="text-center">
            <span className="inline-block text-[60px] pc:text-[80px] mx-auto text-core-red">
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
                onclick={closeCancelModal}
              />
              <Button
                className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                color={ButtonColor.WARNING}
                shape={ButtonShape.ELLIPSE}
                text="破棄する"
                onclick={handleBackward}
              />
            </div>
          </div>
        </Modal>
      </div>
      <PCFooter />
    </div>
  )
}

export default ProjectDetailPage
