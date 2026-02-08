import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CardStyles.css"; // ✅ importa tu CSS

export default function PeliculaCard({ movie, isLoggedIn, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card className="card-container">
      {movie.picture && (
        <CardMedia
          component="img"
          className="card-media"
          image={movie.picture}   // ✅ usar directamente el campo del backend
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
            <Button
              className="btn-warning"
              onClick={() => navigate(`/edit-pelicula/${movie.id}`)}
            >
              Editar
            </Button>
            <Button
              className="btn-danger"
              onClick={() => onDelete(movie)}
            >
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}