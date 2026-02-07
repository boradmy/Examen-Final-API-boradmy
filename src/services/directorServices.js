import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Interceptor global: añade el token automáticamente
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper para convertir archivo a Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function getEntrenadores() {
  const res = await axios.get(`${API_BASE_URL}/entrenadores/`);
  return res.data;
}

export async function getEntrenadorById(id) {
  const res = await axios.get(`${API_BASE_URL}/entrenadores/${id}/`);
  return res.data;
}

export async function createEntrenador(data) {
  let pictureBase64 = "";
  if (data.picture) {
    pictureBase64 = await fileToBase64(data.picture);
  }

  const payload = {
    ...data,
    picture: pictureBase64,
  };

  const res = await axios.post(`${API_BASE_URL}/entrenadores/`, payload);
  return res.data;
}

export async function updateEntrenador(id, data) {
  let payload = { ...data };

  if (data.picture) {
    const pictureBase64 = await fileToBase64(data.picture);
    payload.picture = pictureBase64;
  } else {
    delete payload.picture; // no envía campo si no hay imagen nueva
  }

  const res = await axios.put(`${API_BASE_URL}/entrenadores/${id}/`, payload);
  return res.data;
}

export async function deleteEntrenador(id) {
  await axios.delete(`${API_BASE_URL}/entrenadores/${id}/`);
}