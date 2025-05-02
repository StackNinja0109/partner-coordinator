import { SelectionItem } from "@/components/organisms/Table/Selection/SelectionDataTable";
import { atom } from "recoil";

export const projectSelectionAtom= atom({
  key: "projectSelectionState",
  default: [] as SelectionItem[],
});

export const projectSelectionPaginationAtom = atom({
  key: "projectSelectionPaginationState",
  default: {
    numberOfSelections: 0,
    pageSize: 10,
    currentPage: 0,
  }
})