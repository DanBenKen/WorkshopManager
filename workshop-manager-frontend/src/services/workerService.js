import { API_ROUTES } from '../config/apiConfig';
import axiosInstance from './axiosInstance';

const API_URL = API_ROUTES.WORKER;

export const getWorkers = async () => {
        const response = await axiosInstance.get(API_URL);
        return response.data;
};

export const createWorker = async (workerData) => {
    const response = await axiosInstance.post(API_URL, workerData);
    return response.data;
};

export const updateWorker = async (id, workerData) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, workerData);
    return response.data;
};

export const deleteWorker = async (id) => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
};
