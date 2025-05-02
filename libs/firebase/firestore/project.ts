import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function createData(colllection: any, id: any, data: any) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDocument(collectionName: any, id: any) {
  let docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  let result = null;

  if (docSnap.exists()) {
    result = docSnap.data();
  }

  return result;
}

export async function getDocuments(collectionName: any) {
  const colRef = collection(db, collectionName);
  const docsSnap = await getDocs(colRef);

  let result: any[] = [];

  docsSnap.forEach(doc => {
    result.push(doc.data());
  });

  return result;
}