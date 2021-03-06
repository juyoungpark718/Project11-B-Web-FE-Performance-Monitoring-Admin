import { AxiosInstance, AxiosResponse } from 'axios';
import { IAlert } from '../types';

interface IAddAlertParams {
  projectId: string;
  users: string[];
  period?: string;
  count?: number;
}

export interface IResponse {
  addAlert: (params: IAddAlertParams) => Promise<AxiosResponse<IAlert>>;
  getAlerts: (projects: string[]) => Promise<AxiosResponse<IAlert[]>>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const addAlert = (params: IAddAlertParams) => {
    const { projectId, users, period, count } = params;
    return apiRequest.post(`/api/alert/${projectId}`, { users, period, count });
  };

  const getAlerts = (projects: string[]) => {
    return apiRequest.post(`/api/alerts`, { projects });
  };
  return {
    addAlert,
    getAlerts,
  };
};
