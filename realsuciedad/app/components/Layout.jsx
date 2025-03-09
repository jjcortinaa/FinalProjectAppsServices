import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from "../components/Layout.module.css";

const Layout = ({ children }) => {
  const [user, setUser] = useState("0");

  useEffect(() => {
    // Intenta obtener el nombre de usuario del localStorage o del token (o de otro lugar donde guardes la información)
    const storedUser = localStorage.getItem('accessToken');
    if (storedUser) {
      setUser(storedUser);  // Se guarda el valor del token o nombre del usuario
    }
  }, []);

  return (
    <div className="layout">
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          {/* Si el usuario está logueado, se muestra "Detalles Usuario", si no, "Tu Cuenta" */}
          {user!="0" ? (
            <li><Link href="/usuario">Detalles Usuario</Link></li>
          ) : (
            <li><Link href="/inicio">Tu Cuenta</Link></li>
          )}
          <li><Link href="/sobre_nosotros">Sobre Nosotros</Link></li>
        </ul>
      </nav>

      {(user!="0") && (
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
