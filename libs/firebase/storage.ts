import {
  StorageReference,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import { storage } from './firebase'

export class AppStorageRef {
  static users = (path: string) => ref(storage, `users/${path}`)
  static messageRooms = (path: string) => ref(storage, `messageRooms/${path}`)
}

export class AppStorageService {
  /**
   * ファイルをアップロードする
   */
  static async uploadImage({
    ref,
    file,
  }: {
    ref: StorageReference
    file: File
  }) {
    return uploadBytes(ref, file)
  }

  /**
   * ファイルのURLを取得する
   */
  static async getDownloadFileUrl(ref: StorageReference) {
    return getDownloadURL(ref)
  }
}
