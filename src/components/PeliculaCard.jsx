import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CardStyles.css";

export default function PokemonCard({ pokemon, isLoggedIn, onDelete }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  // 👇 Validamos que picture exista
  const imageUrl = pokemon?.picture ? `${mediaUrl}/${pokemon.picture}` : null;
  const navigate = useNavigate();

  return (
    <Card>
      {/* Solo renderizamos la imagen si existe */}
      {imageUrl && (
        <CardMedia
          component="img"
          className="card-media"
          image={imageUrl}
          alt={pokemon.name}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tipo: {pokemon.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
          Ver detalles
        </Button>
        {isLoggedIn && (
          <>
            <Button size="small" onClick={() => navigate(`/edit-pokemon/${pokemon.id}`)}>
              Editar
            </Button>
            <Button size="small" color="error" onClick={() => onDelete(pokemon)}>
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}