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
  addPokemon,
  fetchPokemonById,
  updatePokemon,
} from "../services/pokemonServices";

import Loading from "../components/Loading"; // 👈 loading centrado
import "./PokemonForm.css";

export default function PokemonForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pokemonData, setPokemonData] = useState({
    name: "",
    type: "",
    weight: "",
    height: "",
    picture: null,
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Cargar Pokémon si es edición
  useEffect(() => {
    let mounted = true;

    async function loadPokemon() {
      if (!id) return;

      setLoading(true);
      try {
        const data = await fetchPokemonById(id);
        if (mounted) {
          setPokemonData({
            name: data.name || "",
            type: data.type || "",
            weight: data.weight || "",
            height: data.height || "",
            picture: null,
          });
        }
      } catch (error) {
        console.error("Error cargando el Pokémon:", error);
        alert("Error cargando el Pokémon");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPokemon();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPokemonData({
      ...pokemonData,
      [name]: name === "picture" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePokemon(id, pokemonData);
        alert("Pokémon actualizado exitosamente");
      } else {
        await addPokemon(pokemonData);
        alert("Pokémon agregado exitosamente");
      }
      navigate("/pokemons");
    } catch (error) {
      console.error("Error guardando el Pokémon:", error);
      alert("Error guardando el Pokémon");
    }
  };

  // ✅ LOADING CENTRADO
  if (loading) {
    return <Loading text="Cargando Pokémon..." />;
  }

  return (
    <Card className="form-card">
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          {id ? "Editar Pokémon" : "Agregar Pokémon"}
        </Typography>

        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Nombre"
            name="name"
            value={pokemonData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Tipo"
            name="type"
            value={pokemonData.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Peso"
            name="weight"
            value={pokemonData.weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Altura"
            name="height"
            value={pokemonData.height}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
          />

          <div className="form-actions">
            <Button type="submit" variant="contained" color="success">
              {id ? "Guardar cambios" : "Guardar"}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/pokemons")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
