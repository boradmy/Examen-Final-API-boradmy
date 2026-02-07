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

import { getPeliculaById } from "../services/peliculaServices";
import Loading from "../components/Loading";

import "./PeliculaDetail.css";

export default function PeliculaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);

  const mediaUrl = import.meta.env?.VITE_MEDIA_URL || "";

  useEffect(() => {
    let mounted = true;

    async function fetchPelicula() {
      try {
        const data = await getPeliculaById(id);
        if (mounted) setPelicula(data || null);
      } catch (error) {
        console.error("Error cargando la película:", error);
        alert("Error cargando la película");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPelicula();
    return () => (mounted = false);
  }, [id]);

  // 🔹 LOADING GLOBAL
  if (loading) {
    return <Loading text="Cargando película..." />;
  }

  if (!pelicula) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        No se encontró información de la película.
      </Typography>
    );
  }

  // URL segura del póster
  let imageUrl = "";
  if (pelicula.poster) {
    const base = mediaUrl.replace(/\/+$/, "");
    const rel = String(pelicula.poster).replace(/^\/+/, "");
    imageUrl = base ? `${base}/${rel}` : `/${rel}`;
  }

  return (
    <Card className="detail-card">
      <CardContent>
        {/* Título */}
        <Typography variant="h4" gutterBottom>
          {pelicula.title}
        </Typography>

        <Divider className="divider" />

        <Grid container spacing={3}>
          {/* Imagen */}
          <Grid item xs={12} md={4}>
            <Box className="detail-left">
              <Avatar
                src={imageUrl || undefined}
                alt={pelicula.title}
                variant="square"
                className="detail-image-rect"
              />
            </Box>
          </Grid>

          {/* Información */}
          <Grid item xs={12} md={8}>
            <Box className="detail-info">
              {pelicula.genre && (
                <Typography variant="body1">
                  <strong>Género:</strong> {pelicula.genre}
                </Typography>
              )}

              {pelicula.release_year && (
                <Typography variant="body1">
                  <strong>Año:</strong> {pelicula.release_year}
                </Typography>
              )}

              {pelicula.duration && (
                <Typography variant="body1">
                  <strong>Duración:</strong> {pelicula.duration} min
                </Typography>
              )}

              {pelicula.description && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Descripción:</strong> {pelicula.description}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Botón volver */}
        <div className="detail-actions">
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
