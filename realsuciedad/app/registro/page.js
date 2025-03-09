'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "../components/Layout";
import styles from '../registro/page.module.css';
import Link from "next/link";

const RegistroPage = () => {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [community, setCommunity] = useState('');
  const [province, setProvince] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkUsernameExists = async (username) => {
    // Verificar si el nombre de usuario ya está registrado en el backend
    const response = await fetch(`https://das-p2-backend.onrender.com/api/users/check-username/${username}`);
    const data = await response.json();
    
    // Si el nombre de usuario ya existe, el backend debería devolver algo que indique que el usuario está ocupado
    if (data.exists) {
      setError('El nombre de usuario ya está en uso.');
      return true;
    }
    return false;
  };

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
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Verificar si el nombre de usuario ya existe
    const usernameExists = await checkUsernameExists(user);
    if (usernameExists) {
      return;
    }

    setLoading(true);
    try {
      // Aquí harías la solicitud a tu API para registrar al usuario
      const response = await fetch('https://das-p2-backend.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: password,
          birth_date: birthdate,
          address: address,
          community: community,
          province: province,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirigir al usuario a la página de inicio después de un registro exitoso
        setTimeout(() => {
          router.push('/inicio');
        }, 2000);
      } else {
        setError('Hubo un problema al intentar registrar el usuario.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Hubo un problema al intentar registrar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <header className={styles.header}>
        <h1>Registro </h1>
        <a href="/">
          <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
        </a>
      </header><br /><br /><br /><br /><br /><br />
      <main>
        <form onSubmit={handleSubmit} className={styles.formContainer_}>
          <fieldset className={styles.fieldset_}>
            <legend className={styles.legend_}>Crea una cuenta:</legend>
            <label htmlFor="user" className={styles.label_}>Usuario:</label>
            <input 
              type="text" 
              id="user" 
              name="user" 
              placeholder="nombre.usuario" 
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
            <label htmlFor="confirmPassword" className={styles.label_}>Confirmar Contraseña:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="********" 
              required 
              className={styles.input_}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="birthdate" className={styles.label_}>Fecha de Nacimiento:</label>
            <input 
              type="date" 
              id="birthdate" 
              name="birthdate" 
              required 
              className={styles.input_}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <label htmlFor="address" className={styles.label_}>Dirección:</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              placeholder="Tu dirección completa" 
              required 
              className={styles.input_}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="community" className={styles.label_}>Comunidad Autónoma:</label>
            <select 
              id="community" 
              name="community" 
              required 
              className={styles.input_}
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
            >
              <option value="">Selecciona tu comunidad autónoma</option>
              {/* Opciones de comunidades */}
            </select>

            {error && <p className={styles.error_}>{error}</p>}
            {success && <p className={styles.success_}>¡Registro exitoso! Redirigiendo...</p>}
            <input type="submit" value="Registrarse" className={styles.submitButton_} disabled={loading} />
          </fieldset>
        </form><br /><br /><br /><br /><br /><br />
        <p className={styles.registerLink_}>
          Si tienes cuenta, <Link href="/inicio">inicia sesión aquí</Link>
        </p><br />
      </main>
    </Layout>
  );
};

export default RegistroPage;
