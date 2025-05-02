import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import {
  Timestamp,
  collection,
  QueryDocumentSnapshot,
  collectionGroup,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore'
import { isProduction } from '@/utils/common'

// import { TriggerFunctions } from './triggers';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// if (!isProduction) {
//   const localhost = '127.0.0.1'
//   // firebase.json
//   connectFirestoreEmulator(db, localhost, 8080)
//   connectAuthEmulator(auth, `http://${localhost}:9099`, {
//     disableWarnings: true,
//   })
//   connectStorageEmulator(storage, localhost, 9199)
// }

auth.languageCode = 'ja'

export default app
export { auth, db, collection, doc, getDocs, serverTimestamp, storage }
