import { Container } from '@mui/material';
import Header from './components/Header';

// Páginas Pokémon
import PokemonList from './pages/PokemonList';
import PokemonForm from './pages/PokemonForm';
import PokemonDetail from './pages/PokemonDetail';

// Páginas Entrenadores
import EntrenadorList from './pages/EntrenadorList';
import EntrenadorForm from './pages/EntrenadorForm';
import EntrenadorDetail from './pages/EntrenadorDetail';

// Otras páginas
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Inicio */}
          <Route path='/' element={<Home />} />

          {/* Pokémons */}
          <Route path='/pokemons' element={<PokemonList />} />
          <Route path='/pokemon/:id' element={<PokemonDetail />} />
          <Route path='/add-pokemon' element={<PokemonForm />} />
          <Route path='/edit-pokemon/:id' element={<PokemonForm />} />

          {/* Entrenadores */}
          <Route path='/entrenadores' element={<EntrenadorList />} />
          <Route path='/entrenador/:id' element={<EntrenadorDetail />} />
          <Route path='/add-entrenador' element={<EntrenadorForm />} />
          <Route path='/edit-entrenador/:id' element={<EntrenadorForm />} />

          {/* Login */}
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;