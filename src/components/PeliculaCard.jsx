import { Card, CardMedia, CardContent, CardActions, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CardStyles.css";

export default function PeliculaCard({ movie, isLoggedIn, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card className="card-container">
      {movie.picture && (
        <CardMedia
          component="img"
          className="card-media"
          image={movie.picture}
          alt={movie.titulo}
        />
      )}

      <CardContent className="card-content">
        <Typography variant="h5" className="card-title">
          {movie.titulo}
        </Typography>

        {movie.genero && (
          <Typography variant="body2" className="card-subtitle">
            Género: {movie.genero}
          </Typography>
        )}

        {movie.anio && (
          <Typography variant="body2" className="card-subtitle">
            Año: {movie.anio}
          </Typography>
        )}
      </CardContent>

      <CardActions className="card-actions">
        <Button
          className="btn-primary"
          onClick={() => navigate(`/peliculas/${movie.id}`)}
        >
          Ver detalles
        </Button>

        {isLoggedIn && (
          <>
            <IconButton
              aria-label="editar"
              color="warning"
              onClick={() => navigate(`/edit-pelicula/${movie.id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="eliminar"
              color="error"
              onClick={() => onDelete(movie)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}