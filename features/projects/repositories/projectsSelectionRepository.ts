import { LeaderSelectionList } from '../models/leaderSelectionList.model';
import axios from 'axios';

export interface CreateLeaderSelectionListParams {
  leaderSelectionListId: string
  leaderSelectionList: LeaderSelectionList
}

export const projectsSelectionRepository = {
  async createLeaderSelectionList(params: CreateLeaderSelectionListParams) {
    try {
      await axios.post(`/api/leaderSelectionList/create`, params)
      return
    } catch (error) {
      throw error
    }
  },
}
