import { Timestamp } from "firebase/firestore";

export interface IMessageRoomProps {
	roomId: string
	projectId: string
	userId: string
	organizationName: string
	eventName: string
	gender: string
	lastMessage: string
	userName: string
	unreadCount: number
	lastAccessedAt: Timestamp
	projectCreatedAt: Timestamp
	avatar: string
}