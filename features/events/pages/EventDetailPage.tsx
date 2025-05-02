'use client'

import { MdArrowForwardIos, MdDownload, MdMail, MdPhone } from "react-icons/md"
import { IoIosWarning } from "react-icons/io"

import { Tab, Transition } from '@headlessui/react'
import BackButton from '@/components/atoms/Button/BackButton'
import Button, { ButtonColor, ButtonShape } from "@/components/atoms/Button/Button"
import Modal from "@/components/molecules/Modal/Modal"

import { TimeStamp } from "@/components/parts/Message/TimeStamp"
import Counters from "@/components/molecules/Table/Counter"
import TabList from "@/components/atoms/PageTop/TabList"

import RecruitmentEventTab from "@/components/organisms/TabContent/RecruitmentEventTab"
import CandidateEventTab from "@/components/organisms/TabContent/CandidateEventTab"
import SelectionTab from "@/components/organisms/TabContent/SelectionTab"

import Image from 'next/image'
import Schedule from "@/components/molecules/Table/Schedule"
import { HowToApply } from "@/components/atoms/Table/HowToApply"
import InputArea from "@/components/organisms/Message/InputArea"
import MsgText from "@/components/molecules/Message/MsgText"
import { BalloonColor, BalloonType } from "@/components/atoms/Message/Balloon"
import DateLabel from "@/components/atoms/Message/DateLabel"
import { useProjectDetailProvider } from "../../projects/providers/useProjectDetailProvider"
import Loading from "@/components/layouts/loading"
import { calculateAge, formatTimeString, fromTimestampToString, formatBirthdayString } from "@/utils/convert"

import { useRecoilState, useRecoilValue } from "recoil"
import ProfilePage from "@/features/users/pages/ProfilePage"
import { useState } from "react"
import { DocRef, getDocIdWithData } from "@/libs/firebase/firestore"
import { collection, query, getDocs, getDoc, Timestamp } from "firebase/firestore"
import { useEventDetailProvider } from "../providers/useEventDetailProvider"
import styles from '@/utils/scroll.module.css'
import { PCFooter } from "@/components/organisms"

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

function EventDetailPage() {
  const {
    router,
    isLoading,
    setIsLoading,
    isCommitteeAccount,
    event,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
    handleTextChange,
    handleFileUpload,
    userId,
    isProfilebarOpen,
    setIsProfilebarOpen,
    toggleProfilebar,
    handleToggleBar,
    statusTabIndex,
    setStatusTabIndex,
  } = useEventDetailProvider()

  const { title, organizer, name, position, email,
    phoneNumber, createdAt, status } = event

  const handleTabChange = (index: number) => {
    setStatusTabIndex({
      ...statusTabIndex,
      tabIndex: index,
    })
  }

  const handleBackward = () => {
    if (statusTabIndex.status === 'inpreparation') router.push("/events/prepare")
    else if (statusTabIndex.status === 'inpublic') router.push("/events")
    else router.push("/events/finish")
  }

  return (
    <div className={`flex flex-col flex-grow w-full p-5 pb-0 text-center pc:p-10 pc:pb-0 bg-gray-white`}>
      <div className="w-full flex-grow">
        <BackButton className="absolute top-5 pc:top-10 left-5 pc:left-10" onClick={openCancelModal} />
        <div className="max-w-[980px] mx-auto text-left">
          {isLoading && <Loading />}

          {/* -----    START BRIEFLY PROJECT INFO SECTION   ----- */}
          <div className="flex flex-wrap justify-between gap-[10px] pt-8 pc:pt-0">
            <div>
              <h1 className="text-h5 pc:text-h2">{title}</h1>
              <h2 className="text-h5 mt-[10px] pc:text-h4">{organizer}</h2>
              <p className="mt-[10px] text-mini pc:text-small">
                担当者&nbsp;:&nbsp;{name.sei} {name.mei}&nbsp;&nbsp;/&nbsp;&nbsp;{name.seiKana} {name.meiKana}
                {position && `(${position})`}
              </p>
              <div className="flex mt-[2.5px] gap-2">
                <div className="flex items-center gap-[2px]">
                  <span className="text-[14px] pc:text-[16px]"><MdMail /></span>
                  <span className="text-mini pc:text-small">{email}</span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <span className="text-[14px] pc:text-[16px]"><MdPhone /></span>
                  <span className="text-mini pc:text-small">{phoneNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col pc:items-end justify-between gap-[10px]">
              <TimeStamp label={"登録日 : " + fromTimestampToString(createdAt as Timestamp)} />
              <div className="flex flex-wrap gap-[10px] pc:gap-5">
                <div className="inline-flex justify-center items-center text-mini pc:text-timestamp w-[60px] h-[31px] border border-gray-black">
                  {getStatusToJapanese(statusTabIndex.status)}
                </div>
                <Counters recruitCount="-" adoptCount="-" selectCount="-" />
              </div>
            </div>
          </div>
          {/* *****    END BRIEFLY PROJECT INFO SECTION   ***** */}

          {/* -----    START TAB SECTION   ----- */}
          <div className="mt-10">
            <Tab.Group selectedIndex={statusTabIndex.tabIndex} onChange={handleTabChange}>
              <Tab.List>
                <Tab className="outline-none">
                  {({ selected }) => (
                    <TabList
                      label="募集内容"
                      selected={selected}
                    />
                  )}
                </Tab>
                <Tab className="outline-none">
                  {({ selected }) => (
                    <TabList
                      label="候補"
                      selected={selected}
                      notice
                    />
                  )}
                </Tab>
                <Tab className="outline-none">
                  {({ selected }) => (
                    <TabList
                      label="選考"
                      selected={selected}
                      notice
                    />
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <RecruitmentEventTab
                    event={event}
                    statusTabIndex={statusTabIndex}
                    setStatusTabIndex={setStatusTabIndex}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <CandidateEventTab
                    event={event}
                    isCommitteeAccount={isCommitteeAccount}
                    statusTabIndex={statusTabIndex}
                    onClick={toggleProfilebar}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  {/* <SelectionTab onClick={toggleProfilebar} /> */}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          {/* *****    END TAB SECTION   ***** */}
        </div>

        <ProfilePage
          userId={userId}
          isProfilebarOpen={isProfilebarOpen}
          handleToggleBar={handleToggleBar}
          authority={statusTabIndex.tabIndex === 2 || isCommitteeAccount}
          setIsLoading={setIsLoading}
        />

        <Modal isOpen={isCancelModalOpen} onClose={closeCancelModal}>
          <div className="text-center">
            <span className="inline-block text-[60px] pc:text-[80px] mx-auto text-core-red"><IoIosWarning /></span>
            <p className="mt-5 text-body_sp pc:text-body_pc">
              編集の内容は破棄されます<br />
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

export default EventDetailPage