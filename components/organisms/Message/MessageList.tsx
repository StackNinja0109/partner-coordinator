import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/molecules/Input/Input";
import List, { Sex, Size } from "@/components/molecules/Message/List";
import ListSub from "@/components/molecules/Message/ListSub";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase/firebase";
import { fromTimestampToString } from "@/utils/convert";
import Loading from "@/components/layouts/loading";
import { Member } from "@/types";
import { v4 } from 'uuid';
import styles from '@/utils/scroll.module.css'
import { useRecoilState } from "recoil";
import { messageKeywordAtom } from "@/recoil/atom/message/messageKeywordAtom";

interface ThisProps {
  projects: MessageListProps[],
  selectedProjectId: string,
  setSelectedProjectId: (projectId: string) => void
  users: MessageSubListProps[],
  selectedUserId: string,
  setSelectedUserId: (userId: string) => void
}

export interface MessageListProps {
  projectId: string
  organizationName: string
  eventName: string
  gender: string
  date: Timestamp
  unreadCount: number
  lastMessage: string
}

export interface MessageSubListProps {
  userId: string
  projectId: string
  roomId: string
  name: string
  userLastAccessAt: Timestamp
  unreadCount: number
  avatar: string
}

interface FormValues {
  keyword: string;
}

export default function MessageList({
  projects,
  selectedProjectId,
  setSelectedProjectId,
  users,
  selectedUserId,
  setSelectedUserId,
}: ThisProps) {

  const methods = useForm<FormValues>({
    defaultValues: {
      keyword: '',
    },
    mode: 'onChange',
  });

  const [_, setKeyword] = useRecoilState(messageKeywordAtom)

  const { control, watch, handleSubmit } = methods;
  const keyword = watch('keyword') || ''

  useEffect(() => {
    setKeyword(keyword)
  }, [keyword])

  const onSubmit = (data: FormValues) => {

  };

  const handleSelectedProjectIDChange = (projectId: string) => {
    setSelectedProjectId(projectId)
  }
  const handleSelectedUserIDChange = (userId: string) => {
    setSelectedUserId(userId)
  }

  return (
    <div className="flex flex-col border-r border-gray-gray overflow-hidden shrink-0">
      <div className="flex items-center justify-between px-[10px] py-4 gap-5">
        <h1 className="text-h2 pc-text-h1">メッセージ</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              className="w-[300px]"
              control={control}
              name="keyword"
              type="searchbox"
              placeholder="キーワードで検索"
              onChange={handleSubmit(onSubmit)}
            />
          </form>
        </FormProvider>
      </div>
      {projects.length > 0 && users.length > 0 && (
        <div className="flex flex-grow h-[calc(100vh-64px-60px)]">
          <div className={`${styles.scrollbar} overflow-x-hidden overflow-y-auto border-r border-gray-gray`}>
            {projects.map((item) => (
              <List
                key={v4()}
                size={Size.PC}
                item={item}
                selectedId={selectedProjectId}
                unreadStatus={item.unreadCount > 0}
                unreadCount={item.unreadCount}
                date={fromTimestampToString(item.date)}
                onClick={handleSelectedProjectIDChange}
                text="テキスト"
              />
            ))}
          </div>
          <div className={`${styles.scrollbar} overflow-x-hidden overflow-y-auto`}>
            {users.map((subItem, index) => (
              <ListSub
                key={v4()}
                item={subItem}
                selectedId={selectedUserId}
                onClick={handleSelectedUserIDChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}