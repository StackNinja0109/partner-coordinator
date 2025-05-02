import { ProjectPrepareTableItem } from "@/components/organisms/Table/ProjectPrepare/ProjectPrepareTable";
import { atom } from "recoil";

export const projectPrepareListAtom= atom({
  key: "projectPrepareListState",
  default: [] as ProjectPrepareTableItem[],
});