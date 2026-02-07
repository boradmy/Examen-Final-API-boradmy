import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import PeliculaCard from "../components/PeliculaCard";
import Loading from "../components/Loading";

import { getPeliculas } from "../services/peliculaServices";

export default function PeliculaList() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    let mounted = true;

    async function loadPeliculas() {
      try {
        const data = await getPeliculas();
        if (mounted) setPeliculas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando películas:", error);
        alert("Error obteniendo las películas");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPeliculas();
    return () => (mounted = false);
  }, []);

  // 🔹 LOADING GLOBAL
  if (loading) {
    return <Loading text="Cargando películas..." />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Películas
      </Typography>

      {peliculas.length === 0 ? (
        <Typography>No hay películas registradas.</Typography>
      ) : (
        <Grid container spacing={2} marginTop={2}>
          {peliculas.map((pelicula) => (
            <Grid item xs={12} sm={6} md={4} key={pelicula.id}>
              <PeliculaCard
                pelicula={pelicula}
                isLoggedIn={isLoggedIn}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
