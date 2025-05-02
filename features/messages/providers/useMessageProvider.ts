import axios from "axios"
import { useState, useEffect } from "react"
import { MessageListProps, MessageSubListProps } from "@/components/organisms/Message/MessageList"
import { db } from '@/libs/firebase/firebase'
import { collection, getDoc, onSnapshot } from "firebase/firestore"
import { fromTimestampToDate } from "@/utils/convert"
import { DocRef } from "@/libs/firebase/firestore"
import { useRecoilValue } from "recoil"
import { messageKeywordAtom } from "@/recoil/atom/message/messageKeywordAtom"
const messageRoomsRef = collection(db, 'messageRooms')

export const userMessageProvider = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState<MessageListProps[]>([])
  const [users, setUsers] = useState<MessageSubListProps[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const keyword = useRecoilValue(messageKeywordAtom)
  const [docUpdated, setDocUpdated] = useState(false)

  // console.log("roomId => ", selectedRoomId, "projectId => ", selectedProjectId, "userId => ", selectedUserId)
  let isSetProjectId = false
  let isSetUserId = false

  let userUnsubscribe = null
  let messageRoomUnsubscribe = null

  useEffect(() => {
    messageRoomUnsubscribe = onSnapshot(messageRoomsRef, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const messageRoomObject = change.doc.data()
        const roomId = change.doc.id

        const { createdAt, updatedAt, projectId, userId, lastMessage, projectType } = messageRoomObject
        const { lastAccessedAt } = messageRoomObject.members[0]
        const unreadCount = messageRoomObject.members[1]?.unreadCount || 0
        let organizationName = '', eventName = '', gender = '', projectCreatedAt


        if (projectType === 'leader') {
          const projectObjectRef = DocRef.leadersWantedProjects(projectId)
          const projectObjectDoc = await getDoc(projectObjectRef)
          const projectObject = projectObjectDoc.data()
          projectCreatedAt = projectObject.createdAt
          organizationName = projectObject.organizationName
          eventName = projectObject.eventName
          gender = projectObject.gender
        } else if (projectType === 'event') {
          const projectObjectRef = DocRef.eventProjects(projectId)
          const projectObjectDoc = await getDoc(projectObjectRef)
          const projectObject = projectObjectDoc.data()
          projectCreatedAt = projectObject.createdAt
          organizationName = projectObject.schoolName.join('、')
          eventName = projectObject.organizer
          gender = projectObject.gender
        }

        const userObjectRef = DocRef.privateUsers(userId)
        const userObjectDoc = await getDoc(userObjectRef)
        const userObject = userObjectDoc.data()
        const userName = userObject.name.sei + userObject.name.mei
        const userAvatar = userObject.avatar

        const document = {
          roomId,
          projectId,
          userId,

          organizationName,
          eventName,
          gender,
          lastMessage,

          userName,
          userAvatar,
          unreadCount,
          lastAccessedAt,
          projectCreatedAt,
        }

        const result = await axios.post('/api/message/create', {
          id: roomId,
          document,
        })

        const fetchMessageProjects = async () => {

          if (selectedProjectId) {
            const users = await axios.post('/api/message/users', {
              selectedProjectId
            })

            const messageSubLists = users.data
            // console.log(messageSubLists)
            messageSubLists.sort((a, b) => {
              return fromTimestampToDate(a.userLastAccessAt) < fromTimestampToDate(b.userLastAccessAt) ? 1 : -1
            })
            setUsers(messageSubLists)
          }

          const result = await axios.post('/api/message/projects', {
            keyword: keyword,
          })
          const messageLists = result.data
          messageLists.sort((a, b) => {
            return fromTimestampToDate(a.date) < fromTimestampToDate(b.date) ? 1 : -1
          })
          setProjects(messageLists)

          if (messageLists.length > 0 && isSetProjectId === false) {
              setSelectedProjectId(messageLists[0].projectId)
              isSetProjectId = true
            }
        }

        fetchMessageProjects()
      })
    })

    return () => {
      if (messageRoomUnsubscribe) {
        messageRoomUnsubscribe()
      }
    }
  }, [keyword])

  useEffect(() => {
    if (selectedProjectId === null) return

    const fetchUsers = async () => {
      const result = await axios.post('/api/message/users', {
        selectedProjectId
      })

      const messageSubLists = result.data
      // console.log(messageSubLists)
      messageSubLists.sort((a, b) => {
        return fromTimestampToDate(a.userLastAccessAt) < fromTimestampToDate(b.userLastAccessAt) ? 1 : -1
      })
      setUsers(messageSubLists)
      if (messageSubLists.length > 0) {
        setSelectedUserId(messageSubLists[0].userId)
      }
    }

    fetchUsers()
    return () => {
      if (userUnsubscribe) {
        userUnsubscribe()
      }
    }
  }, [selectedProjectId])

  useEffect(() => {
    if (selectedProjectId === null) return
    const fetchRoom = async () => {
      const result = await axios.post(`api/message/room?projectId=${selectedProjectId}&userId=${selectedUserId}`)
      if (result.data.length > 0) setSelectedRoomId(result.data[0].roomId)
    }

    fetchRoom()

  }, [selectedProjectId, selectedUserId])

  // PROFILE TOGGLE SECTION
  const [isProfilebarOpen, setIsProfilebarOpen] = useState(false)

  const handleToggleBar = () => {
    setIsProfilebarOpen(!isProfilebarOpen)
  }   // PROFILE TOGGLE SECTION

  return {
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
  }
}