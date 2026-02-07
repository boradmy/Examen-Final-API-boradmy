import { useEffect, useState } from "react";
import { Grid, Typography, Divider } from "@mui/material";

import PokemonCard from "../components/PokemonCard";
import EntrenadorCard from "../components/EntrenadorCard";
import Loading from "../components/Loading";

import { fetchPokemons, deletePokemon } from "../services/pokemonServices";
import { getEntrenadores, deleteEntrenador } from "../services/trainerServices";

import "./Home.css";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [entrenadores, setEntrenadores] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    async function fetchData() {
      try {
        const pokeData = await fetchPokemons();
        const trainerData = await getEntrenadores();

        setPokemons(Array.isArray(pokeData) ? pokeData : []);
        setEntrenadores(Array.isArray(trainerData) ? trainerData : []);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDeletePokemon = async (pokemon) => {
    if (window.confirm(`¿Eliminar a ${pokemon.name}?`)) {
      await deletePokemon(pokemon.id);
      setPokemons((prev) => prev.filter((p) => p.id !== pokemon.id));
    }
  };

  const handleDeleteEntrenador = async (entrenador) => {
    if (window.confirm(`¿Eliminar a ${entrenador.name}?`)) {
      await deleteEntrenador(entrenador.id);
      setEntrenadores((prev) => prev.filter((e) => e.id !== entrenador.id));
    }
  };

  // 🔹 LOADING GLOBAL (centrado correctamente)
  if (loading) {
    return <Loading text="Cargando datos..." />;
  }

  return (
    <div className="home-container">
      <Typography variant="h4" gutterBottom>
        Entrenadores
      </Typography>

      <Grid container spacing={2} className="grid-section">
        {entrenadores.length > 0 ? (
          entrenadores.map((e) => (
            <Grid item xs={12} sm={6} md={4} key={e.id}>
              <EntrenadorCard
                entrenador={e}
                isLoggedIn={isLoggedIn}
                onDelete={handleDeleteEntrenador}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No hay entrenadores disponibles.
          </Typography>
        )}
      </Grid>

      <Divider className="divider" />

      <Typography variant="h4" gutterBottom>
        Pokémons
      </Typography>

      <Grid container spacing={2} className="grid-section">
        {pokemons.length > 0 ? (
          pokemons.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <PokemonCard
                pokemon={p}
                isLoggedIn={isLoggedIn}
                onDelete={handleDeletePokemon}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No hay pokémons disponibles.
          </Typography>
        )}
      </Grid>
    </div>
  );
}
