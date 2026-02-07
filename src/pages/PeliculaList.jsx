import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading"; // 👈 loading reutilizable
import { fetchPokemons } from "../services/pokemonServices";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    let mounted = true;

    async function loadPokemons() {
      try {
        const data = await fetchPokemons();
        if (mounted) setPokemons(data || []);
      } catch (error) {
        console.error(error);
        alert("Error obteniendo los pokemons");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPokemons();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ LOADING CENTRADO
  if (loading) {
    return <Loading text="Cargando Pokémons..." />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Pokémons
      </Typography>

      {pokemons.length === 0 ? (
        <Typography>No hay pokémons registrados.</Typography>
      ) : (
        <Grid container spacing={2} marginTop={2}>
          {pokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
              <PokemonCard
                pokemon={pokemon}
                isLoggedIn={isLoggedIn}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
