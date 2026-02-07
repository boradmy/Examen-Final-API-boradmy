import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CardStyles.css";

export default function EntrenadorCard({ entrenador, isLoggedIn, onDelete }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  const imageUrl = entrenador.picture ? `${mediaUrl}/${entrenador.picture}` : null;
  const navigate = useNavigate();

  return (
    <Card>
      {imageUrl && (
        <CardMedia
          component="img"
          className="card-media"
          image={imageUrl}
          alt={entrenador.name}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {entrenador.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Edad: {entrenador.age}
        </Typography>
        {entrenador.city && (
          <Typography variant="body2" color="text.secondary">
            Ciudad: {entrenador.city}
          </Typography>
        )}
        {entrenador.specialty && (
          <Typography variant="body2" color="text.secondary">
            Especialidad: {entrenador.specialty}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/entrenador/${entrenador.id}`)}>
          Ver detalles
        </Button>
        {isLoggedIn && (
          <>
            <Button size="small" onClick={() => navigate(`/edit-entrenador/${entrenador.id}`)}>
              Editar
            </Button>
            <Button size="small" color="error" onClick={() => onDelete(entrenador)}>
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}