import { atom } from "recoil";
import { EventTableItem } from "@/components/organisms/Table/Event/Table";

export const eventListAtom = atom({
  key: 'eventListState',
  default: [] as EventTableItem[]
});