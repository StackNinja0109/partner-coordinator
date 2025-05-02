
import { CandidateEventItem } from "@/components/organisms/Table/Candidate/CandidateEventDataTable";
import { atom } from "recoil";

export const eventCandidateAtom= atom({
  key: "eventCandidateState",
  default: [] as CandidateEventItem[],
});

export const eventCandidatePaginationAtom = atom({
  key: "eventCandidatePaginationState",
  default: {
    numberOfCandidates: 0,
    pageSize: 10,
    currentPage: 0,
  }
})