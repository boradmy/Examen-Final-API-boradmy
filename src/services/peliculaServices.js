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
   OBTENER PELÍCULAS
========================= */
export async function getPeliculas() {
  const res = await api.get("/peliculas/");
  return res.data;
}

export async function getPeliculaById(id) {
  const res = await api.get(`/peliculas/${id}/`);
  return res.data;
}

/* =========================
   CREAR PELÍCULA
========================= */
export async function createPelicula(data) {
  const formData = new FormData();

  if (data.titulo) formData.append("titulo", data.titulo);
  if (data.genero) formData.append("genero", data.genero);
  if (data.anio) formData.append("anio", Number(data.anio));
  if (data.director) formData.append("director", data.director); // 👈 corregido
  if (data.picture) formData.append("picture", data.picture);

  const res = await api.post("/peliculas/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

/* =========================
   ACTUALIZAR PELÍCULA
========================= */
export async function updatePelicula(id, data) {
  const formData = new FormData();

  if (data.titulo) formData.append("titulo", data.titulo);
  if (data.genero) formData.append("genero", data.genero);
  if (data.anio) formData.append("anio", Number(data.anio));
  if (data.director) formData.append("director", data.director); // 👈 corregido
  if (data.picture) formData.append("picture", data.picture);

  const res = await api.put(`/peliculas/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

/* =========================
   ELIMINAR PELÍCULA
========================= */
export async function deletePelicula(id) {
  await api.delete(`/peliculas/${id}/`);
}