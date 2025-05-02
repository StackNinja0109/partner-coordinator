import { LeaderProject } from '@/features/projects/shared/types'
import { LeaderProjectScoutList } from '@/features/projects/models/leaderProjectScoutList.model'
import { LeaderProjectSelectionList } from '@/features/projects/models/leaderProjectSelectionList.model'

import { EventProject } from '@/features/events/shared/types'
import { EventProjectScoutList } from '@/features/events/models/eventProjectScoutList.model'
import { EventProjectSelectionList } from '@/features/events/models/eventProjectSelectionList.model'

import { PrivateUser } from '@/features/users/models/privateUser.model'
import { Coordinator, Prefecture } from '@/features/users/shared/types'

import { OrganizationType } from '@/features/auth/shared/types'

import { Message } from '@/features/messages/models/message.model'
import { MessageRoom } from '@/features/messages/models/messageRoom.model'

import { db } from './firebase'
import { DocumentSnapshot, QueryDocumentSnapshot, collection, collectionGroup, doc, serverTimestamp } from 'firebase/firestore'

export class AppFirestoreModel {
  get toJson() {
    return {
      ...this,
    }
  }
}

export const converter = {
  toFirestore: <T extends AppFirestoreModel>(data: T) => (data instanceof AppFirestoreModel ? data.toJson : data),
  fromFirestore: <T>(snapshot: QueryDocumentSnapshot) => snapshot.data() as T,
}

/**   Root Collection
 * Defines the collection name.
 *
 * @example
 * static readonly users = "users";
 */
export class ColName {
  static readonly leadersWantedProjects = 'leadersWantedProjects'
  static readonly eventProjects = 'eventProjects'
  static readonly privateUsers = 'privateUsers'
  static readonly messageRooms = 'messageRooms'
  static readonly coordinators = 'coordinators'
  static readonly organizationType = 'organizationType'
  static readonly prefectures = 'prefectures'
}

// Sub Collection
export class SubColName {
  static readonly leadersWantedProjectsScoutList = 'leadersWantedProjectsScoutList'
  static readonly leadersWantedProjectsSelectionList = 'leadersWantedProjectsSelectionList'

  static readonly eventProjectsScoutList = 'eventProjectsScoutList'
  static readonly eventProjectsSelectionList = 'eventProjectsSelectionList'

  static readonly messages = 'messages'
}

/**
 * Defines the collection reference.
 *
 * @example
 * static users = collection(db, ColName.users).withConverter<User>(converter);
 */
export class ColRef {
  static leadersWantedProjects = collection(db, ColName.leadersWantedProjects).withConverter<LeaderProject>(converter)
  static eventProjects = collection(db, ColName.eventProjects).withConverter<EventProject>(converter)
  static privateUsers = collection(db, ColName.privateUsers).withConverter<PrivateUser>(converter)
  static messageRooms = collection(db, ColName.messageRooms).withConverter<MessageRoom>(converter)
  static coordinators = collection(db, ColName.coordinators).withConverter<Coordinator>(converter)
  static prefectures = collection(db, ColName.prefectures).withConverter<Prefecture>(converter)
}

/**
 * Defines the sub collection reference.
 *
 * @example
 * static userReports = (id: string) => collection(DocRef.user(id), ColName.userReport).withConverter<UserReport>(converter)
 */
export class SubColRef {
  static leadersWantedProjectsScoutList = (id: string) => collection(DocRef.leadersWantedProjects(id), SubColName.leadersWantedProjectsScoutList).withConverter<LeaderProjectScoutList>(converter)
  static leadersWantedProjectsSelectionList = (id: string) =>
    collection(DocRef.leadersWantedProjects(id), SubColName.leadersWantedProjectsSelectionList).withConverter<LeaderProjectSelectionList>(converter)

  static eventProjectsScoutList = (id: string) => collection(DocRef.eventProjects(id), SubColName.eventProjectsScoutList).withConverter<EventProjectScoutList>(converter)
  static eventProjectsSelectionList = (id: string) => collection(DocRef.eventProjects(id), SubColName.eventProjectsSelectionList).withConverter<EventProjectSelectionList>(converter)

