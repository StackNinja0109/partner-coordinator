import { CandidateItem } from "@/components/organisms/Table/Candidate/CandidateDataTable";
import { atom } from "recoil";

export const projectCandidateAtom= atom({
  key: "projectCandidateState",
  default: [] as CandidateItem[],
});

export const projectCandidatePaginationAtom = atom({
  key: "projectCandidatePaginationState",
  default: {
    numberOfCandidates: 0,
    pageSize: 10,
    currentPage: 0,
  }
})