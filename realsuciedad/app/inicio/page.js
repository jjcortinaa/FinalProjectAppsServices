'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "../components/Layout";
import styles from '../inicio/page.module.css';
import Link from "next/link";

const Inicio = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Función para validar el formulario
  const validateForm = () => {
    if (!user || !password) {
      setError('Todos los campos son obligatorios');
      return false;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    setError('');
    return true;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
  
      const response = await fetch('https://das-p2-backend.onrender.com/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: password,
        }),
      });


      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', JSON.stringify({ username: user, password: password }));
        router.push('/sobre_nosotros'); 
      } else {
        setError('Credenciales incorrectas. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      setError('Hubo un problema al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <header className={styles.header}>
        <h1>Iniciar Sesión</h1>
        <a href="/">
          <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
        </a>
      </header><br /><br /><br /><br /><br /><br />
      <main>
        <form id="login_form" className={styles.formContainer_} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset_}>
            <legend className={styles.legend_}>Iniciar Sesión:</legend>
            
            <label htmlFor="user" className={styles.label_}>Usuario:</label>
            <input 
              type="text" 
              id="user" 
              name="user" 
              placeholder="xabier.albizu" 
              required 
              className={styles.input_}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <label htmlFor="password" className={styles.label_}>Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="********" 
              required 
              className={styles.input_}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className={styles.error_}>{error}</p>}
            
            <button type="submit" className={styles.submitButton_} disabled={loading}>
              {loading ? 'Cargando...' : 'Ingresar'}
            </button>
          </fieldset>
        </form><br /><br /><br /><br /><br /><br />
        <p className={styles.registerLink_}>
          Si no tienes cuenta, <Link href="/registro">regístrate aquí</Link>
        </p>
      </main>
    </Layout>
  );
};

export default Inicio;
