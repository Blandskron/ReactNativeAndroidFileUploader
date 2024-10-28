// src/utils/api.js
import axios from 'axios';
import { BASE_URL } from '../constants'; // Asegúrate de que BASE_URL está correcto y es accesible

export const uploadFile = async (formData) => {
  return axios.post(`${BASE_URL}/api/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 20000,
  });
};

export const fetchPdfs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/pdfs/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    return [];
  }
};

export const deletePdf = async (name) => {
  try {
    await axios.delete(`${BASE_URL}/api/pdfs/`, { params: { name } });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    throw error;
  }
};