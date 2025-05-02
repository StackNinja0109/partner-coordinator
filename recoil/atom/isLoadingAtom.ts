import { atom } from "recoil";

export const isLoadingAtom = atom({
  key: 'isLoadingState',
  default: false,
})