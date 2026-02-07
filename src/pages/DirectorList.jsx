import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import DirectorCard from "../components/DirectorCard";
import Loading from "../components/Loading";

import { getDirectores, deleteDirector } from "../services/directorServices";

export default function DirectorList() {
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    async function fetchDirectores() {
      try {
        const data = await getDirectores();
        setDirectores(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando directores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDirectores();
  }, []);

  const handleDelete = async (director) => {
    if (
      window.confirm(`¿Seguro que quieres eliminar a ${director.name}?`)
    ) {
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
    return <Loading text="Cargando directores..." />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Directores
      </Typography>

      <Grid container spacing={2}>
        {directores.length > 0 ? (
          directores.map((director) => (
            <Grid item xs={12} sm={6} md={4} key={director.id}>
              <DirectorCard
                director={director}
                isLoggedIn={isLoggedIn}
                onDelete={handleDelete}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No hay directores disponibles.
          </Typography>
        )}
      </Grid>
    </div>
  );
}
