import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DirectorCard({ director, isLoggedIn, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#1c1c1c", color: "#fff" }}>
      {director.picture && (
        <CardMedia
          component="img"
          className="card-media"
          image={director.picture}   // ✅ usar directamente el campo del backend
          alt={director.nombre}
          sx={{ height: 200, objectFit: "cover" }}
        />
      )}

      <CardContent>
        <Typography variant="h5" sx={{ color: "#e50914", fontWeight: "bold" }}>
          {director.nombre}
        </Typography>

        {director.nacionalidad && (
          <Typography variant="body2" color="text.secondary">
            Nacionalidad: {director.nacionalidad}
          </Typography>
        )}

        {director.fecha_nacimiento && (
          <Typography variant="body2" color="text.secondary">
            Nacimiento: {director.fecha_nacimiento}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/directores/${director.id}`)}
        >
          Ver detalles
        </Button>

        {isLoggedIn && (
          <>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => navigate(`/edit-director/${director.id}`)}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
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