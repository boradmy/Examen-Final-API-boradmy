import { useEffect, useState } from "react";
import { Grid, Typography, Divider } from "@mui/material";

import PeliculaCard from "../components/PeliculaCard";
import DirectorCard from "../components/DirectorCard";
import Loading from "../components/Loading";

import { getMovies, deleteMovie } from "../services/movieServices";
import { getDirectores, deleteDirector } from "../services/directorServices";

import "./Home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    async function fetchData() {
      try {
        const movieData = await getMovies();
        const directorData = await getDirectores();

        setMovies(Array.isArray(movieData) ? movieData : []);
        setDirectores(Array.isArray(directorData) ? directorData : []);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDeleteMovie = async (movie) => {
    if (window.confirm(`¿Eliminar la película "${movie.title}"?`)) {
      try {
        await deleteMovie(movie.id);
        setMovies((prev) => prev.filter((m) => m.id !== movie.id));
        alert("Película eliminada exitosamente");
      } catch (error) {
        console.error("Error eliminando película:", error);
        alert("Error eliminando película");
      }
    }
  };

  const handleDeleteDirector = async (director) => {
    if (window.confirm(`¿Eliminar al director ${director.name}?`)) {
      try {
        await deleteDirector(director.id);
        setDirectores((prev) =>
          prev.filter((d) => d.id !== director.id)
        );
        alert("Director eliminado exitosamente");
      } catch (error) {
        console.error("Error eliminando director:", error);
        alert("Error eliminando director");
      }
    }
  };

  // 🔹 LOADING GLOBAL
  if (loading) {
    return <Loading text="Cargando CatFlix..." />;
  }

  return (
    <div className="home-container">
      {/* 🎬 DIRECTORES */}
      <Typography variant="h4" gutterBottom>
        Directores
      </Typography>

      <Grid container spacing={2} className="grid-section">
        {directores.length > 0 ? (
          directores.map((director) => (
            <Grid item xs={12} sm={6} md={4} key={director.id}>
              <DirectorCard
                director={director}
                isLoggedIn={isLoggedIn}
                onDelete={handleDeleteDirector}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No hay directores disponibles.
          </Typography>
        )}
      </Grid>

      <Divider className="divider" />

      {/* 🎥 PELÍCULAS */}
      <Typography variant="h4" gutterBottom>
        Películas
      </Typography>

      <Grid container spacing={2} className="grid-section">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <PeliculaCard
                movie={movie}
                isLoggedIn={isLoggedIn}
                onDelete={handleDeleteMovie}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No hay películas disponibles.
          </Typography>
        )}
      </Grid>
    </div>
  );
}
