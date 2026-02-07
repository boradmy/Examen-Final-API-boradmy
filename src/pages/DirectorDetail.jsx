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

import { getDirectorById } from "../services/directorServices";
import Loading from "../components/Loading";

import "./DirectorDetail.css";

export default function DirectorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);

  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    async function fetchDirector() {
      try {
        const data = await getDirectorById(id);
        setDirector(data);
      } catch (error) {
        console.error(error);
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

  const imageUrl = director.picture
    ? `${mediaUrl}/${director.picture}`
    : null;

  return (
    <Card className="detail-card">
      <CardContent>
        <Typography variant="h4" className="director-name">
          {director.name}
        </Typography>

        <Divider className="divider" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box className="director-left">
              <Avatar
                src={imageUrl}
                alt={director.name}
                className="director-image-large"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box className="director-info">
              <Typography>
                <strong>Nacionalidad:</strong> {director.nationality}
              </Typography>
              <Typography>
                <strong>Año de nacimiento:</strong> {director.birthYear}
              </Typography>
              <Typography>
                <strong>Premios:</strong> {director.awards}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <div className="detail-actions">
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
