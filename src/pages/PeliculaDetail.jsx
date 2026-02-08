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
import { getDirectorById } from "../services/directorServices"; // 👈 importar
import Loading from "../components/Loading";

import "./PeliculaDetail.css";

export default function PeliculaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null);
  const [directorNombre, setDirectorNombre] = useState(""); // 👈 nuevo estado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPelicula() {
      try {
        const data = await getPeliculaById(id);
        setPelicula(data || null);

        // 👇 si la película tiene director, pedimos su nombre
        if (data && data.director) {
          const directorData = await getDirectorById(data.director);
          setDirectorNombre(directorData.nombre);
        }
      } catch (error) {
        console.error("Error cargando la película:", error);
        alert("Error cargando la película");
      } finally {
        setLoading(false);
      }
    }

    fetchPelicula();
  }, [id]);

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
    <Card className="detail-card">
      <CardContent>
        <Typography variant="h4" className="detail-title">
          {pelicula.titulo}
        </Typography>

        <Divider className="detail-divider" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box className="detail-left">
              {pelicula.picture && (
                <img
                  src={pelicula.picture}
                  alt={pelicula.titulo}
                  className="detail-image-rect"
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box className="detail-info">
              {pelicula.genero && (
                <Typography>
                  <strong>Género:</strong> {pelicula.genero}
                </Typography>
              )}
              {pelicula.anio && (
                <Typography>
                  <strong>Año:</strong> {pelicula.anio}
                </Typography>
              )}
              {directorNombre && (
                <Typography>
                  <strong>Director:</strong> {directorNombre}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        <div className="detail-actions">
          <Button
            className="btn-primary"
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate("/peliculas");
              }
            }}
          >
            Volver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}