  static message = (id: string) => collection(DocRef.messageRooms(id), SubColName.messages).withConverter<Message>(converter)
}

/**
 * Defines the document reference.
 *
 * @example
 * static user = (id: string) => doc(db, ColName.users, id).withConverter<User>(converter);
 */
export class DocRef {
  static leadersWantedProjects = (id: string) => doc(db, ColName.leadersWantedProjects, id).withConverter<LeaderProject>(converter)
  static leadersWantedProjectsScoutList = (leadersWantedProjectId: string, leadersWantedProjectScoutListId: string) =>
    doc(SubColRef.leadersWantedProjectsScoutList(leadersWantedProjectId), leadersWantedProjectScoutListId).withConverter<LeaderProjectScoutList>(converter)
  static leadersWantedProjectsSelectionList = (leadersWantedProjectId: string, leadersWantedProjectSelectionListId: string) =>
    doc(SubColRef.leadersWantedProjectsSelectionList(leadersWantedProjectId), leadersWantedProjectSelectionListId).withConverter<LeaderProjectSelectionList>(converter)

  static eventProjects = (id: string) => doc(db, ColName.eventProjects, id).withConverter<EventProject>(converter)
  static eventProjectsScoutList = (eventProjectId: string, eventProjectScoutListId: string) =>
    doc(SubColRef.eventProjectsScoutList(eventProjectId), eventProjectScoutListId).withConverter<EventProjectScoutList>(converter)
  static eventProjectsSelectionList = (eventProjectId: string, eventProjectSelectionListId: string) =>
    doc(SubColRef.eventProjectsSelectionList(eventProjectId), eventProjectSelectionListId).withConverter<EventProjectSelectionList>(converter)

  static privateUsers = (id: string) => doc(db, ColName.privateUsers, id).withConverter<PrivateUser>(converter)
  static coordinators = (id: string) => doc(db, ColName.coordinators, id).withConverter<Coordinator>(converter)
  static prefectures = (id: string) => doc(db, ColName.prefectures, id).withConverter<Prefecture>(converter)

  static organizationType = (id: string) => doc(db, ColName.organizationType, id).withConverter<OrganizationType>(converter)

  static messageRooms = (id: string) => doc(db, ColName.messageRooms, id).withConverter<MessageRoom>(converter)
  static messages = (messageRoomId: string, messageId: string) => doc(SubColRef.message(messageRoomId), messageId).withConverter<Message>(converter)
}

/**
 * Defines the collection group reference.
 *
 * @example
 * static userReports = collectionGroup(db, ColName.userReports).withConverter<UserReport>(converter)
 */
export class ColGroupRef {
  static eventProjectsScoutList = collectionGroup(db, SubColName.eventProjectsScoutList).withConverter<EventProjectScoutList>(converter)
  static eventProjectsSelectionList = collectionGroup(db, SubColName.eventProjectsSelectionList).withConverter<EventProjectSelectionList>(converter)
  static leadersWantedProjectsScoutList = collectionGroup(db, SubColName.leadersWantedProjectsScoutList).withConverter<LeaderProjectScoutList>(converter)
  static leadersWantedProjectsSelectionList = collectionGroup(db, SubColName.leadersWantedProjectsSelectionList).withConverter<LeaderProjectSelectionList>(converter)
}

/**
 * generate document id
 */
export const generateDocId = () => {
  return doc(collection(db, 'authId')).id
}

/**
 * get document id with data
 */
export const getDocIdWithData = <T>(doc: DocumentSnapshot<T>) => {
  if (!doc.exists()) {
    throw new Error('Document does not exist')
  }

  return {
    id: doc.id,
    ...doc.data(),
  }
}

/**
 * get document data
 */
export const getDocData = <T>(doc: DocumentSnapshot<T>) => {
  if (!doc.exists()) {
    throw new Error('Document does not exist')
  }

  return doc.data()
}

/**
 * get server timestamp
 */
export const appServerTimestamp = () => {
  return serverTimestamp()
}