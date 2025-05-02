// import { MessageType } from "@/enums";
import { Timestamp } from "firebase/firestore";
import { FileProps } from "@/components/organisms/Message/InputArea/InputArea";

export class Message {
  id?: string;
  createdAt: Timestamp
  updatedAt: Timestamp
  type: string
  text: string
  senderId: string
  projectId: string
  deletedAt?: Timestamp
  fileUrl?: FileProps[]

  constructor(
    id: string,
    createdAt: Timestamp,
    updatedAt: Timestamp,
    type: string,
    text: string,
    senderId: string,
    projectId: string,
    deletedAt: Timestamp,
    fileUrl: FileProps[],
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
    this.text = text;
    this.senderId = senderId;
    this.projectId = projectId;
    this.deletedAt = deletedAt;
    this.fileUrl = fileUrl;
  }
}
