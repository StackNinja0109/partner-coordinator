import { atom, useRecoilState } from 'recoil'
import { MessageRoom } from '../models/messageRoom.model'
import { useEffect } from 'react'
import { onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { ColRef, DocRef } from '@/libs/firebase/firestore'
import { useRouter } from 'next/navigation'

export const messageRoomsState = atom<MessageRoom[]>({
  key: 'messageRoomsState',
  default: [],
})

export const useMessageRoomStateProvider = () => {
  const router = useRouter()
  const [messageRooms, setMessageRooms] = useRecoilState(messageRoomsState)

  // 画面遷移に使用
  const moveToRoom = async (id: string) => {
    const messageRoom = messageRooms.find(
      (messageRoom) => messageRoom.id === id,
    )
    if (!messageRoom) return

    const members = messageRoom.members
    const updateMembers = members.map((member) => {
      // TODO: 'id'をログインユーザーのIDに変更する
      if (member.userId === 'id') {
        return {
          ...member,
          unreadCount: 0,
        }
      }
      return member
    })

    await setDoc(
      DocRef.messageRooms(id),
      {
        members: updateMembers,
      },
      { merge: true },
    )

    router.push(`/messages/${id}`)
  }

  // メッセージルーム一覧を取得
  useEffect(() => {
    const unsub = onSnapshot(
      query(ColRef.messageRooms, where('members', 'array-contains', 'id')),
      (snapshot) => {
        const newMessageRooms: { [id: string]: MessageRoom } = {}
        snapshot.forEach((doc) => {
          newMessageRooms[doc.id] = doc.data() as MessageRoom
        })
        setMessageRooms(Object.values(newMessageRooms))
      },
    )

    return () => {
      unsub()
    }
  }, [])

  return {
    moveToRoom,
  }
}
