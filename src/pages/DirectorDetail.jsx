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
    <Card className="detail-card">
      <CardContent>
        <Typography variant="h4" className="detail-title">
          {director.nombre}
        </Typography>

        <Divider className="detail-divider" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box className="director-left">
              {director.picture && (
                <img
                  src={director.picture}
                  alt={director.nombre}
                  className="director-image-large"
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

        <div className="detail-actions">
          <Button
            className="btn-primary"
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate("/directores");
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