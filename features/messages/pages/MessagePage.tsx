'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from "next/image"
import { Icon } from "@/components/atoms";

import Button, { ButtonColor, ButtonType } from '@/components/atoms/Button/Button'
import MessageList from '@/components/organisms/Message/MessageList'
import MessageContent from '@/components/organisms/Message/MessageContent'
import ProfilePage from '@/features/users/pages/ProfilePage'
import Loading from "@/components/layouts/loading"
import { userMessageProvider } from '../providers/useMessageProvider'


export default function MessagePage() {

  const {
    isLoading,
    setIsLoading,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    users,
    selectedUserId,
    setSelectedUserId,
    selectedRoomId,
    isProfilebarOpen,
    handleToggleBar,
  } = userMessageProvider()


  const matchedProject = projects.filter(project => project.projectId === selectedProjectId)
  const selectedProjectObject = matchedProject.length > 0 ? matchedProject[0] : null

  const matchedUser = users.filter(user => user.userId === selectedUserId)
  let selectedUserObject = matchedUser.length > 0 ? matchedUser[0] : null

  return (
    <div className="flex flex-row h-full flex-grow pl-10 pc:pl-0 bg-gray-white min-w-[1200px]">
      {isLoading && <Loading />}
      <MessageList
        projects={projects}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      {selectedProjectObject && selectedUserObject && (
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between p-[10px] gap-5">
            <div className="flex items-center gap-[10px]">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                {selectedUserObject.avatar ?
                  <Image src={selectedUserObject.avatar} width={40} height={40} alt={''} /> :
                  <Icon size={40} src={'/images/avatar/no_avatar.png'} alt="avatar" />
                }
              </div>
              <div className="text-h4 pc:text-h3">{selectedUserObject.name}</div>
              <div className="text-mini pc:text-small">{selectedProjectObject.organizationName}</div>
              <div className="text-mini pc:text-small">{selectedProjectObject.eventName} {selectedProjectObject.gender}</div>
            </div>
            <button
              className="rounded-[4px] border border-core-blue text-core-blue text-mini hover:bg-light-blue_light px-[10px] py-[6px]"
              onClick={(e) => {
                handleToggleBar()
                e.stopPropagation()
              }}
            >
              プロフィール
            </button>
          </div>
          {selectedRoomId && (
            <MessageContent
              selectedRoomId={selectedRoomId}
            />
          )}
        </div>
      )}
      <ProfilePage
        userId={selectedUserId}
        isProfilebarOpen={isProfilebarOpen}
        handleToggleBar={handleToggleBar}
        authority={true}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}
