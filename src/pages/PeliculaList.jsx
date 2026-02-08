import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import PeliculaCard from "../components/PeliculaCard";
import Loading from "../components/Loading";
import { getPeliculas, deletePelicula } from "../services/peliculaServices";

export default function PeliculaList() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    async function fetchPeliculas() {
      try {
        const data = await getPeliculas();
        // ✅ soporta array directo o paginado con results
        setPeliculas(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("Error cargando películas:", error);
        alert("Error obteniendo las películas");
      } finally {
        setLoading(false);
      }
    }

    fetchPeliculas();
  }, []);

  const handleDelete = async (pelicula) => {
    if (window.confirm(`¿Seguro que quieres eliminar "${pelicula.titulo}"?`)) {
      try {
        await deletePelicula(pelicula.id);
        setPeliculas((prev) => prev.filter((p) => p.id !== pelicula.id));
        alert("Película eliminada exitosamente");
      } catch (error) {
        console.error("Error eliminando película:", error);
        alert("Error eliminando película");
      }
    }
  };

  // 🔹 LOADING GLOBAL
  if (loading) {
    return <Loading text="Cargando películas..." />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Películas
      </Typography>

      <Grid container spacing={2}>
        {peliculas.length > 0 ? (
          peliculas.map((pelicula) => (
            <Grid item xs={12} sm={6} md={4} key={pelicula.id}>
              <PeliculaCard
                movie={pelicula}   // ✅ prop correcta
                isLoggedIn={isLoggedIn}
                onDelete={() => handleDelete(pelicula)}
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