'use client';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from "../components/Layout.module.css";

const Layout = ({ children }) => {
  const [user, setUser] = useState("0");

  useEffect(() => {
    const storedUser = localStorage.getItem('accessToken');
    if (storedUser && storedUser !== 'undefined') {
      const parsedUser = JSON.parse(storedUser);
      const token = parsedUser.token;  // Accede al token dentro del objeto
      setUser(parsedUser.username)
    } else {
      console.warn("Token no encontrado");
    }
  }, []);

  return (
    <div className="layout">
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          {/* Si el usuario está logueado, se muestra "Detalles Usuario", si no, "Tu Cuenta" */}
          {user !== "0" ? (
            <>
              <li><Link href="/usuario">Detalles Usuario</Link></li>
              <li><Link href="/crear_subasta">Crear Subasta</Link></li> {/* Enlace para crear subasta */}
            </>
          ) : (
            <li><Link href="/inicio">Tu Cuenta</Link></li>
          )}
          <li><Link href="/sobre_nosotros">Sobre Nosotros</Link></li>
        </ul>
      </nav>

      {(user !== "0") && (
        <div className="welcome">
          <p>Bienvenido, {user}</p>
        </div>
      )}

      <main className="content">{children}</main>

      <footer>
        <p>Creada por <b>José Juan Cortina y Xabier Albizu</b> <i>- 2025</i></p>
      </footer>
    </div>
  );
};

export default Layout;
