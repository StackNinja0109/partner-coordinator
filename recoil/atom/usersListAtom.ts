import { TableItem } from "@/components/organisms/Table/User/Table";
import { atom } from "recoil";

export const usersListAtom= atom({
  key: "usersListState",
  default: [] as TableItem[],
});