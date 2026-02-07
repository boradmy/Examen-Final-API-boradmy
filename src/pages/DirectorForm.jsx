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
    name: "",
    nationality: "",
    birthYear: "",
    awards: "",
    picture: null,
  });

  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      async function fetchDirector() {
        try {
          const data = await getDirectorById(id);
          setDirectorData({
            name: data.name,
            nationality: data.nationality,
            birthYear: data.birthYear,
            awards: data.awards,
            picture: null,
          });
        } catch (error) {
          console.error(error);
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
      console.error(error);
      alert("Error guardando director");
    }
  };

  if (loading) {
    return <Loading text="Cargando director..." />;
  }

  return (
    <Card className="form-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {id ? "Editar Director" : "Agregar Director"}
        </Typography>

        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Nombre"
            name="name"
            value={directorData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Nacionalidad"
            name="nationality"
            value={directorData.nationality}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Año de nacimiento"
            name="birthYear"
            type="number"
            value={directorData.birthYear}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Premios"
            name="awards"
            value={directorData.awards}
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
              Guardar
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/directores")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
