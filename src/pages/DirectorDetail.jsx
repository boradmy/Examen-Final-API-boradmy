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

import { getDirectorById } from "../services/directorServices";
import Loading from "../components/Loading";

import "./DirectorDetail.css";

export default function DirectorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDirector() {
      try {
        const data = await getDirectorById(id);
        setDirector(data);
      } catch (error) {
        console.error("Error cargando director:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDirector();
  }, [id]);

  if (loading) {
    return <Loading text="Cargando director..." />;
  }

  if (!director) {
    return (
      <Typography variant="body1" color="text.secondary">
        Director no encontrado.
      </Typography>
    );
  }

  return (
    <Card className="detail-card" sx={{ backgroundColor: "#1c1c1c", color: "#fff" }}>
      <CardContent>
        <Typography variant="h4" sx={{ color: "#e50914", fontWeight: "bold" }}>
          {director.nombre}
        </Typography>

        <Divider sx={{ my: 2, borderColor: "#e50914" }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box className="director-left">
              {director.picture && (
                <img
                  src={director.picture}   // ✅ usar directamente el campo del backend
                  alt={director.nombre}
                  className="director-image-large"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box className="director-info">
              {director.nacionalidad && (
                <Typography>
                  <strong>Nacionalidad:</strong> {director.nacionalidad}
                </Typography>
              )}
              {director.fecha_nacimiento && (
                <Typography>
                  <strong>Fecha de nacimiento:</strong> {director.fecha_nacimiento}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        <div className="detail-actions" style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/directores")}
          >
            Volver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}