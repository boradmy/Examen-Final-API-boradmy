import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* 🔐 Interceptor */
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

/* Obtener películas */
export async function getPeliculas() {
  const res = await axios.get(`${API_BASE_URL}/peliculas/`);
  return res.data;
}

/* Obtener película por ID */
export async function getPeliculaById(id) {
  const res = await axios.get(`${API_BASE_URL}/peliculas/${id}/`);
  return res.data;
}

/* Crear película */
export async function createPelicula(data) {
  let payload = { ...data };

  if (data.poster) {
    payload.poster = await fileToBase64(data.poster);
  }

  const res = await axios.post(`${API_BASE_URL}/peliculas/`, payload);
  return res.data;
}

/* Actualizar película */
export async function updatePelicula(id, data) {
  let payload = { ...data };

  if (data.poster) {
    payload.poster = await fileToBase64(data.poster);
  } else {
    delete payload.poster;
  }

  const res = await axios.put(`${API_BASE_URL}/peliculas/${id}/`, payload);
  return res.data;
}

/* Eliminar película */
export async function deletePelicula(id) {
  await axios.delete(`${API_BASE_URL}/peliculas/${id}/`);
}
