import { PrivateUser } from '../../users/models/privateUser.model';
import axios from 'axios';

export interface CreateUserParams {
  userId: string;
  user: PrivateUser;
}

export interface DeleteUserParams {
  userId: string;
}

export interface InPreparationUserParams {
  userId: string;
}

export interface InPublicUserParams {
  userId: string;
}

export interface InFinishUserParams {
  userId: string;
}

export const usersRepository = {
  async createUser(params: CreateUserParams) {
    try {
      await axios.post(`/api/users/create`, params);
    } catch (error) {
      throw error;
    }
  },
  async deleteUser(params: DeleteUserParams) {
    try {
      await axios.post(`/api/users/delete`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  // async inPreparationProject(params: InPreparationProjectParams) {
  //   try {
  //     await axios.post(`/api/projects/inPreparation`, params);
  //     return;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // async inPublicProject(params: InPublicProjectParams) {
  //   try {
  //     await axios.post(`/api/projects/prepare/inPublic`, params);
  //     return;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // async inFinishProject(params: InFinishProjectParams) {
  //   try {
  //     await axios.post(`/api/projects/inFinish`, params);
  //     return;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};
