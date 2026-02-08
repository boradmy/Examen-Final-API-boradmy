import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  getDirectorById,
  updateDirector,
  createDirector,
} from "../services/directorServices";

import Loading from "../components/Loading";
import "./DirectorForm.css";

export default function DirectorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [directorData, setDirectorData] = useState({
    nombre: "",
    nacionalidad: "",
    picture: null,
  });

  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      async function fetchDirector() {
        try {
          const data = await getDirectorById(id);
          setDirectorData({
            nombre: data.nombre || "",
            nacionalidad: data.nacionalidad || "",
            picture: null, // no cargamos imagen existente
          });
        } catch (error) {
          console.error("Error cargando director:", error);
          alert("Error cargando director");
        } finally {
          setLoading(false);
        }
      }

      fetchDirector();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDirectorData({
      ...directorData,
      [name]: name === "picture" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateDirector(id, directorData);
        alert("Director actualizado correctamente");
      } else {
        await createDirector(directorData);
        alert("Director creado correctamente");
      }
      navigate("/directores");
    } catch (error) {
      console.error("Error guardando director:", error);
      alert("Error guardando director");
    }
  };

  if (loading) {
    return <Loading text="Cargando director..." />;
  }

  return (
    <Card className="form-card" sx={{ backgroundColor: "#1c1c1c", color: "#fff" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ color: "#e50914", fontWeight: "bold" }}>
          {id ? "Editar Director" : "Agregar Director"}
        </Typography>

        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Nombre"
            name="nombre"
            value={directorData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Nacionalidad"
            name="nacionalidad"
            value={directorData.nacionalidad}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            style={{ marginTop: "15px", marginBottom: "15px" }}
          />

          <div className="form-actions">
            <Button type="submit" variant="contained" color="success">
              Guardar
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/directores")}
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