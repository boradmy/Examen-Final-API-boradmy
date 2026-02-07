import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Divider,
  Box,
  Grid,
} from "@mui/material";

import { fetchPokemonById } from "../services/pokemonServices";
import Loading from "../components/Loading"; // 👈 IMPORTANTE
import "./PokemonDetail.css";

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const mediaUrl = import.meta.env?.VITE_MEDIA_URL || "";

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await fetchPokemonById(id);
        if (mounted) setPokemon(data || null);
      } catch (err) {
        console.error("Error obteniendo el Pokémon:", err);
        alert("Error obteniendo el Pokémon");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  // ✅ LOADING CENTRADO
  if (loading) {
    return <Loading text="Cargando Pokémon..." />;
  }

  if (!pokemon) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        No se encontró información del Pokémon.
      </Typography>
    );
  }

  // Construcción segura de la URL de imagen
  let imageUrl = "";
  if (pokemon.picture) {
    const base = (mediaUrl || "").replace(/\/+$/, "");
    const rel = String(pokemon.picture).replace(/^\/+/, "");
    imageUrl = base ? `${base}/${rel}` : `/${rel}`;
  }

  // type puede ser string o array
  const types = Array.isArray(pokemon.type)
    ? pokemon.type
    : pokemon.type
    ? [pokemon.type]
    : [];

  return (
    <Card className="poke-detail-card">
      <CardContent>
        <Typography variant="h4" className="poke-name" gutterBottom>
          {pokemon.name || "Pokémon"}
        </Typography>

        <Divider className="poke-divider" />

        <Grid container spacing={3} className="poke-main-grid">
          {/* Imagen */}
          <Grid item xs={12} md={4}>
            <Box className="poke-left">
              <Avatar
                src={imageUrl || undefined}
                alt={pokemon.name || "Pokémon"}
                variant="square"
                className="poke-image-rect"
              />
            </Box>
          </Grid>

          {/* Información */}
          <Grid item xs={12} md={8}>
            <Box className="poke-info">
              {types.length > 0 && (
                <Typography variant="body1">
                  <strong>Tipo:</strong> {types.join(", ")}
                </Typography>
              )}
              {pokemon.height !== undefined && (
                <Typography variant="body1">
                  <strong>Altura:</strong> {pokemon.height}
                </Typography>
              )}
              {pokemon.weight !== undefined && (
                <Typography variant="body1">
                  <strong>Peso:</strong> {pokemon.weight}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        <div className="poke-actions">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
