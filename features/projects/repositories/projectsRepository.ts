import { LeaderProject } from '../shared/types';
import axios from 'axios';

export interface CreateProjectParams {
  projectId: string;
  project: LeaderProject;
}

export interface UpdateProjectParams {
  projectId: string;
  project: LeaderProject;
}

export interface DeleteProjectParams {
  projectId: string;
}

export interface InPreparationProjectParams {
  projectId: string;
}

export interface InPublicProjectParams {
  projectId: string;
}

export interface InFinishProjectParams {
  projectId: string;
}

export const projectsRepository = {
  async createProject(params: CreateProjectParams) {
    try {
      await axios.post(`/api/projects/prepare/create`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  async updateProject(params: UpdateProjectParams) {
    try {
      await axios.post(`/api/projects/prepare/update`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  async deleteProject(params: DeleteProjectParams) {
    try {
      await axios.post(`/api/projects/prepare/delete`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  async inPreparationProject(params: InPreparationProjectParams) {
    try {
      await axios.post(`/api/projects/inPreparation`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  async inPublicProject(params: InPublicProjectParams) {
    try {
      await axios.post(`/api/projects/inPublic`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  async inFinishProject(params: InFinishProjectParams) {
    try {
      await axios.post(`/api/projects/inFinish`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
};
