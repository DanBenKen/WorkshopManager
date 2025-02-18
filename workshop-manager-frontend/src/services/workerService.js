import { API_ROUTES } from '../config/apiConfig';
import axiosInstance from './axiosInstance';

const API_URL = API_ROUTES.WORKER;

export const getWorkers = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

export const getWorkerById = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
};

export const getWorkersWithJobs = async () => {
    const response = await axiosInstance.get(`${API_URL}/employed-workers`);
    return response.data;
};

export const getWorkersWithoutJobs = async () => {
    const response = await axiosInstance.get(`${API_URL}/unemployed-workers`);
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

export const getWorkersCount = async () => {
    const response = await axiosInstance.get(`${API_URL}/count`);
    return response.data.count;
};

export const getUnemployedWorkersCount = async () => {
    const response = await axiosInstance.get(`${API_URL}/unemployed-worker-count`);
    return response.data.unemployedCount;
};
