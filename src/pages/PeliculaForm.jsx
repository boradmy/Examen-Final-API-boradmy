import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  getPeliculaById,
  createPelicula,
  updatePelicula,
} from "../services/peliculaServices";

import Loading from "../components/Loading";
import "./PeliculaForm.css";

export default function PeliculaForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [peliculaData, setPeliculaData] = useState({
    title: "",
    genre: "",
    release_year: "",
    duration: "",
    description: "",
    poster: null,
  });

  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  // 🔹 Cargar datos si es edición
  useEffect(() => {
    let mounted = true;

    async function loadPelicula() {
      if (!id) return;

      try {
        const data = await getPeliculaById(id);
        if (mounted) {
          setPeliculaData({
            title: data.title || "",
            genre: data.genre || "",
            release_year: data.release_year || "",
            duration: data.duration || "",
            description: data.description || "",
            poster: null, // el archivo solo se envía si se cambia
          });
        }
      } catch (error) {
        console.error("Error cargando la película:", error);
        alert("Error cargando la película");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPelicula();
    return () => (mounted = false);
  }, [id]);

  // 🔹 Manejo de inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPeliculaData((prev) => ({
      ...prev,
      [name]: name === "poster" ? files[0] : value,
    }));
  };

  // 🔹 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      Object.entries(peliculaData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      if (id) {
        await updatePelicula(id, formData);
        alert("Película actualizada correctamente");
      } else {
        await createPelicula(formData);
        alert("Película agregada correctamente");
      }

      navigate("/peliculas");
    } catch (error) {
      console.error("Error guardando la película:", error);
      alert("Error guardando la película");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 LOADING GLOBAL
  if (loading) {
    return <Loading text="Cargando película..." />;
  }

  return (
    <Card className="form-card">
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          {id ? "Editar Película" : "Agregar Película"}
        </Typography>

        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Título"
            name="title"
            value={peliculaData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Género"
            name="genre"
            value={peliculaData.genre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Año de estreno"
            name="release_year"
            type="number"
            value={peliculaData.release_year}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Duración (min)"
            name="duration"
            type="number"
            value={peliculaData.duration}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Descripción"
            name="description"
            value={peliculaData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />

          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
          />

          <div className="form-actions">
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={saving}
            >
              {saving ? "Guardando..." : id ? "Guardar cambios" : "Guardar"}
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/peliculas")}
              disabled={saving}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
