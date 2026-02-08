import { Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CardStyles.css";

export default function DirectorCard({ director, isLoggedIn, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card className="card-container">
      {director.picture && (
        <CardMedia
          component="img"
          className="card-media"
          image={director.picture}
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
            <IconButton
              aria-label="editar"
              color="warning"
              onClick={() => navigate(`/edit-director/${director.id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="eliminar"
              color="error"
              onClick={() => onDelete(director)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}