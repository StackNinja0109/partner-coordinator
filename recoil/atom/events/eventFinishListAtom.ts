import { atom } from "recoil";
import { EventFinishTableItem } from "@/components/organisms/Table/EventFinish/EventFinishTable";

export const eventFinishListAtom= atom({
  key: "eventFinishListState",
  default: [] as EventFinishTableItem[],
});