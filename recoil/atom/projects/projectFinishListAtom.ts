import { ProjectFinishTableItem } from "@/components/organisms/Table/ProjectFinish/ProjectFinishTable";
import { atom } from "recoil";

export const projectFinishListAtom= atom({
  key: "projectFinishListState",
  default: [] as ProjectFinishTableItem[],
});