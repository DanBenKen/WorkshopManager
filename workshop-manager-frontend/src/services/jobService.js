import { API_ROUTES } from '../config/apiConfig';
import axiosInstance from './axiosInstance';

const API_URL = API_ROUTES.JOB;

export const getJobs = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

export const getJobById = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
};

export const createJob = async (jobData) => {
    const response = await axiosInstance.post(API_URL, jobData);
    return response.data;
};

export const updateJob = async (id, jobData) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, jobData);
    return response.data;
};

export const deleteJob = async (id) => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
};
