import { TableItem } from "@/components/organisms/Table/Project/Table";
import { atom } from "recoil";

export const projectListAtom = atom({
  key: 'projectListState',
  default: [] as TableItem[]
});