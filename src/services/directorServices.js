import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* =========================
   INSTANCIA AXIOS
========================= */
const api = axios.create({
  baseURL: API_BASE_URL,
});

/* =========================
   INTERCEPTOR TOKEN
========================= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =========================
   OBTENER DIRECTORES
========================= */
export async function getDirectores() {
  const res = await api.get("/directores/");
  return res.data;
}

export async function getDirectorById(id) {
  const res = await api.get(`/directores/${id}/`);
  return res.data;
}

/* =========================
   CREAR DIRECTOR
========================= */
export async function createDirector(data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== "") {
      formData.append(key, data[key]);
    }
  });

  const res = await api.post("/directores/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

/* =========================
   ACTUALIZAR DIRECTOR
========================= */
export async function updateDirector(id, data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== "") {
      formData.append(key, data[key]);
    }
  });

  const res = await api.put(`/directores/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

/* =========================
   ELIMINAR DIRECTOR
========================= */
export async function deleteDirector(id) {
  await api.delete(`/directores/${id}/`);
}