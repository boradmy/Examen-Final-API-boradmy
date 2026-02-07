import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CardStyles.css";

export default function DirectorCard({ director, isLoggedIn, onDelete }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  const imageUrl = director.picture ? `${mediaUrl}/${director.picture}` : null;
  const navigate = useNavigate();

  return (
    <Card>
      {imageUrl && (
        <CardMedia
          component="img"
          className="card-media"
          image={imageUrl}
          alt={director.nombre}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {director.nombre}
        </Typography>
        {director.nacionalidad && (
          <Typography variant="body2" color="text.secondary">
            Nacionalidad: {director.nacionalidad}
          </Typography>
        )}
        {director.fecha_nacimiento && (
          <Typography variant="body2" color="text.secondary">
            Fecha de nacimiento: {director.fecha_nacimiento}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/directores/${director.id}`)}>
          Ver detalles
        </Button>
        {isLoggedIn && (
          <>
            <Button size="small" onClick={() => navigate(`/edit-director/${director.id}`)}>
              Editar
            </Button>
            <Button size="small" color="error" onClick={() => onDelete(director)}>
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
