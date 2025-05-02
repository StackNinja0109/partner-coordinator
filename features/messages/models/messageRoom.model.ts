import { Member } from "@/types";
import { Timestamp } from "firebase/firestore";

export class MessageRoom {
  id?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  members: Member[];
  lastMessage: string;
  deletedAt?: Timestamp;
  projectId: string;
  userId?: string;

  constructor(
    id: string,
    createdAt: Timestamp,
    updatedAt: Timestamp,
    members: Member[],
    lastMessage: string,
    deletedAt: Timestamp,
    projectId: string,
    userId: string
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.members = members;
    this.lastMessage = lastMessage;
    this.deletedAt = deletedAt;
    this.projectId = projectId;
    this.userId = userId;
  }
}
