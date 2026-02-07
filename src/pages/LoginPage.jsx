import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { login } from "../services/authServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseData = await login(
        loginData.username,
        loginData.password
      );

      localStorage.setItem("access_token", responseData.access_token);
      alert("Bienvenido a CatFlix 🎬");
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Box component="form" onSubmit={handleSubmit} className="login-box">
        <Typography variant="h5" gutterBottom>
          Iniciar sesión en CatFlix
        </Typography>

        <TextField
          label="Usuario"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="error"
          disabled={loading}
          className="login-button"
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Ingresar"
          )}
        </Button>
      </Box>
    </div>
  );
}
