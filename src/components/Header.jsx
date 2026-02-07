import { AppBar, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/pokedex-logo.png";
import { logout } from "../services/authServices";
import './Header.css';
import { useNavigate, NavLink } from "react-router-dom";

export default function Header() {
  const isLoggedIn = localStorage.getItem('access_token') !== null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    alert("Sesión cerrada exitosamente");
    navigate('/'); 
    window.location.reload();
  };

  return (
    <header className="pokedex-navbar">
      <Container>
        <AppBar position="static">
          {/* Logo centrado */}
          <Toolbar style={{ justifyContent: 'center' }}>
            <div className="image-container">
              <img src={pokedexLogo} alt="Pokédex Logo" height={100} />
            </div>
          </Toolbar>

          {/* Barra de navegación */}
          <Toolbar className="toolbar-nav">
            <div className="nav-buttons">
              <NavLink to="/" className="nav-btn">Inicio</NavLink>
              <NavLink to="/pokemons" className="nav-btn">Pokémons</NavLink>
              <NavLink to="/entrenadores" className="nav-btn">Entrenadores</NavLink>

              {isLoggedIn && (
                <>
                  <NavLink to="/add-pokemon" className="nav-btn add-btn">
                    Agregar Pokémon
                  </NavLink>
                  <NavLink to="/add-entrenador" className="nav-btn add-btn">
                    Agregar Entrenador
                  </NavLink>
                </>
              )}
            </div>

            {/* Botones de login/logout */}
            <div className="auth-buttons">
              {isLoggedIn ? (
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              ) : (
                <NavLink to="/login" className="login-btn">
                  Iniciar sesión
                </NavLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Container>
    </header>
  );
}