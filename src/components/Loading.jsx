import { CircularProgress, Typography } from "@mui/material";
import "./Loading.css";

export default function Loading({ text = "Cargando contenido..." }) {
  return (
    <div className="loading-container">
      <CircularProgress size={60} thickness={4} />
      <Typography
        variant="h6"
        className="loading-text"
      >
        {text}
      </Typography>
    </div>
  );
}
