import { EventProject } from '../shared/types';
import axios from 'axios';

export interface CreateEventParams {
  projectId: string;
  project: EventProject;
}

export interface InPreparationEventParams {
  eventId: string;
}
export interface InPublicEventParams {
  eventId: string;
}

export interface InFinishEventParams {
  eventId: string;
}

export const eventsRepository = {
  async createEvent(params: CreateEventParams) {
    try {
      await axios.post(`/api/events/prepare/create`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  async inPreparationEvent(params: InPreparationEventParams) {
    try {
      await axios.post(`/api/events/inPreparation`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  async inPublicEvent(params: InPublicEventParams) {
    try {
      await axios.post(`/api/events/inPublic`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
  async inFinishProject(params: InFinishEventParams) {
    try {
      await axios.post(`/api/events/inFinish`, params);
      return;
    } catch (error) {
      throw error;
    }
  },
};
