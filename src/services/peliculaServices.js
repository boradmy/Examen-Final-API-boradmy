import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Obtener la lista de pokemones
 */
export async function fetchPokemons() {
  const response = await axios.get(`${API_BASE_URL}/pokemons`);
  return response.data;
}

/**
 * Convertir un archivo a Base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Crear un nuevo pokemon
 */
export async function addPokemon(pokemonData) {
  let pictureBase64 = "";

  if (pokemonData.picture) {
    pictureBase64 = await fileToBase64(pokemonData.picture);
  }

  const payload = {
    ...pokemonData,
    picture: pictureBase64,
  };

  const response = await axios.post(`${API_BASE_URL}/pokemons/`, payload);
  return response.data;
}

/**
 * Obtener un pokemon por ID
 */
export async function fetchPokemonById(id) {
  const response = await axios.get(`${API_BASE_URL}/pokemons/${id}/`);
  return response.data;
}

/**
 * Actualizar un pokemon existente
 */
export async function updatePokemon(id, pokemonData) {
  let payload = { ...pokemonData };

  if (pokemonData.picture) {
    const pictureBase64 = await fileToBase64(pokemonData.picture);
    payload.picture = pictureBase64;
  } else {
    delete payload.picture; // ← no envía el campo si no hay imagen nueva
  }

  const response = await axios.put(`${API_BASE_URL}/pokemons/${id}/`, payload);
  return response.data;
}

/**
 * Eliminar un pokemon
 */
export async function deletePokemon(id) {
  const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}/`);
  return response.data;
}

/**
 * Logout
 */
export async function logout() {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  const params = new URLSearchParams();
  params.append("token", token);
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);

  await axios.post(`${AUTH_BASE_URL}/revoke_token/`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  localStorage.removeItem("access_token");
}