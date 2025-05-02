import { LeaderElasticList } from '../models/leaderElasticList.model'
import axios from 'axios';


export interface CreateLeaderElasticListParams {
  leaderElasticListId: string
  leaderElasticList: LeaderElasticList
}

export const projectsScoutRepository = {
  async createLeaderElasticList(params: CreateLeaderElasticListParams) {
    try {
      await axios.post(`/api/leaderElasticList/create`, params)
      return
    } catch (error) {
      throw error
    }
  },
}
