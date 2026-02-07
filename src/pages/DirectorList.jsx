import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import EntrenadorCard from "../components/EntrenadorCard";
import Loading from "../components/Loading";

import { getEntrenadores, deleteEntrenador } from "../services/trainerServices";

export default function EntrenadorList() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    async function fetchEntrenadores() {
      try {
        const data = await getEntrenadores();
        setEntrenadores(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando entrenadores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEntrenadores();
  }, []);

  const handleDelete = async (entrenador) => {
    if (window.confirm(`¿Seguro que quieres eliminar a ${entrenador.name}?`)) {
      await deleteEntrenador(entrenador.id);
      setEntrenadores((prev) =>
        prev.filter((e) => e.id !== entrenador.id)
      );
      alert("Entrenador eliminado exitosamente");
    }
  };

  // 🔹 LOADING GLOBAL
  if (loading) {
    return <Loading text="Cargando entrenadores..." />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Entrenadores
      </Typography>

      <Grid container spacing={2}>
        {entrenadores.length > 0 ? (
          entrenadores.map((e) => (
            <Grid item xs={12} sm={6} md={4} key={e.id}>
              <EntrenadorCard
                entrenador={e}
                isLoggedIn={isLoggedIn}
                onDelete={handleDelete}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No hay entrenadores disponibles.
          </Typography>
        )}
      </Grid>
    </div>
  );
}
