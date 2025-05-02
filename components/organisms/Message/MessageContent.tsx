import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { getDoc, setDoc, onSnapshot, Timestamp } from 'firebase/firestore'
import { v4 } from 'uuid';

import { authUserState } from "@/recoil/atom/auth/authUserAtom";
import Loading from "@/components/layouts/loading";
import InputArea from "@/components/organisms/Message/InputArea";
import { DocRef, SubColRef } from "@/libs/firebase/firestore"
import { FileProps } from "./InputArea/InputArea";
import MessageItem from "./MessageItem";
import styles from "@/utils/scroll.module.css";

export interface MessageProps {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt?: Timestamp
  projectId: string
  senderId: string
  text: string
  type: string
  fileUrl?: FileProps[],
}

const MessageContent = ({selectedRoomId}: {selectedRoomId: string}) => {
  console.log("selectedRoomId => ", selectedRoomId)
  const [isLoading, setIsLoading] = useState(false)
  const [msgObject, setMsgObject] = useState<MessageProps[]>([])
  const authUser = useRecoilValue(authUserState)
  const coordinatorId = authUser.user?.uid || ""
  const messageContainerRef = useRef(null)
  const selectedRoomRef = DocRef.messageRooms(selectedRoomId)
  const messagesRef = SubColRef.message(selectedRoomId)

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [msgObject])

  useEffect(() => {
    let msgs: MessageProps[] = []
    onSnapshot(messagesRef, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const data = change.doc.data()
        if (change.type === 'added') {
          msgs.push({
            ...data,
            id: change.doc.id,
          })
        }
        if (change.type === 'removed') {
          msgs = msgs.filter(msg => msg.id !== change.doc.id)
        }
      })
      msgs.sort((a, b) => {
        return a.createdAt < b.createdAt ? -1 : a.createdAt === b.createdAt ? 0 : 1
      })
      setMsgObject([...msgs])
    })
  }, [selectedRoomId])

  useEffect(() => {
    const updateSelectedRoom = async () => {
      
      const selectedRoom = await getDoc(selectedRoomRef)
      if (selectedRoom.exists()) {
        let selectedRoomObject = selectedRoom.data()
        selectedRoomObject.members[1] = {
          lastAccessedAt: Timestamp.now(),
          unreadCount: 0,
          userId: coordinatorId,
        }
        await setDoc(selectedRoomRef, selectedRoomObject)
      }
    }

    updateSelectedRoom()
  }, [msgObject])

  return (
    <div className={`flex flex-col justify-between h-[calc(100vh-64px-60px)] bg-gray-gray_light`}>
      {isLoading && <Loading />}
      <div ref={messageContainerRef} className={`${styles.scrollbar} flex flex-col overflow-x-hidden overflow-y-auto flex-grow gap-3 p-5`}>
        {msgObject.map((msg, index) => (
          <MessageItem key={v4()}
            index={index}
            msg={msg}
            coordinatorId={coordinatorId}
            prevMsgDate={index > 0 && msgObject[index - 1].createdAt}
          />
        ))}
      </div>
      <InputArea className="sticky bottom-0"
        selectedRoomId={selectedRoomId}
        setIsLoading={setIsLoading}
        coordinatorId={coordinatorId}
      />
    </div>
  )
}

export default MessageContent