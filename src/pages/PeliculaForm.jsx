import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@mui/material";

import {
  getPeliculaById,
  createPelicula,
  updatePelicula,
} from "../services/peliculaServices";
import { getDirectores } from "../services/directorServices";

import Loading from "../components/Loading";
import "./PeliculaForm.css";

export default function PeliculaForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [peliculaData, setPeliculaData] = useState({
    titulo: "",
    genero: "",
    anio: "",
    picture: null,
    director: "",
  });

  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  // 🔹 Cargar datos si es edición
  useEffect(() => {
    async function loadData() {
      try {
        const directorData = await getDirectores();
        setDirectores(Array.isArray(directorData) ? directorData : directorData.results || []);

        if (id) {
          const data = await getPeliculaById(id);
          setPeliculaData({
            titulo: data.titulo || "",
            genero: data.genero || "",
            anio: data.anio || "",
            picture: null, // el archivo solo se envía si se cambia
            director: data.director ? data.director : "", // 👈 importante: usar el ID directo
          });
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error cargando datos");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  // 🔹 Manejo de inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPeliculaData((prev) => ({
      ...prev,
      [name]: name === "picture" ? files[0] : value,
    }));
  };

  // 🔹 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (id) {
        await updatePelicula(id, peliculaData); // 👈 objeto plano
        alert("Película actualizada correctamente");
      } else {
        await createPelicula(peliculaData); // 👈 objeto plano
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
    <Card className="form-card" sx={{ backgroundColor: "#1c1c1c", color: "#fff" }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: "#e50914", fontWeight: "bold" }}
        >
          {id ? "Editar Película" : "Agregar Película"}
        </Typography>

        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Título"
            name="titulo"
            value={peliculaData.titulo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Género"
            name="genero"
            value={peliculaData.genero}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Año"
            name="anio"
            type="number"
            value={peliculaData.anio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            select
            label="Director"
            name="director"
            value={peliculaData.director}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          >
            {directores.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.nombre}
              </MenuItem>
            ))}
          </TextField>

          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
            style={{ marginTop: "15px", marginBottom: "15px" }}
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
              sx={{ ml: 2 }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}