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
  getEntrenadorById,
  updateEntrenador,
  createEntrenador,
} from "../services/trainerServices";

import Loading from "../components/Loading";
import "./EntrenadorForm.css";

export default function EntrenadorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trainerData, setTrainerData] = useState({
    name: "",
    age: "",
    city: "",
    specialty: "",
    picture: null,
  });

  const [loading, setLoading] = useState(!!id); // solo carga si es edición

  useEffect(() => {
    if (id) {
      async function fetchEntrenador() {
        try {
          const data = await getEntrenadorById(id);
          setTrainerData({
            name: data.name,
            age: data.age,
            city: data.city,
            specialty: data.specialty,
            picture: null, // imagen se maneja aparte
          });
        } catch (error) {
          console.error("Error cargando entrenador:", error);
          alert("Error cargando entrenador");
        } finally {
          setLoading(false);
        }
      }

      fetchEntrenador();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      setTrainerData({ ...trainerData, picture: files[0] });
    } else {
      setTrainerData({ ...trainerData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEntrenador(id, trainerData);
        alert("Entrenador actualizado exitosamente");
      } else {
        await createEntrenador(trainerData);
        alert("Entrenador agregado exitosamente");
      }
      navigate("/entrenadores");
    } catch (error) {
      console.error("Error guardando entrenador:", error);
      alert("Error guardando entrenador");
    }
  };

  // 🔹 LOADING (MISMO PATRÓN GLOBAL)
  if (loading) {
    return <Loading text="Cargando entrenador..." />;
  }

  return (
    <Card className="form-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {id ? "Editar Entrenador" : "Agregar Entrenador"}
        </Typography>

        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Nombre"
            name="name"
            value={trainerData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Edad"
            name="age"
            type="number"
            value={trainerData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Ciudad"
            name="city"
            value={trainerData.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Especialidad"
            name="specialty"
            value={trainerData.specialty}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
          />

          <div className="form-actions">
            <Button type="submit" variant="contained" color="success">
              {id ? "Guardar cambios" : "Guardar"}
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/entrenadores")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
