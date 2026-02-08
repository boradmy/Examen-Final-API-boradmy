import { useEffect, useState } from "react";
import { Grid, Typography, Divider } from "@mui/material";

import PeliculaCard from "../components/PeliculaCard";
import DirectorCard from "../components/DirectorCard";
import Loading from "../components/Loading";

import { getPeliculas, deletePelicula } from "../services/peliculaServices";
import { getDirectores, deleteDirector } from "../services/directorServices";

import "./Home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem("access_token");

  useEffect(() => {
    async function fetchData() {
      try {
        const peliculaData = await getPeliculas();
        const directorData = await getDirectores();

        setMovies(Array.isArray(peliculaData) ? peliculaData : peliculaData.results || []);
        setDirectores(Array.isArray(directorData) ? directorData : directorData.results || []);
      } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error cargando datos");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading text="Cargando CatFlix..." />;
  }

  return (
    <div className="home-container">
      {/* Sección Directores */}
      <Typography variant="h4" className="section-title" gutterBottom>
        Directores
      </Typography>

      <div className="card-row">
        {directores.length ? (
          <Grid container spacing={2} wrap="nowrap" className="scroll-row">
            {directores.map((director) => (
              <Grid item xs={12} sm={6} md={4} key={director.id}>
                <DirectorCard
                  director={director}
                  isLoggedIn={isLoggedIn}
                  onDelete={async () => {
                    if (window.confirm(`¿Seguro que quieres eliminar a ${director.nombre}?`)) {
                      await deleteDirector(director.id);
                      setDirectores((prev) => prev.filter((d) => d.id !== director.id));
                      alert("Director eliminado exitosamente");
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography className="empty-msg">No hay directores</Typography>
        )}
      </div>

      <Divider sx={{ my: 4 }} />

      {/* Sección Películas */}
      <Typography variant="h4" className="section-title" gutterBottom>
        Películas
      </Typography>

      <div className="card-row">
        {movies.length ? (
          <Grid container spacing={2} wrap="nowrap" className="scroll-row">
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <PeliculaCard
                  movie={movie}
                  isLoggedIn={isLoggedIn}
                  onDelete={async () => {
                    if (window.confirm(`¿Seguro que quieres eliminar "${movie.titulo}"?`)) {
                      await deletePelicula(movie.id);
                      setMovies((prev) => prev.filter((m) => m.id !== movie.id));
                      alert("Película eliminada exitosamente");
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography className="empty-msg">No hay películas</Typography>
        )}
      </div>
    </div>
  );
}