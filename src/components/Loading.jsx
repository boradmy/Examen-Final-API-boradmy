import { CircularProgress, Typography } from "@mui/material";
import "./Loading.css";

export default function Loading({ text = "Cargando..." }) {
  return (
    <div className="loading-container">
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {text}
      </Typography>
    </div>
  );
}
