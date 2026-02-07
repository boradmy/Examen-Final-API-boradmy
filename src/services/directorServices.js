import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* 🔐 Interceptor global */
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* Convertir archivo a Base64 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* Obtener directores */
export async function getDirectores() {
  const res = await axios.get(`${API_BASE_URL}/directores/`);
  return res.data;
}

/* Obtener director por ID */
export async function getDirectorById(id) {
  const res = await axios.get(`${API_BASE_URL}/directores/${id}/`);
  return res.data;
}

/* Crear director */
export async function createDirector(data) {
  let payload = { ...data };

  if (data.picture) {
    payload.picture = await fileToBase64(data.picture);
  }

  const res = await axios.post(`${API_BASE_URL}/directores/`, payload);
  return res.data;
}

/* Actualizar director */
export async function updateDirector(id, data) {
  let payload = { ...data };

  if (data.picture) {
    payload.picture = await fileToBase64(data.picture);
  } else {
    delete payload.picture;
  }

  const res = await axios.put(`${API_BASE_URL}/directores/${id}/`, payload);
  return res.data;
}

/* Eliminar director */
export async function deleteDirector(id) {
  await axios.delete(`${API_BASE_URL}/directores/${id}/`);
}
