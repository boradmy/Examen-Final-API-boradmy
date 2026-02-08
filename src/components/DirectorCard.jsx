import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CardStyles.css"; // ✅ importa tu CSS

export default function DirectorCard({ director, isLoggedIn, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card className="card-container">
      {director.picture && (
        <CardMedia
          component="img"
          className="card-media"
          image={director.picture}   // ✅ usar directamente el campo del backend
          alt={director.nombre}
        />
      )}

      <CardContent className="card-content">
        <Typography variant="h5" className="card-title">
          {director.nombre}
        </Typography>

        {director.nacionalidad && (
          <Typography variant="body2" className="card-subtitle">
            Nacionalidad: {director.nacionalidad}
          </Typography>
        )}

        {director.fecha_nacimiento && (
          <Typography variant="body2" className="card-subtitle">
            Nacimiento: {director.fecha_nacimiento}
          </Typography>
        )}
      </CardContent>

      <CardActions className="card-actions">
        <Button
          className="btn-primary"
          onClick={() => navigate(`/directores/${director.id}`)}
        >
          Ver detalles
        </Button>

        {isLoggedIn && (
          <>
            <Button
              className="btn-warning"
              onClick={() => navigate(`/edit-director/${director.id}`)}
            >
              Editar
            </Button>
            <Button
              className="btn-danger"
              onClick={() => onDelete(director)}
            >
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}