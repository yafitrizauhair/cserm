import axios from "axios";

const API = "http://localhost:5000/api/news";

// Ambil token dengan validasi
const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token tidak ditemukan. Silakan login kembali.");
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
    ...(isMultipart && { "Content-Type": "multipart/form-data" }),
  };
};

// ==================== GET ====================
export const getNews = async () => {
  return axios.get(API, {
    headers: getAuthHeaders(),
  });
};

// ==================== CREATE ====================
export const createNews = async (data) => {
  return axios.post(API, data, {
    headers: getAuthHeaders(true),
  });
};

// ==================== UPDATE ====================
export const updateNews = async (id, data) => {
  return axios.put(`${API}/${id}`, data, {
    headers: getAuthHeaders(true),
  });
};

// ==================== DELETE ====================
export const deleteNews = async (id) => {
  return axios.delete(`${API}/${id}`, {
    headers: getAuthHeaders(),
  });
};
