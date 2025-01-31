import { API_ROUTES } from '../config/apiConfig';
import axiosInstance from './axiosInstance';

const API_URL = API_ROUTES.SUPPLY;

export const getSupplies = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

export const getSupplyById = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
};

export const createSupply = async (supplyData) => {
    const response = await axiosInstance.post(API_URL, supplyData);
    return response.data;
};

export const updateSupply = async (id, supplyData) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, supplyData);
    return response.data;
};

export const deleteSupply = async (id) => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
};

export const getTotalSuppliesCount = async () => {
    const response = await axiosInstance.get(`${API_URL}/count`);
    return response.data.count;
};

export const getLowStockSuppliesCount = async () => {
    const response = await axiosInstance.get(`${API_URL}/low-stock-count`);
    return response.data.lowStockCount;
};

export const getLowStockSupplies = async () => {
        const response = await axiosInstance.get(`${API_URL}/low-stock`);
        return response.data;
};