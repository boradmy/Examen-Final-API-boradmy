import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
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

  useEffect(() => {
    async function fetchPelicula() {
      try {
        const data = await getPeliculaById(id);
        setPelicula(data || null);
      } catch (error) {
        console.error("Error cargando la película:", error);
        alert("Error cargando la película");
      } finally {
        setLoading(false);
      }
    }

    fetchPelicula();
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

  return (
    <Card className="detail-card" sx={{ backgroundColor: "#1c1c1c", color: "#fff" }}>
      <CardContent>
        {/* Título */}
        <Typography variant="h4" gutterBottom sx={{ color: "#e50914", fontWeight: "bold" }}>
          {pelicula.titulo}
        </Typography>

        <Divider sx={{ my: 2, borderColor: "#e50914" }} />

        <Grid container spacing={3}>
          {/* Imagen */}
          <Grid item xs={12} md={4}>
            <Box className="detail-left">
              {pelicula.picture && (
                <img
                  src={pelicula.picture}   // ✅ usar directamente el campo del backend
                  alt={pelicula.titulo}
                  className="detail-image-rect"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
            </Box>
          </Grid>

          {/* Información */}
          <Grid item xs={12} md={8}>
            <Box className="detail-info">
              {pelicula.genero && (
                <Typography variant="body1">
                  <strong>Género:</strong> {pelicula.genero}
                </Typography>
              )}

              {pelicula.anio && (
                <Typography variant="body1">
                  <strong>Año:</strong> {pelicula.anio}
                </Typography>
              )}

              {pelicula.director && (
                <Typography variant="body1">
                  <strong>Director:</strong> {pelicula.director.nombre}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Botón volver */}
        <div className="detail-actions" style={{ marginTop: "20px" }}>
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