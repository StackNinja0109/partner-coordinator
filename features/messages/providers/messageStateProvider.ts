import {
  DocRef,
  SubColRef,
  generateDocId,
  appServerTimestamp,
} from '@/libs/firebase/firestore'
import { onSnapshot, query, setDoc } from 'firebase/firestore'
import { AppStorageRef, AppStorageService } from '@/libs/firebase/storage'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export const useMessageStateProvider = () => {
  const userId = ''
  const params = useParams()
  const { roomId } = params as { roomId: string }
  const [message, setMessage] = useState<string>('')
  const [files, setFiles] = useState<File[]>([])

  // TODO: メッセージを入力する
  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  // TODO: ファイルを追加する
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(files)])
    }
  }

  // TODO: ファイルを削除する
  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  // TODO: メッセージを送信する
  const sendMessage = async (messageId: string, message: string) => {
    const now = appServerTimestamp()
    await setDoc(DocRef.messages(roomId, messageId), {
      id: messageId,
      createdAt: now,
      updatedAt: now,
      type: 'text',
      text: message,
      senderId: userId,
      projectId: '',
    })
  }

  // TODO: ファイルを送信する
  const sendFile = async (messageId: string, file: File) => {
    const ref = AppStorageRef.messageRooms(roomId)
    await AppStorageService.uploadImage({ ref, file })
  }

  // TODO: メッセージ・ファイルを送信する
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messageId = generateDocId()
    if (message) {
      await sendMessage(messageId, message)
      setMessage('')
    }
    if (files) {
      await Promise.all(files.map((file) => sendFile(messageId, file)))
    }
  }

  // TODO: メッセージのデータをリアルタイムで取得する。onSnapshotを使用する
  useEffect(() => {
    // const unsub = onSnapshot(
    //   query(SubColRef.messages(roomId)),
    //   (snapshot) => {},
    // )

    // return () => {
    //   unsub()
    // }
  }, [roomId])

  return {
    message,
    files,
    handleChangeMessage,
    handleChangeFile,
    handleDeleteFile,
    handleSubmit,
  }
}
