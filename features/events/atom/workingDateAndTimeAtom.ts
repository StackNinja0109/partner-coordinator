import { WorkingDateAndTime } from "../shared/types"
import { atom } from "recoil";

export const workingDateAndTimeAtom = atom({
  key: "workingDateAndTimeState",
  default: [] as WorkingDateAndTime[],
});