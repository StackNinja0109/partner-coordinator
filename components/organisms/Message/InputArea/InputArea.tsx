'use client'

import { useCallback, useRef, useState } from "react";

import Attachment from "@/components/atoms/Message/Attachment";
import { IoSend } from "react-icons/io5";
import { useAutosizeTextArea } from "@/hooks";

import styles from "./InputArea.module.css";
import AttachmentFile from "@/components/atoms/Message/AttachmentFile";
import { storage } from "@/libs/firebase/firebase";
import { SubColRef, DocRef } from "@/libs/firebase/firestore"
import { getDoc, setDoc, Timestamp, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

interface InputAreaProps {
  className?: string
  size?: 'pc' | 'sp'
  text?: string
  selectedRoomId: string
  setIsLoading: (isLoading: boolean) => void
  coordinatorId: string
}

export interface FileProps {
  fileName: string
  fileUrl: string
}

const InputArea: React.FC<InputAreaProps> = ({
  className = "",
  size = "pc",
  selectedRoomId,
  setIsLoading,
  coordinatorId,
}) => {
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, value)

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValue(value);
    },
    []
  );

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(event.target.files || []);
      const uniqueFiles = newFiles.filter(newFile => !files.some(existingFile => existingFile.name === newFile.name));
      setFiles([...files, ...uniqueFiles]);
    },
    [files]
  );

  const handleFileRemove = useCallback(
    (file: File) => {
      const newFiles = files.filter((f) => f.name !== file.name)
      setFiles(newFiles);
    },
    [files]
  );

  const handleUpload = async () => {
    setIsLoading(true)
    if (selectedRoomId === '') return
    let fileUrls: FileProps[] = []
    for (let i = 0; i < files.length; i++) {
      await uploadBytes(ref(storage, `${files[i].name}`), files[i])
        .then(async (snapshot) => {
          await getDownloadURL(ref(storage, `${files[i].name}`))
            .then((url) => {
              fileUrls.push({
                fileName: files[i].name,
                fileUrl: url,
              })
            })
        })
        .catch((error) => console.log(error))
    }
    const selectedRoomRef = DocRef.messageRooms(selectedRoomId)
    const selectedRoomDocObject = await getDoc(selectedRoomRef)
    let selectedRoomObject = selectedRoomDocObject.data()
    const projectId = selectedRoomObject.projectId
    const user = selectedRoomObject.members[0]
    let unreadCount = user.unreadCount
    const messagesRef = SubColRef.message(selectedRoomId)
    if (value.length > 0) {
      addDoc(messagesRef, {
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        senderId: coordinatorId,
        projectId: projectId,
        text: value,
        type: 'text',
      })
      unreadCount += 1
    }
    if (fileUrls.length > 0) {
      addDoc(messagesRef, {
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        senderId: coordinatorId,
        projectId: projectId,
        text: "",
        type: 'file',
        fileUrl: fileUrls,
      })
      unreadCount += 1
    }
    if (value.length > 0) selectedRoomObject.lastMessage = value
    selectedRoomObject.updatedAt = Timestamp.now()
    selectedRoomObject.members[0] = {
      ...user,
      unreadCount: unreadCount,
    }
    await updateDoc(selectedRoomRef, selectedRoomObject)

    setValue('')
    setFiles([])

    setIsLoading(false)
  }

  const textareaClassNames = [
    'w-full', 'max-h-[176px]',
    'px-[18px]', 'py-[7px]',
    'text-gray-black', 'text-body_sp',
    'rounded-[6px]', 'border', 'border-gray-gray',
    'outline-none', 'resize-none',
    size === 'pc' ? styles.textareaScrollbarWidth : styles.textareaScrollbarWidthSP,
    styles.textareaScrollbar,
    size === 'pc' ? 'mx-4' : 'mx-[10px]'
  ].join(' ');

  const submitDisabled = value === "" && files.length === 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-gray-white px-4 py-[10px]">
        <div className={`flex items-end`}>
          <Attachment className="mb-[5px]" isLabel={false} fileUpload={handleFileUpload} />
          <textarea
            className={textareaClassNames}
            onChange={handleTextChange}
            placeholder="メッセージを入力"
            ref={textAreaRef}
            rows={1}
            value={value}
          />
          <button
            type="button"
            className={`mb-[6px] text-core-sky text-[24px] hover:cursor-pointer ${submitDisabled ? 'opacity-30' : ''}`}
            disabled={submitDisabled}
            onClick={handleUpload}
          >
            <IoSend />
          </button>
        </div>
        {files.length >= 1 && (
          <div className="flex flex-wrap gap-[14px] pt-[14px] border-t border-gray-gray_light mt-[10px]">
            {files.map((file, index) => {
              let extension = file.name.split('.').pop() || "";
              return (
                <AttachmentFile
                  key={v4()}
                  extension={extension}
                  fileName={file.name}
                  isRemoveBtn
                  onClose={() => handleFileRemove(file)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputArea;