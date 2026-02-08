import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PeliculaCard({ movie, isLoggedIn, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#1c1c1c", color: "#fff" }}>
      {movie.picture && (
        <CardMedia
          component="img"
          className="card-media"
          image={movie.picture}   // ✅ usar directamente el campo del backend
          alt={movie.titulo}
          sx={{ height: 200, objectFit: "cover" }}
        />
      )}

      <CardContent>
        <Typography variant="h5" sx={{ color: "#e50914", fontWeight: "bold" }}>
          {movie.titulo}
        </Typography>

        {movie.genero && (
          <Typography variant="body2" color="text.secondary">
            Género: {movie.genero}
          </Typography>
        )}

        {movie.anio && (
          <Typography variant="body2" color="text.secondary">
            Año: {movie.anio}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/peliculas/${movie.id}`)}
        >
          Ver detalles
        </Button>

        {isLoggedIn && (
          <>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => navigate(`/edit-pelicula/${movie.id}`)}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
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