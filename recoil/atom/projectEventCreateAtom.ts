import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

export type OfficeDateAndTime = {
  date: Timestamp;
  start: {
    hour: string;
    min: string;
  };
  end: {
    hour: string;
    min: string;
  };
};

interface projectEventCreateProps {
  schoolNames: string;
  officeHours: OfficeDateAndTime[];
}

let initialValue: projectEventCreateProps = {
  schoolNames: "",
  officeHours: [] as OfficeDateAndTime[],
};

export const projectEventCreateAtom = atom({
  key: "projectEventCreateState",
  default: initialValue,
});
