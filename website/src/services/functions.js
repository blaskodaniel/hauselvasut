import { APIClient } from './axios';

export const GetStatus = () => APIClient.get(`status`);

export const ChangeState = (state) => APIClient.post('controller', state);

export const StartTrain = (trainid) => APIClient.get(`start/${trainid}`);

export const StopTrain = (trainid) => APIClient.get(`stop/${trainid}`);
