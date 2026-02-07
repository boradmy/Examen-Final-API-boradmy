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

import { getEntrenadorById } from "../services/trainerServices";
import Loading from "../components/Loading";

import "./EntrenadorDetail.css";

export default function EntrenadorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entrenador, setEntrenador] = useState(null);
  const [loading, setLoading] = useState(true);

  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    async function fetchEntrenador() {
      try {
        const data = await getEntrenadorById(id);
        setEntrenador(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEntrenador();
  }, [id]);

  // 🔹 LOADING GLOBAL (MISMO PATRÓN)
  if (loading) {
    return <Loading text="Cargando entrenador..." />;
  }

  // Seguridad extra por si no existe
  if (!entrenador) {
    return (
      <Typography variant="body1" color="text.secondary">
        Entrenador no encontrado.
      </Typography>
    );
  }

  // ✅ MISMO PATRÓN QUE PokemonCard
  const imageUrl = entrenador.picture
    ? `${mediaUrl}/${entrenador.picture}`
    : null;

  return (
    <Card className="detail-card">
      <CardContent>
        {/* Título */}
        <Typography variant="h4" className="trainer-name">
          {entrenador.name}
        </Typography>

        <Divider className="divider" />

        {/* Layout principal */}
        <Grid container spacing={3} className="main-grid">
          {/* Izquierda: Foto */}
          <Grid item xs={12} md={4}>
            <Box className="trainer-left">
              <Avatar
                src={imageUrl}
                alt={entrenador.name}
                className="trainer-image-large"
              />
            </Box>
          </Grid>

          {/* Derecha: Datos */}
          <Grid item xs={12} md={8}>
            <Box className="trainer-info">
              <Typography variant="body1">
                <strong>Edad:</strong> {entrenador.age}
              </Typography>
              <Typography variant="body1">
                <strong>Ciudad:</strong> {entrenador.city}
              </Typography>
              <Typography variant="body1">
                <strong>Especialidad:</strong> {entrenador.specialty}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Botón Volver */}
        <div className="detail-actions">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/entrenadores")}
          >
            Volver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
