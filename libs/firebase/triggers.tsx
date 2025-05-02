import {
  Timestamp,
  DocumentSnapshot,
  collection,
  QueryDocumentSnapshot,
  collectionGroup,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore'

import { db } from './firebase'

import { DocRef, getDocIdWithData } from '@/libs/firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { projectsScoutRepository } from '@/features/projects/repositories/projectsScoutRepository'
import { projectsSelectionRepository } from '@/features/projects/repositories/projectsSelectionRepository'
import { usersRepository } from '@/features/projects/repositories/usersRepository'
import { PrivateUser } from '@/features/users/models/privateUser.model'
import { LeaderElasticList } from '@/features/projects/models/leaderElasticList.model'
import { LeaderSelectionList } from '@/features/projects/models/leaderSelectionList.model';

const SyncProvider = ({ children }: {children: React.ReactNode}) => {
  // -----    START PRIVATEUSER COLLECTION LISTENER SECTION   ----- //
  // const privateUsersRef = collection(db, 'privateUsers')
  // onSnapshot(privateUsersRef, (snapshot) => {
  //   snapshot.docChanges().forEach((change, idx) => {
  //     const data = change.doc.data()
  //     const user: PrivateUser = {
  //       id: data.id,
  //       createdAt: data.createdAt,
  //       updatedAt: data.updatedAt,
  //       email: data.email,
  //       name: data.name,
  //       gender: data.gender,
  //       occupation: data.occupation,
  //       birthday: data.birthday,
  //       address: data.address,
  //       phoneNumber: data.phoneNumber,
  //       clubs: data.clubs,
  //       areasOfActivity: data.areasOfActivity,
  //       officeHours: data.officeHours,
  //       isExpeditionPossible: data.isExpeditionPossible,
  //       experience: data.experience,
  //       experienceNote: data.experienceNote,
  //       teacherLicenseStatus: data.teacherLicenseState,
  //       teacherLicenseNote: data.teacherLicenseNote,
  //       otherLicense: data.otherLicense,
  //       otherLicenseNote: data.otherLicenseNote,
  //       hasDriverLicense: data.hasDriverLicense,
  //       pr: data.pr,
  //       questionsForPrefecture: data.questionsForPrefecture,
  //       career: data.career,
  //       subscribeEmail: data.subscribeEmail,
  //       isSuspended: data.isSuspended,
  //       isDeletedAccount: data.isDeletedAccount,
  //     }
  //     const changeType = change.type
  //     const id = change.doc.id

  //     if (changeType === 'modified' || changeType === 'added') {
  //       try {
  //         usersRepository.createUser({
  //           userId: id,
  //           user: user,
  //         })
  //       } catch (error) {
  //         throw error
  //       }
  //     }

  //     if (changeType === 'removed') {
  //       try {
  //         usersRepository.deleteUser({
  //           userId: id,
  //         })
  //       } catch (error) {
  //         throw error
  //       }
  //     }
  //   })
  // })
  // *****    END PRIVATEUSER COLLECTION LISTENER SECTION   ***** //

  // -----    START LEADERSWANTEDPROJECTSSCOUTLIST SUBCOLLECTION LISTENER SECTION   ----- //
  const leaderScoutRef = collectionGroup(db, 'leadersWantedProjectsScoutList')
  onSnapshot(leaderScoutRef, async (snapshot) => {
    snapshot.docChanges().forEach(async (change, idx) => {
      console.log("dfdkfjdkfjdkjfk")
      const projectId = (change.doc.ref.parent.parent && change.doc.ref.parent.parent.id) || ""
      const data = change.doc.data()
      const changeType = change.type
      const leaderElasticListId = change.doc.id
      const userId: string = data.userId

      const userRef = doc(db, 'privateUsers', userId)
      const user = await getDoc(userRef)
      if (user.exists()) {
        const userData = user.data()
        const leaderElasticList: LeaderElasticList = {
          projectId: projectId,
          docId: leaderElasticListId,
          userId: data.userId,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          status: data.status,
          gender: userData.gender,
          birthday: userData.birthday,
          name: userData.name,
          occupation: userData.occupation,
          candidateAt: data.createdAt,
          scoutAt: Timestamp.now(),
          email: userData.email,

          isExpeditionPossible: userData.isExpeditionPossible,
          experience: userData.experience,
          experienceNote: userData.experienceNote,
          teacherLicenseStatus: userData.teacherLicenseState,
          teacherLicenseNote: userData.teacherLicenseNote,
          otherLicense: userData.otherLicense,
          otherLicenseNote: userData.otherLicenseNote,
          hasDriverLicense: userData.hasDriverLicense,
        }
        if (changeType === 'added') {
          try {
            projectsScoutRepository.createLeaderElasticList({
              leaderElasticListId: leaderElasticListId,
              leaderElasticList: leaderElasticList,
            })
          } catch (error) {
            throw error
          }
        }
      }

      // if (changeType === 'removed') {
      //   // try {
      //   //   usersRepository.deleteUser({
      //   //     userId: id,
      //   //   })
      //   // } catch (error) {
      //   //   throw error
      //   // }
      // }
    })
  })
  // *****    END LEADERSWANTEDPROJECTSSCOUTLIST SUBCOLLECTION LISTENER SECTION   ***** //

  // -----    START LEADERSWANTEDPROJECTSSELECTIONLIST SUBCOLLECTION LISTENER SECTION   ----- //
  // const leaderSelectionRef = collectionGroup(db, 'leadersWantedProjectsSelectionList')
  // onSnapshot(leaderSelectionRef, async (snapshot) => {
  //   snapshot.docChanges().forEach(async (change, idx) => {
  //     const projectId = (change.doc.ref.parent.parent && change.doc.ref.parent.parent.id) || ""
  //     const data = change.doc.data()
  //     const changeType = change.type
  //     const leaderSelectionListId = change.doc.id
  //     const userId: string = data.userId

  //     const userRef = doc(db, 'privateUsers', userId)
  //     const user = await getDoc(userRef)
  //     if (user.exists()) {
  //       const userData = user.data()
  //       const leaderSelectionList: LeaderSelectionList = {
  //         projectId: projectId,
  //         docId: leaderSelectionListId,
  //         userId: data.userId,
  //         createdAt: data.createdAt,
  //         updatedAt: data.updatedAt,
  //         status: data.status,
  //         gender: userData.gender,
  //         birthday: userData.birthday,
  //         name: userData.name,
  //         occupation: userData.occupation,
  //         interviewAt: Timestamp.now(),
  //         lastMessageAt: Timestamp.now(),
  //         isUnread: data.isUnread,
  //         applyOrScout: data.applyOrScout,
  //         isSetInterview: false,
  //       }
  //       if (changeType === 'added') {
  //         try {
  //           projectsSelectionRepository.createLeaderSelectionList({
  //             leaderSelectionListId: leaderSelectionListId,
  //             leaderSelectionList: leaderSelectionList,
  //           })
  //         } catch (error) {
  //           throw error
  //         }
  //       }
  //     }

  //     if (changeType === 'removed') {
  //       // try {
  //       //   usersRepository.deleteUser({
  //       //     userId: id,
  //       //   })
  //       // } catch (error) {
  //       //   throw error
  //       // }
  //     }
  //   })
  // })
  // *****    END LEADERSWANTEDPROJECTSSELECTIONLIST SUBCOLLECTION LISTENER SECTION   ***** //

  // -----    START MESSAGES SUBCOLLECTION LISTENER SECTION   ----- //
  // const messagesRef = collectionGroup(db, 'messages')
  // onSnapshot(messagesRef, async (snapshot) => {
  //   snapshot.docChanges().forEach(async (change, idx) => {
  //     const data = change.doc.data()
  //     const docId: string = change.doc.id
  //     const changeType = change.type
  //     const parentDocId = change.doc.ref.parent.parent?.id || ""

  //     const messageRoomsRef = doc(db, 'messageRooms', parentDocId)
  //     const messageRooms = await getDoc(messageRoomsRef)
  //     if (messageRooms.exists()) {
  //       const messageRoomsData = messageRooms.data()
  //       console.log(messageRoomsData.projectId, messageRoomsData.userId)
  //     }

  //     // if (changeType === 'removed') {
  //     //   // try {
  //     //   //   usersRepository.deleteUser({
  //     //   //     userId: id,
  //     //   //   })
  //     //   // } catch (error) {
  //     //   //   throw error
  //     //   // }
  //     // }
  //   })
  // })
  // *****    END MESSAGES SUBCOLLECTION LISTENER SECTION   ***** //

  return (
    <>
      {children}
    </>
  )
}

export default SyncProvider