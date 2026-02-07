import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

// Páginas
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

// Películas
import PeliculaList from "./pages/PeliculaList";
import PeliculaForm from "./pages/PeliculaForm";
import PeliculaDetail from "./pages/PeliculaDetail";

// Directores
import DirectorList from "./pages/DirectorList";
import DirectorForm from "./pages/DirectorForm";
import DirectorDetail from "./pages/DirectorDetail";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* Container SOLO para el contenido */}
      <Container sx={{ mt: 3 }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Películas */}
          <Route path="/peliculas" element={<PeliculaList />} />
          <Route path="/pelicula/:id" element={<PeliculaDetail />} />
          <Route path="/add-pelicula" element={<PeliculaForm />} />
          <Route path="/edit-pelicula/:id" element={<PeliculaForm />} />

          {/* Directores */}
          <Route path="/directores" element={<DirectorList />} />
          <Route path="/director/:id" element={<DirectorDetail />} />
          <Route path="/add-director" element={<DirectorForm />} />
          <Route path="/edit-director/:id" element={<DirectorForm />} />

          {/* Login */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
