import { atom } from "recoil";
import { EventPrepareTableItem } from "@/components/organisms/Table/EventPrepare/EventPrepareTable";

export const eventPrepareListAtom= atom({
  key: "eventPrepareListState",
  default: [] as EventPrepareTableItem[],
});