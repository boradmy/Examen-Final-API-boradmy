import { AppBar, Container, Toolbar, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import catflixLogo from "../assets/catflix-logo.png";
import { logout } from "../services/authServices";
import "./Header.css";

export default function Header() {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("access_token");
    alert("Sesión cerrada exitosamente");
    navigate("/");

    // ✅ recarga la página para actualizar el Header
    window.location.reload();
  };

  const navClass = ({ isActive }) =>
    isActive ? "nav-btn active" : "nav-btn";

  return (
    <header className="catflix-navbar">
      <AppBar position="static" className="catflix-appbar">
        {/* Logo centrado + Auth a la derecha */}
        <Toolbar className="toolbar-top">
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <img src={catflixLogo} alt="CatFlix Logo" className="catflix-logo" />
          </Box>

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

        {/* Navegación */}
        <Toolbar className="toolbar-nav">
          <Container className="nav-container">
            <div className="nav-buttons">
              <NavLink to="/" className={navClass}>
                Inicio
              </NavLink>

              <NavLink to="/peliculas" className={navClass}>
                Películas
              </NavLink>

              <NavLink to="/directores" className={navClass}>
                Directores
              </NavLink>

              {isLoggedIn && (
                <>
                  <NavLink to="/add-pelicula" className="nav-btn add-btn">
                    + Película
                  </NavLink>

                  <NavLink to="/add-director" className="nav-btn add-btn">
                    + Director
                  </NavLink>
                </>
              )}
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </header>
  );
}